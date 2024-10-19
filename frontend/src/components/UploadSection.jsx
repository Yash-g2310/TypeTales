import React, { useState } from 'react';
import { Button, TextField, Typography, Snackbar, CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { getDocument } from 'pdfjs-dist/build/pdf';
import mammoth from 'mammoth';
import { readFileSync } from 'fs'; // Ensure you're using this in a Node.js environment

const UploadSection = ({ onTextUpload }) => {
    const [text, setText] = useState('');
    const [pdfFile, setPdfFile] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error('File size exceeds 5MB.', { position: "top-center" });
            return;
        }

        if (file.type === 'application/pdf') {
            setPdfFile(file);
            extractTextFromPdf(file);
        } else if (file.type === 'text/plain') {
            readTextFile(file);
        } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            readDocxFile(file);
        } else if (file.type === 'application/rtf') {
            readRtfFile(file);
        } else if (file.type === 'text/csv') {
            readCsvFile(file);
        } else {
            toast.error('Unsupported file type. Please upload a PDF, TXT, DOCX, RTF, or CSV file.', { position: "top-center" });
        }
    };

    const extractTextFromPdf = async (file) => {
        setLoading(true);
        setProgress(0);
        const fileReader = new FileReader();
        fileReader.onload = async () => {
            const typedarray = new Uint8Array(fileReader.result);
            const pdf = await getDocument(typedarray).promise;
            let textContent = '';

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const text = await page.getTextContent();
                textContent += text.items.map(item => item.str).join(' ') + '\n';
                setProgress((i / pdf.numPages) * 100); // Update progress
            }

            onTextUpload(textContent.trim());
            setSnackbarOpen(true);
            setLoading(false);
        };
        fileReader.readAsArrayBuffer(file);
    };

    const readTextFile = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            onTextUpload(reader.result);
            setSnackbarOpen(true);
        };
        reader.readAsText(file);
    };

    const readDocxFile = async (file) => {
        const reader = new FileReader();
        reader.onload = async () => {
            const arrayBuffer = reader.result;
            const { value } = await mammoth.convertToHtml({ arrayBuffer });
            onTextUpload(value);
            setSnackbarOpen(true);
        };
        reader.readAsArrayBuffer(file);
    };

    const readRtfFile = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            const rtfText = reader.result;
            // You can add a RTF parser here to extract text
            onTextUpload(rtfText); // Assuming this is plain text
            setSnackbarOpen(true);
        };
        reader.readAsText(file);
    };

    const readCsvFile = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            const csvText = reader.result;
            // You can process CSV to convert to a readable format if needed
            onTextUpload(csvText); // Assuming this is plain text
            setSnackbarOpen(true);
        };
        reader.readAsText(file);
    };

    const handleSubmit = () => {
        if (text.trim()) {
            onTextUpload(text);
            toast.success('Text uploaded successfully!', { position: "top-center" });
        } else {
            toast.error('Please enter some text.', { position: "top-center" });
        }
    };

    return (
        <div className="space-y-4">
            <Typography variant="h6">Upload or Paste Your Text</Typography>
            <TextField
                label="Paste text here"
                multiline
                rows={6}
                value={text}
                onChange={handleTextChange}
                fullWidth
                variant="outlined"
                placeholder="Paste your text here..."
                aria-label="Paste text input"
            />
            <input
                type="file"
                accept=".pdf,.txt,.docx,.rtf,.csv"
                onChange={handleFileUpload}
                className="mb-2"
                aria-label="File upload"
            />
            {loading && (
                <div>
                    <CircularProgress />
                    <Typography variant="caption">{`Processing... ${Math.round(progress)}%`}</Typography>
                </div>
            )}
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
                Start Typing
            </Button>
            <Snackbar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                message="Text uploaded successfully!"
                autoHideDuration={3000}
            />
            <ToastContainer />
        </div>
    );
};

export default UploadSection;

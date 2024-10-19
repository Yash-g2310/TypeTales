import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const UploadSection = ({ onTextUpload }) => {
  const [text, setText] = useState('');
  const [pdfFile, setPdfFile] = useState(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      extractTextFromPdf(file); // Function to extract text from the PDF
    }
  };

  const extractTextFromPdf = (file) => {
    // Logic to extract text from the PDF
    // Placeholder: onTextUpload('Extracted text from PDF...');
  };

  const handleSubmit = () => {
    if (text.trim()) {
      onTextUpload(text);
    }
  };

  return (
    <div className="space-y-4">
      <TextField
        label="Paste text here"
        multiline
        rows={6}
        value={text}
        onChange={handleTextChange}
        fullWidth
        variant="outlined"
      />
      <input
        type="file"
        accept="application/pdf"
        onChange={handlePdfUpload}
        className="mb-2"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Start Typing
      </Button>
    </div>
  );
};

export default UploadSection;

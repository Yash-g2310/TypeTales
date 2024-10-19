import styled from 'styled-components';
import { Paper, Button } from '@mui/material';

export const StyledContainer = styled.div`
  padding: 2rem;
  background-color: #f8f9fa;
`;

export const StyledPaper = styled(Paper)`
  padding: 1.5rem;
  background-color: #ffffff;
`;

export const StyledButton = styled(Button)`
  margin-top: 1rem;
  background-color: #3f51b5;
  color: white;

  &:hover {
    background-color: #283593;
  }
`;

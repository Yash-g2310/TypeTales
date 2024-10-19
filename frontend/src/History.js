import React from 'react';
import { StyledContainer, StyledPaper } from '../styles';

const History = () => {
  return (
    <StyledContainer>
      <StyledPaper elevation={3}>
        <h2>Typing History</h2>
        {/* Display history from Redux state */}
      </StyledPaper>
    </StyledContainer>
  );
};

export default History;

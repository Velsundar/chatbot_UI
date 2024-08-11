'use client';

import React from 'react';
import { Paper, TextField, Box, Typography, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function PaperComponent() {
  const [text, setText] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSend = () => {
    if (text) {
      console.log('Text submitted:', text);
      setText('');
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, height: '90vh', width: '70vw', position: 'fixed', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>
        MAIN Response
      </Typography>
      <Box sx={{ flex: 1 }} />
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <TextField
          multiline
          rows={3}
          maxRows={3}
          fullWidth
          variant="outlined"
          margin="normal"
          placeholder="Enter text here..."
          value={text}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <IconButton 
                onClick={handleSend}
                edge="end" 
                sx={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)' }}
              >
                <SendIcon />
              </IconButton>
            ),
          }}
          sx={{
            '& .MuiInputBase-root': {
              overflow: 'hidden',
            },
            '& textarea': {
              overflow: 'hidden',
            },
          }}
        />
      </Box>
    </Paper>
  );
}

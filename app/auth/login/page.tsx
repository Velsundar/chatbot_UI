// components/Login.tsx

import React from 'react';
import Image from 'next/image';
import { TextField, Button, Link, Box, Typography } from '@mui/material';

const Login: React.FC = () => {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh"
    >
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        maxWidth={400} 
        width="100%"
        padding={4}
        boxShadow={3}
        borderRadius={2}
      >
        <Image 
          src="/logo.png" 
          alt="Logo" 
          width={200} 
          height={140} 
          style={{ marginBottom: 16 }}
        />

        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField 
          label="Username" 
          variant="outlined" 
          fullWidth 
          margin="normal"
        />
        <TextField 
          label="Password" 
          type="password" 
          variant="outlined" 
          fullWidth 
          margin="normal"
        />
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          style={{ marginTop: 16 }}
        >
          Login
        </Button>
        <Link href="#" variant="body2" style={{ marginTop: 16 }}>
          Forgot Password?
        </Link>
        <Link href="#" variant="body2" style={{ marginTop: 8 }}>
          Sign Up
        </Link>
      </Box>
    </Box>
  );
};

export default Login;

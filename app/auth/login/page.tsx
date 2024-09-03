"use client"
import React from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Link, Box, Typography } from '@mui/material';

type FormData = {
    username: string;
    password: string;
  };

const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = data => {
        console.log(data);
        // Handle login logic here
      };
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
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={200} 
              height={140} 
              style={{ marginBottom: 16 }}
              priority={false}
            />
    
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
    
            <TextField 
              label="Username" 
              variant="outlined" 
              fullWidth 
              margin="normal"
              {...register('username', { required: 'Username is required' })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
    
            <TextField 
              label="Password" 
              type="password" 
              variant="outlined" 
              fullWidth 
              margin="normal"
              {...register('password', { required: 'Password is required' })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
    
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              type="submit"
              style={{ marginTop: 16 }}
            >
              Login
            </Button>
    
            <Link href="#" variant="body2" style={{ marginTop: 16 }}>
              Forgot Password?
            </Link>
            <Link href="/auth/signup" variant="body2" style={{ marginTop: 8 }}>
              Sign Up
            </Link>
          </Box>
        </Box>
      );
    };
    
    export default Login;
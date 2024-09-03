"use client";
import React from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Link, Box, Typography } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type FormData = {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [loading, setLoading] = React.useState(false);
    
    const onSubmit: SubmitHandler<FormData> = async data => {
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8000/api/login', data);
            console.log('Login success:', response.data);
            Cookies.set('AUTH', response.data.token, { expires: 1 });
            toast.success('Login successful!');
        } catch (error: any) {
            console.error('Login error:', error);
            toast.error(error.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
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
                    label="Email" 
                    variant="outlined" 
                    fullWidth 
                    margin="normal"
                    {...register('email', { required: 'Email is required' })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
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
                    disabled={loading}
                >
                    {loading ? 'Logging In...' : 'Login'}
                </Button>
    
                <Link href="#" variant="body2" style={{ marginTop: 16 }}>
                    Forgot Password?
                </Link>
                <Link href="/auth/signup" variant="body2" style={{ marginTop: 8 }}>
                    Sign Up
                </Link>
            </Box>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Box>
    );
};

export default Login;

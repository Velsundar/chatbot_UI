"use client"
import React from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Link, Box, Typography } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type FormData = {
    email: string;
    username: string;
    password: string;
};

const SignUp: React.FC = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;


    const onSubmit: SubmitHandler<FormData> = async data => {
        setLoading(true);
        setErrorMessage(null);

        try {
            const response = await axios.post(`${baseURL}/api/register`, data);
            console.log('Signup success:', response.data);
            toast.success(response.data.message || "User Registeres");
            reset();
        } catch (error: any) {
            console.error('Signup error:', error);
            setErrorMessage(error.response?.data?.error || 'Signup failed');
            toast.error(error.response?.data?.error)
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
                    priority
                />

                <Typography variant="h4" gutterBottom>
                    Sign Up
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
                    Sign Up
                </Button>

                <Link href="/" variant="body2" style={{ marginTop: 16 }}>
                    Already have an account? Login
                </Link>
            </Box>
            <ToastContainer />
        </Box>
    );
};

export default SignUp;

"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = Cookies.get('AUTH');
            if (!token) {
                router.push('/auth/login');
            }
            setTimeout(() => {
                setIsAuthenticated(true);
                setLoading(false);
            }, 100);
        };
        checkAuth();
    }, [router]);

    if (loading) {
        return (
            <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}
            >
            <CircularProgress />
            </Box>
        );
    }

    return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;

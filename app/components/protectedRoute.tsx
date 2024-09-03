"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get('AUTH');
        if (!token) {
            router.push('/auth/login');
        } else {
            setLoading(false);
        }
    }, [router]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    return <>{children}</>;
};

export default ProtectedRoute;

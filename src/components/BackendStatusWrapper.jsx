import React, { useEffect, useState } from 'react';
import { apiUrl } from '../config.js';

function BackendStatusWrapper({ children }) {
    const [backendReady, setBackendReady] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const checkBackend = async () => {
            try {
                const res = await fetch(`${apiUrl}/api/health`, {
                    method: 'GET',
                });

                if (res.ok) {
                    setBackendReady(true);
                }
            } catch (e) {
                // Ignore errors, backend might not be ready yet
            } finally {
                setChecking(false);
            }
        };

        checkBackend();
    }, []);

    if (!backendReady) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-700 text-lg">
                <div className="p-6 rounded-xl shadow-lg bg-white">
                    <p className="text-center">⏳ Loading backend... <br />May take up to 5 minutes.</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}

export default BackendStatusWrapper;
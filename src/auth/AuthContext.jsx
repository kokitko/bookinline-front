import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getAccessToken, refreshToken } from './authService.js';
import { fetchUserDetails } from '../api/users.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = getAccessToken();
                if (!token) {
                    setIsAuthenticated(false);
                    setUser(null);
                    setReady(true);
                    return;
                }
                await refreshToken();
                setIsAuthenticated(true);
                const res = await fetchUserDetails();
                if (res && res.data) {
                    setUser(res.data);
                } else {
                    setUser(null);
                }
            } catch (err) {
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setReady(true);
            }
        };
        initAuth();
    }, []);

    const fetchUser = useCallback(async () => {
        const token = getAccessToken();
        if (!token) return null;
        try {
            const res = await fetchUserDetails();
            if (!res || !res.data) throw new Error('No user data found');
            setUser(res.data);
            return res.data;
        } catch (err) {
            setUser(null);
            return null;
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            user,
            fetchUser,
            ready,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
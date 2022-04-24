import { useState, useCallback, useEffect } from "react";

const storageName = 'userData'
export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [fullName, setFullName] = useState(null);

    const login = useCallback((jwtToken, id, name) => {
        setToken(jwtToken);
        setUserId(id);
        setFullName(name);

        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken,
            userId: id,
            fullName: name
        }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setFullName(null);
        localStorage.removeItem(storageName);
    }, []);
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));
        if (data && data.token) {
            login(data.token, data.userId, data.fullName);
        };
    }, [login]);

    return {login, logout, token, userId, fullName};
}
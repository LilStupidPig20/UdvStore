import { useState, useCallback, useEffect } from "react";

const storageName = 'userData'
export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [fullName, setFullName] = useState(null);
    const [role, setRole] = useState(null);
    const [position, setPosition] = useState(null);

    const login = useCallback((jwtToken, id, name, rol, pos) => {
        setToken(jwtToken);
        setUserId(id);
        setFullName(name);
        setRole(rol);
        setPosition(pos)

        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken,
            userId: id,
            fullName: name,
            role: rol,
            position: pos
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setFullName(null);
        setRole(null);
        setPosition(null);
        localStorage.removeItem(storageName);
    }, []);
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));
        if (data && data.token) {
            login(data.token, data.userId, data.fullName, data.role, data.position);
        };
    }, [login]);

    return { login, logout, token, userId, fullName, role, position };
}

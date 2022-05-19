import { createContext } from "react";

function noop() { }

export const AuthContext = createContext({
    token: null,
    userId: null,
    role: null,
    position: null,
    fullName: null,
    isAuthenticated: false,
    login: noop,
    logout: noop
})
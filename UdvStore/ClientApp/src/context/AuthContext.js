import { createContext } from "react";

function noop() { }

export const AuthContext = createContext({
    token: null,
    userId: null,
    fullName: null,
    isAuthenticated: false,
    login: noop,
    logout: noop
})
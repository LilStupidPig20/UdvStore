import { createContext } from "react";

export let SendFormChecker = createContext({
    isSent: false,
    toggleSent: () => {},
});
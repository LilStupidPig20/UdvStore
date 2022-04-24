import { createContext } from "react";

export let ButtonStatesContext = createContext({
    isActive: false,
    toggleActive: () => {},
})
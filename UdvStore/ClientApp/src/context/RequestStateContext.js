import { createContext } from "react";

export let RequestStateContext = createContext({
    isClicked: false,
    toggleClicked: () => {},
})
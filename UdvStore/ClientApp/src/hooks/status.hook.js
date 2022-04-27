import { useState } from "react"

export const useStatus = () => {
    const [isActive, setActive] = useState(false);
    const toggleActive = () => {
        setActive(!isActive);
    };
    
    return {isActive, toggleActive};
}

export const useClicked = () => {
    const [isClicked, setClicked] = useState(false);
    const toggleClicked = () => {
        setClicked(!isClicked);
    }
    
    return {isClicked, toggleClicked};
}

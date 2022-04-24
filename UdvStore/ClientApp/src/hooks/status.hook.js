import { useState } from "react"

export const useStatus = () => {
    const [isActive, setActive] = useState(false);
    const toggleActive = () => {
        setActive(!isActive);
    }
    
    return {isActive, toggleActive};
}
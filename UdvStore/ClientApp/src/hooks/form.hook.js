import { useState } from "react";

export const useForm = () => {
    const [isSent, setSent] = useState(false);
    const toggleSent = (bool) => {
        setSent(bool);
    };

    return {isSent, toggleSent};
}
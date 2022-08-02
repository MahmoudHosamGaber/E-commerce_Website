import { useState } from "react";

export const useForm = (initialState) => {
    const [values, setValues] = useState(initialState);

    const handleChange = (e) => {
        setValues((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    return [values, handleChange];
};

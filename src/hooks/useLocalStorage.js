import { useEffect, useState } from "react";


export default function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const raw = localStorage.getItem(key)
            return raw ? JSON.parse(raw) : initialValue;
        } catch (error) {
            return initialValue
        }
    })
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {

        }
    }, [key, value])
    return [value, setValue]
}




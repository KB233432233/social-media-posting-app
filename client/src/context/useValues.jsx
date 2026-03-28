

import { createContext, useContext, useState } from "react";


const ValuesContext = createContext();

export const ValuesProvider = ({ children }) => {
    const [id, setId] = useState('');
    const updateId = (id) => setId(id);
    const [posts2, setPosts2] = useState([]);

    return <ValuesContext.Provider value={{ id, updateId, setPosts2, posts2 }}>
        {children}
    </ValuesContext.Provider>
}



export const useValues = () => useContext(ValuesContext);
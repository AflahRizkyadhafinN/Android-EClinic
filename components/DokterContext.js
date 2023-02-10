import React, { createContext, useState } from "react";

export const dokterContext = createContext();

export const DokterData = ({children}) => {
    const [dokter, setDokter] = useState({})

    return (
        <dokterContext.Provider value={{dokter, setDokter}}>
            {children}
        </dokterContext.Provider>
    )
}

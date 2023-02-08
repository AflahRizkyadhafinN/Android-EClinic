import React, { createContext, useState } from "react";

export const makeContext = createContext();

export const UserData = ({children}) => {
    const [userdata, setUserData] = useState({})

    return (
        <makeContext.Provider value={{userdata, setUserData}}>
            {children}
        </makeContext.Provider>
    )
}

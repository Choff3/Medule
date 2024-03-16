import React, { createContext, useContext, useEffect, useState } from "react";

import { UpdateContext } from "./UpdateProvider";
import { getPatients } from "../actions/Patient";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const { updatePatients, updateAll } = useContext(UpdateContext);

    const [patients, setPatients] = useState([]);

    useEffect(() => {
        getPatients().then(res => setPatients(res));
    }, [updatePatients, updateAll]);

    return (
        <DataContext.Provider value={{ patients }}>
            {children}
        </DataContext.Provider>
    );
};

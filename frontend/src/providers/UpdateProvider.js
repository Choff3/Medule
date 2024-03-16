import React, { createContext, useState } from "react";

export const UpdateContext = createContext();

/* updateX can be used as a useEffect dependency. See DataProvider for an example */
export const UpdateProvider = ({ children }) => {
    const [updateEntries, setUpdateEntries] = useState(false);
    const [updateScrapes, setUpdateScrapes] = useState(false);
    const [updateWDMs, setUpdateWDMs] = useState(false);
    const [updateAll, setUpdateAll] = useState(false);

    const triggerEntriesUpdate = () => setUpdateEntries((prevState) => !prevState);
    const triggerScrapesUpdate = () => setUpdateScrapes((prevState) => !prevState);
    const triggerWDMsUpdate = () => setUpdateWDMs((prevState) => !prevState);
    const triggerUpdate = () => setUpdateAll((prevState) => !prevState);

    /* Keycloak Users */
    const [updateUsers, setUpdateUsers] = useState(false);
    const triggerUsersUpdate = () => setUpdateUsers((prevState) => !prevState);

    return (
        <UpdateContext.Provider
            value={{
                triggerEntriesUpdate, updateEntries,
                triggerScrapesUpdate, updateScrapes,
                triggerWDMsUpdate, updateWDMs,
                triggerUpdate, updateAll,

                triggerUsersUpdate, updateUsers
            }}
        >
            {children}
        </UpdateContext.Provider>
    );
};

import { createContext, useContext, useEffect, useState } from "react";
import { databases } from "../appwrite";

const ClientContext = createContext();

const databaseID = "66502c6e0015d7be8526";
const collectionID = '667012ab003092be6156';

export function useClient() {
    return useContext(ClientContext);
}

export function ClientProvider(props) {
    const [docs, setDocs] = useState([]);

    async function list() {
        try {
            const response = await databases.listDocuments(
                databaseID,
                collectionID,
            )
            setDocs(response.documents)
        } catch (error) {
            console.error(`${error}: failed to list`)
        }
    }


    async function init() {

    }

    useEffect(() => {
        init();
    }, []);

    return (
        <ClientContext.Provider value={{ list, docs }}>
            {props.children}
        </ClientContext.Provider>
    );
}

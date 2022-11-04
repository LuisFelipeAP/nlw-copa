import React, { useContext } from "react";
import { AuthContext, AuthContextProps, AuthContextProvider } from "../contexts/AuthContext";

export function useAuth(): AuthContextProps {
    const context = useContext(AuthContext);

    return context;
}

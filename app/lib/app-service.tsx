"use client";

import { createContext, useContext } from "react";

interface IAppServiceContext {
    currentPage: string;
}

const defaultValue = {
    currentPage: "home"
} satisfies IAppServiceContext;
const AppServiceContext = createContext<IAppServiceContext>(defaultValue);

export const AppServiceProvider = ({ children }: { children: React.ReactNode }) => {
    return <AppServiceContext.Provider value={defaultValue}>{children}</AppServiceContext.Provider>;
};

export const useAppService = () => {
    const context: IAppServiceContext = useContext(AppServiceContext);
    if (!context) {
        throw new Error("useAppService must be used within an AppServiceProvider");
    }
    return context;
};

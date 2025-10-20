"use client";

import { MotionConfig } from "motion/react";
import { createContext, useContext } from "react";

interface IAppServiceContext {
    currentPage: string;
    loggedInAs?: {
        username: string;
        id: string;
    };
}

const defaultValue = {
    currentPage: "home",
    loggedInAs: undefined
} satisfies IAppServiceContext;
const AppServiceContext = createContext<IAppServiceContext>(defaultValue);

export const AppServiceProvider = ({ children }: { children: React.ReactNode }) => {
    return <MotionConfig reducedMotion="user">
        <AppServiceContext.Provider value={defaultValue}>{children}</AppServiceContext.Provider>
    </MotionConfig>;
};

export const AppServiceModifier = ({ children, ...props }: { children: React.ReactNode } & IAppServiceContext) => {
    const context = useAppService();
    Object.assign(context, props);
    return <>{children}</>;
};

export const useAppService = () => {
    const context: IAppServiceContext = useContext(AppServiceContext);
    if (!context) {
        throw new Error("useAppService must be used within an AppServiceProvider");
    }
    return context;
};

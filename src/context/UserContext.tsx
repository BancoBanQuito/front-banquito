import { context } from 'esbuild';
import React, { useContext, useState } from 'react'

interface User {
    isLogged: boolean,
    username?: string,
    identification?: string,
    identificationType?: string,
}

const UserContext = React.createContext<User | undefined>(undefined);

const UserProvider = ({ children }: any) => {

    const value: User = ({
        isLogged: false
    })

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

const UserConsumer = ({ children }: any) => {
    return (
        <UserContext.Consumer>
            {
                context => {
                    if (context === undefined) {
                        throw new Error('UserConsumer must be used within a UserProvider');
                    }
                    return children(context);
                }
            }
        </UserContext.Consumer>
    )
}

export { UserProvider, useUser, UserConsumer };
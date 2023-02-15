import { context } from 'esbuild';
import React, { useContext, useEffect, useState } from 'react'
import { UserType, isLogged } from '../utils/LoginUtils';
import { getSession, SessionVariable } from '../utils/SessionUtils';

interface User {
    isLogged: boolean,
    username?: string,
    identification?: string,
    identificationType?: string,
    role?: UserType
}

const UserContext = React.createContext<User | undefined>(undefined);

const UserProvider = ({ children }: any) => {
    const [value, setvalue] = useState<User>({
        isLogged: false
    });

    useEffect(() => {
        if (isLogged()) {
            const data: User = {
                identification: getSession(SessionVariable.IDENTIFICATION) != null ? getSession(SessionVariable.IDENTIFICATION) as string | undefined : undefined,
                identificationType: getSession(SessionVariable.IDENTIFICATION_TYPE) != null ? getSession(SessionVariable.IDENTIFICATION_TYPE) as string | undefined : undefined,
                username: !!getSession(SessionVariable.USERNAME) != null ? getSession(SessionVariable.USERNAME) as string | undefined : undefined,
                isLogged: true
            }
            setvalue(data);
        }
        return () => { }
    }, [])


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
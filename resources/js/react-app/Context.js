import { createContext } from 'react';

const Context = createContext({
    user: {},
    setUser: () => {},
    isUserLoggedIn: false,
    setIsUserLoggedIn: () => {},
    isUserEditor: false,
    setIsUserEditor: () => {},
    isUserAdmin: false,
    setIsUserAdmin: () => {},
    pageTitle: '',
    setPageTitle: () => {},
    currentSemester: {},
});

export default Context;

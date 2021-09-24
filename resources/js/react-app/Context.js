import { createContext } from 'react';

const Context = createContext({
    user: {},
    setUser: () => {},
    isUserLoggedIn: false,
    isUserEditor: false,
    isUserAdmin: false,
    pageTitle: '',
    setPageTitle: () => {},
    currentSemester: {},
});

export default Context;

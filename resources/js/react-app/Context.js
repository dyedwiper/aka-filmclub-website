import { createContext } from 'react';

const Context = createContext({
    user: {},
    setUser: () => {},
    pageTitle: '',
    setPageTitle: () => {},
    currentSemester: {},
});

export default Context;

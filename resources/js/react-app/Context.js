import { createContext } from 'react';

const Context = createContext({
    user: {},
    setUser: () => {},
    pageTitle: '',
    setPageTitle: () => {},
});

export default Context;

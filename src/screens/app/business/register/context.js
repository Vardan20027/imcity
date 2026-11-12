import { createContext, useContext } from 'react';

export const RegContext = createContext(null);

export const useReg = () => useContext(RegContext);

import React, { createContext, useContext } from 'react';
import serverService from '../services/serverService';

const ServerContext = createContext();

export const ServerProvider = ({ children }) => {
  return (
    <ServerContext.Provider value={serverService}>
      {children}
    </ServerContext.Provider>
  );
};

export const useServer = () => {
  return useContext(ServerContext);
};

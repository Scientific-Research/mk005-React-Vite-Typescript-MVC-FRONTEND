import { useState, useEffect } from 'react';
import { createContext } from 'react';
import axios from 'axios';
import { Job } from './interfaces';

interface IAppContext {
  jobs: Job[];
}

interface IAppProvider {
  children: React.ReactNode;
}

const backendUrl = 'http://localhost:8000';

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    (async () => {
      setJobs((await axios.get(`${backendUrl}/jobs`)).data);
    })();
  }, []);
  return (
    <AppContext.Provider
      value={{
        jobs, // at the end, we get the Jobs from our API and send it to other pages!
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

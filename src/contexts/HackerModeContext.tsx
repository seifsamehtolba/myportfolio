import { createContext, useContext, useState, ReactNode } from 'react';

interface HackerModeContextType {
  isHackerMode: boolean;
  setIsHackerMode: (value: boolean) => void;
}

const HackerModeContext = createContext<HackerModeContextType | undefined>(undefined);

export const HackerModeProvider = ({ children }: { children: ReactNode }) => {
  const [isHackerMode, setIsHackerMode] = useState(false);

  return (
    <HackerModeContext.Provider value={{ isHackerMode, setIsHackerMode }}>
      {children}
    </HackerModeContext.Provider>
  );
};

export const useHackerMode = () => {
  const context = useContext(HackerModeContext);
  if (context === undefined) {
    throw new Error('useHackerMode must be used within a HackerModeProvider');
  }
  return context;
}; 
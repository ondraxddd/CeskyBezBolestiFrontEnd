'use client'
// contexts/UserContext.tsx
import { createContext, ReactNode, useContext, useState } from 'react';
import { Subject } from '../page';

interface FullSubjectProps {
  subjects: Subject[]
  setSubjects: (subject: Subject[]) => void;
}

export const FullSubjectsContext = createContext<FullSubjectProps | undefined>(undefined);


export const FullSubjectsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [fullSubjects, setFullSubjects] = useState<Subject[]>([]);
  
    const value: FullSubjectProps = {
      subjects: fullSubjects,
      setSubjects: (subjects:Subject[]) => setFullSubjects(subjects),
    };
  
    return <FullSubjectsContext.Provider value={value}>{children}</FullSubjectsContext.Provider>;
  };

  export const useFullSubjects = () => {
    const context = useContext(FullSubjectsContext);
    if (!context) {
      throw new Error('useFullSubjects must be used within a Full Subjects Provider');
    }
    return context;
  };

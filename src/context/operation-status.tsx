import { createContext, useState, useContext, ReactNode } from 'react';
import { OperationDetailType } from './types';


const OperationDetailContext = createContext<{
  operationDetail: OperationDetailType | null;
  setOperationDetail: (operationDetail: OperationDetailType) => void;
} | null>(null);


export const OperationDetailProvider = ({ children }: { children: ReactNode }) => {
  const [operationDetail, setOperationDetail] = useState<OperationDetailType | null>(null);

  return (
    <OperationDetailContext.Provider value={{ operationDetail: operationDetail, setOperationDetail: setOperationDetail }}>
      {children}
    </OperationDetailContext.Provider>
  );
};

export const useOperationDetail = () => {
  const context = useContext(OperationDetailContext);
  if (!context) {
    throw new Error('useOperationDetail must be used within an OperationDetailProvider');
  }
  return context;
};

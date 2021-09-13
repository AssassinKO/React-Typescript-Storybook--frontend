import { useContext } from 'react';
import { PersistentDataContext } from './PersistentDataContext';

export const usePersistentData = () => useContext(PersistentDataContext);

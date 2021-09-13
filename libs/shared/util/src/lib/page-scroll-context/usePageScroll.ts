import { useContext } from 'react';
import { PageScrollContext } from './PageScrollContext';

export const usePageScroll = () => useContext(PageScrollContext);

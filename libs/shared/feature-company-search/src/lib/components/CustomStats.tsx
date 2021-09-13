import { useEffect } from 'react';
import { connectStats } from 'react-instantsearch-dom';

const Stats = ({ nbHits, setTotalHits }) => {
  useEffect(() => {
    setTotalHits(nbHits);
  }, [setTotalHits, nbHits]);
  return null;
};

export const CustomStats = connectStats(Stats);

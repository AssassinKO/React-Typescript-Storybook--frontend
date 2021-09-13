import React, { useCallback, useEffect } from 'react';

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
  excludedRefs?: React.RefObject<HTMLElement>[]
) => {
  const targetIsExcluded = useCallback(
    (target) => {
      if (!excludedRefs) return false;
      let excludedTargetFound = false;

      excludedRefs.forEach((exclude) => {
        if (exclude.current && exclude.current.contains(target)) excludedTargetFound = true;
      });

      return excludedTargetFound;
    },
    [excludedRefs]
  );

  const handleClick = (e) => {
    if (excludedRefs && targetIsExcluded(e.target)) return;
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

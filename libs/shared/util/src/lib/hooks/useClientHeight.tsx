import React, { useEffect, useState } from 'react';

export const useClientHeight = (
  ref: React.RefObject<HTMLElement>,
  show: boolean,
  resetTrigger?: unknown
) => {
  const [clientHeight, setClientHeight] = useState<number | undefined>();

  useEffect(() => {
    setTimeout(() => {
      if (ref.current == null) return;
      if (clientHeight === undefined && ref.current.getBoundingClientRect().height > 0) {
        setClientHeight(ref.current.getBoundingClientRect().height);
      }
    }, 0);
  }, [clientHeight, ref, show]);

  useEffect(() => {
    // When errors are shown, the clientHeight changes, setting it to undefined triggers the above useEffect to recalculate
    setClientHeight(undefined);
  }, [resetTrigger]);

  useEffect(() => {
    if (!show) {
      setTimeout(() => setClientHeight(undefined), 500);
    }
  }, [show]);

  return clientHeight;
};

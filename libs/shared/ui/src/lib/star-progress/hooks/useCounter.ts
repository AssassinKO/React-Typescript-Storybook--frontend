import { useState } from 'react';

export const useCounter = (initialCount = 0) => {
  const [count, setCount] = useState(initialCount);

  return {
    count,
    increment: () => setCount((count) => count + 1),
    decrement: () => setCount((count) => count - 1),
    reset: () => setCount(initialCount),
  };
};

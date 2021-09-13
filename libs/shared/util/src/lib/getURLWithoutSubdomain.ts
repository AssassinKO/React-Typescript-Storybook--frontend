export const getURLWithoutSubdomain = (url: string): string => {
  return url.replace(/^[^.]+\./g, '');
};

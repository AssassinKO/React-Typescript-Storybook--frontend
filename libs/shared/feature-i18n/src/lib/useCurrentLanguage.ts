import { Language } from './types';
import { useTranslation } from 'react-i18next';

const useCurrentLanguage = () => {
  const { i18n } = useTranslation();
  return i18n.language ? (i18n.language.replace(/-.*/, '') as Language) : 'nl';
};

export default useCurrentLanguage;

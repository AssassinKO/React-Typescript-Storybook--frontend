import { FC, useEffect } from 'react';
import { useCompany } from '@homeproved/shared/feature-company';
import { CompanyData } from '@homeproved/shared/data-access';

type CompanyIdFromQueryHandlerProps = {
  id: string;
  onCompany: (company: CompanyData) => void;
};

export const CompanyIdFromQueryHandler: FC<CompanyIdFromQueryHandlerProps> = ({
  id,
  onCompany,
}) => {
  const { company, isSuccess } = useCompany(id);

  useEffect(() => {
    if (isSuccess) onCompany(company);
  }, [company, isSuccess, onCompany]);

  return null;
};

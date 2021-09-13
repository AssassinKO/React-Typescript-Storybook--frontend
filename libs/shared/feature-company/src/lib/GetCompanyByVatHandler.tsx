import { FC, useEffect } from 'react';
import {
  CompaniesApiFactory,
  CompanyData,
  useApiFactory,
  useQueryFetch,
} from '@homeproved/shared/data-access';

type GetCompanyByTavHandlerProps = {
  vat: string;
  onFetching: () => void;
  onCompany: (company?: CompanyData) => void;
};

export const GetCompanyByVatHandler: FC<GetCompanyByTavHandlerProps> = ({
  vat,
  onFetching,
  onCompany,
}) => {
  const companiesApi = useApiFactory(CompaniesApiFactory);
  const {
    query: { data, isSuccess, isError },
  } = useQueryFetch(['companyByTav', vat], () => companiesApi.apiCompaniesVatVatNrGet(vat));

  useEffect(() => {
    onFetching();
  }, [onFetching]);

  useEffect(() => {
    if (isError) onCompany();
    if (isSuccess) onCompany(data.data);
  }, [isError, isSuccess, onCompany, data]);

  return null;
};

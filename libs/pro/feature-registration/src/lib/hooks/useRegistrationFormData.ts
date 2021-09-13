import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';
import { useRegistrationFormData as useRegFormDataContext } from '@homeproved/shared/feature-forms';
import { useCompany } from '@homeproved/shared/feature-company';

export const useRegistrationFormData = (companyId?: string) => {
  const { isSuccess, company } = useCompany(companyId);
  const router = useRouter();
  const { getPath } = useLocalizedRoutes();
  const { data: registrationFormData, setData: setRegistrationFormData } = useRegFormDataContext();
  const [navigatedAway, setNavigatedAway] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      const newSectors = [];
      company.relations.sectors.forEach((sector) => {
        newSectors.push(sector.data.id);
      });

      setRegistrationFormData({
        ...company,
        userFirstName: company.relations.user.data.firstName,
        userLastName: company.relations.user.data.lastName,
        userEmail: company.relations.user.data.email,
        sectorIds: newSectors,
        acceptPolicy: true,
      });
    }
  }, [isSuccess, company, setRegistrationFormData]);

  useEffect(() => {
    if (!companyId && registrationFormData == null && !navigatedAway) {
      router.push(getPath('/registration/step1'), undefined, { shallow: true }).then();
      setNavigatedAway(true);
    }
  }, [companyId, getPath, navigatedAway, registrationFormData, router]);

  const clear = useCallback(() => setRegistrationFormData(undefined), [setRegistrationFormData]);

  return { registrationFormData, clear };
};

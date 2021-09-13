import React, { FC, useState } from 'react';
import { CompanyData, ReviewData } from '../api/generated-api';
import { PlanData } from '../api/generated-api';
import { PersistentDataContext } from './PersistentDataContext';

export const PersistentDataProvider: FC = ({ children }) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanData>();
  const [company, setCompany] = useState<CompanyData>();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [submittedReview, setSubmittedReview] = useState<ReviewData>();

  return (
    <PersistentDataContext.Provider
      value={{
        selectedPlan,
        setSelectedPlan,
        company,
        setCompany,
        searchTerm,
        setSearchTerm,
        submittedReview,
        setSubmittedReview,
      }}
    >
      {children}
    </PersistentDataContext.Provider>
  );
};

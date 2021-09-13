import React from 'react';
import { CompanyData, PlanData, ReviewData } from '../api/generated-api';

export const PersistentDataContext = React.createContext<{
  selectedPlan: PlanData;
  setSelectedPlan: (value: PlanData) => void;

  company: CompanyData;
  setCompany: (value: CompanyData) => void;

  searchTerm: string;
  setSearchTerm: (value: string) => void;

  submittedReview: ReviewData;
  setSubmittedReview: (value: ReviewData) => void;
}>({
  selectedPlan: null,
  setSelectedPlan: () => null,

  company: null,
  setCompany: () => null,

  searchTerm: '',
  setSearchTerm: () => '',

  submittedReview: null,
  setSubmittedReview: () => null,
});

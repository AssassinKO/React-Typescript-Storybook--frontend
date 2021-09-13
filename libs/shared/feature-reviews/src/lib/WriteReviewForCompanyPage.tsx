import React, { FC, useState } from 'react';
import { ReviewShell } from './shell/ReviewShell';
import { WriteReviewForm } from './write-review-for-company/WriteReviewForm';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { CompanyData } from '@homeproved/shared/data-access';

type WriteReviewPageProps = {
  company?: CompanyData;
  getComPath: GetPathFunction;
};

export const WriteReviewForCompanyPage: FC<WriteReviewPageProps> = ({ company, getComPath }) => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <ReviewShell currentStep={currentStep}>
      {company && (
        <WriteReviewForm getComPath={getComPath} company={company} onStep={setCurrentStep} />
      )}
    </ReviewShell>
  );
};

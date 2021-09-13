import React, { FC } from "react";
import { AuthPageWrapper } from "@homeproved/pro/ui";
import { PasswordResetForm } from "./PasswordResetForm";

type PasswordResetPageProps = {
  token: string;
};

export const PasswordResetPage: FC<PasswordResetPageProps> = ({ token }) => (
  <AuthPageWrapper>
    <PasswordResetForm token={token} />
  </AuthPageWrapper>
);

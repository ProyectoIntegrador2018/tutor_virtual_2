import React from "react";
import { PublicLayout } from "components/layouts/PublicLayout";
import { RegisterPageContent } from "components/contents/RegisterPageContent";
import { StringSchema } from "yup";

interface roleNameProps {
  roleName: string,
}

export default function RegisterPage() {
  return (
    <PublicLayout>
      <RegisterPageContent roleName="TUTOR"/>
    </PublicLayout>
  );
}

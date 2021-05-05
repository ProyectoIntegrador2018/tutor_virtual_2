import React from "react";
import { PublicLayout } from "components/layouts/PublicLayout";
import { RegisterPageContent } from "components/contents/RegisterPageContent";
import { UserRoleName } from "lib/types/role";

export default function RegisterPage() {
  return (
    <PublicLayout>
      <RegisterPageContent roleName={UserRoleName.ALLY} />
    </PublicLayout>
  );
}

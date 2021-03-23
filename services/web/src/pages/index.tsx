import React from "react";
import { PublicLayout } from "components/layouts/PublicLayout";
import { LoginPageContent } from "components/contents/LoginPageContent";
import requirePageAuth from "lib/auth/requirePageAuth";
import { UserRoleName } from "lib/types/role";

export const getServerSideProps = requirePageAuth({
  roles: [UserRoleName.NO_AUTH],
  redirect: "/dashboard",
});

export default function LoginPage() {
  return (
    <PublicLayout>
      <LoginPageContent />
    </PublicLayout>
  );
}

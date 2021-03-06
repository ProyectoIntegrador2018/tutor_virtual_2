import { SeasonCreatePageContent } from "components/contents/SeasonCreatePageContent";
import { PrivateLayout } from "components/layouts/PrivateLayout";
import requirePageAuth from "lib/auth/requirePageAuth";
import { UserRoleName } from "lib/types/role";
import React from "react";

export const getServerSideProps = requirePageAuth({
  roles: [UserRoleName.SUPERADMIN, UserRoleName.SUPERVISOR],
  redirect: "/",
});

export default function LoginPage() {
  return (
    <PrivateLayout>
      <SeasonCreatePageContent />
    </PrivateLayout>
  );
}

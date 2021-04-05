import React from "react";
import requirePageAuth from "lib/auth/requirePageAuth";
import { UserRoleName } from "lib/types/role";
import { PrivateLayout } from "components/layouts/PrivateLayout";

export const getServerSideProps = requirePageAuth({
  roles: [
    UserRoleName.SUPERVISOR,
    UserRoleName.SUPERADMIN,
    UserRoleName.ALLY,
    UserRoleName.TUTOR,
  ],
  redirect: "/",
});

export default function DashboardPage() {
  return <PrivateLayout>Estoy Auth!</PrivateLayout>;
}

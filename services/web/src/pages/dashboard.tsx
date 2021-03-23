import React from "react";
import requirePageAuth from "lib/auth/requirePageAuth";
import { UserRoleName } from "lib/types/role";

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
  return <div>Estoy Auth!</div>;
}

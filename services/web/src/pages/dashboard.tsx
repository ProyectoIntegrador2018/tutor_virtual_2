import React from "react";
import requirePageAuth from "lib/auth/requirePageAuth";
import { UserRoleName } from "lib/types/role";
import { PrivateLayout } from "components/layouts/PrivateLayout";
import { DashboardPageContent } from "components/contents/DashboardPageContent";

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
  return (
    <PrivateLayout>
      <DashboardPageContent />
    </PrivateLayout>
  );
}

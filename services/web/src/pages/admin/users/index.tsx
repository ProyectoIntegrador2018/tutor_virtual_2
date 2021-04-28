import React from "react";
import requirePageAuth from "lib/auth/requirePageAuth";
import { UserRoleName } from "lib/types/role";
import { PrivateLayout } from "components/layouts/PrivateLayout";
import { AdminIndexPageContent } from "components/contents/AdminIndexPageContent";

export const getServerSideProps = requirePageAuth({
  roles: [UserRoleName.SUPERADMIN],
  redirect: "/",
});

export default function AdminIndex() {
  return (
    <PrivateLayout>
      <AdminIndexPageContent />
    </PrivateLayout>
  );
}

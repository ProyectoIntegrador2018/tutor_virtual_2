import React from "react";
import requirePageAuth from "lib/auth/requirePageAuth";
import { UserRoleName } from "lib/types/role";
import { PrivateLayout } from "components/layouts/PrivateLayout";
import { AdminUsersLoadFromExcelContent } from "components/contents/AdminUsersLoadFromExcelContent";

export const getServerSideProps = requirePageAuth({
  roles: [UserRoleName.SUPERADMIN],
  redirect: "/",
});

export default function AdminUsersLoadFromExcelPage() {
  return (
    <PrivateLayout>
      <AdminUsersLoadFromExcelContent />
    </PrivateLayout>
  );
}

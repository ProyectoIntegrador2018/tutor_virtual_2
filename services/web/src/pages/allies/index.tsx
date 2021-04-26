import React from "react";
import requirePageAuth from "lib/auth/requirePageAuth";
import { UserRoleName } from "lib/types/role";
import { PrivateLayout } from "components/layouts/PrivateLayout";
import { AlliesIndexPageContent } from "components/contents/AlliesIndexPageContent";

export const getServerSideProps = requirePageAuth({
  roles: [UserRoleName.SUPERVISOR, UserRoleName.SUPERADMIN],
  redirect: "/",
});

export default function AlliesIndex() {
  return (
    <PrivateLayout>
      <AlliesIndexPageContent />
    </PrivateLayout>
  );
}

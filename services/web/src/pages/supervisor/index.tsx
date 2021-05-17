import React from "react";
import requirePageAuth from "lib/auth/requirePageAuth";
import { UserRoleName } from "lib/types/role";
import { PrivateLayout } from "components/layouts/PrivateLayout";
import { SupervisorIndexPageContent } from "../../components/contents/SupervisorIndexPageContent";

export const getServerSideProps = requirePageAuth({
  roles: [UserRoleName.SUPERVISOR],
  redirect: "/",
});

export default function SupervisorIndex() {
  return (
    <PrivateLayout>
      <SupervisorIndexPageContent />
    </PrivateLayout>
  );
}

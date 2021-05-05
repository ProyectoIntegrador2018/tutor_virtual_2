import React from "react";
import { PrivateLayout } from "components/layouts/PrivateLayout";
import { SeasonsIndexPageContent } from "components/contents/SeasonsIndexPageContent";
import requirePageAuth from "lib/auth/requirePageAuth";
import { UserRoleName } from "lib/types/role";

export const getServerSideProps = requirePageAuth({
  roles: [UserRoleName.SUPERADMIN],
  redirect: "/",
});

export default function SeasonsIndexPage() {
  return (
    <PrivateLayout>
      <SeasonsIndexPageContent />
    </PrivateLayout>
  );
}

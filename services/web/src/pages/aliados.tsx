import React from "react";
import requirePageAuth from "lib/auth/requirePageAuth";
import { UserRoleName } from "lib/types/role";
import { PublicLayout } from "components/layouts/PublicLayout";
import { AlliesPublicPageContent } from "components/contents/AlliesPublicPageContent";

export const getServerSideProps = requirePageAuth({
  roles: [UserRoleName.NO_AUTH],
  redirect: "/",
});

export default function AliadosPage() {
  return (
    <PublicLayout>
      <AlliesPublicPageContent />
    </PublicLayout>
  );
}

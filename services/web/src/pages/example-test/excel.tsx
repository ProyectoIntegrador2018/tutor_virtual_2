import React from "react";
import requirePageAuth from "lib/auth/requirePageAuth";
import { UserRoleName } from "lib/types/role";
import { PublicLayout } from "components/layouts/PublicLayout";
import { ExampleTestExcelContent } from "components/contents/ExampleTestExcelContent";

export const getServerSideProps = requirePageAuth({
  roles: [UserRoleName.NO_AUTH],
  redirect: "/",
});

export default function ExampleTestExcel() {
  return (
    <PublicLayout>
      <ExampleTestExcelContent />
    </PublicLayout>
  );
}

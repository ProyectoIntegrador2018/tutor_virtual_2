import { CoursesPageContent } from "components/contents/CoursesPageContent";
import { PrivateLayout } from "components/layouts/PrivateLayout";
import requirePageAuth from "lib/auth/requirePageAuth";
import { UserRoleName } from "lib/types/role";
import React from "react";

export const getServerSideProps = requirePageAuth({
  roles: [UserRoleName.SUPERADMIN, UserRoleName.SUPERVISOR, UserRoleName.TUTOR],
  redirect: "/",
});

export default function LoginPage() {
  return (
    <PrivateLayout>
      <CoursesPageContent />
    </PrivateLayout>
  );
}

import React from "react";
import requirePageAuth from "lib/auth/requirePageAuth";
import { UserRoleName } from "lib/types/role";
import { CoursesPageContent } from "components/contents/CoursesPageContent";

export const getServerSideProps = requirePageAuth({
  roles: [
    UserRoleName.SUPERVISOR,
    UserRoleName.SUPERADMIN,
    UserRoleName.ALLY,
    UserRoleName.TUTOR,
  ],
  redirect: "/",
});

export default function LoginPage() {
  return <CoursesPageContent />;
}
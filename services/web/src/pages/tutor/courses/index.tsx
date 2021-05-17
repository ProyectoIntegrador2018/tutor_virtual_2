import React from "react";
import requirePageAuth from "lib/auth/requirePageAuth";
import { UserRoleName } from "lib/types/role";
import { PrivateLayout } from "components/layouts/PrivateLayout";
import { MyCoursesPageContent } from "../../../components/contents/MyCoursesPageContent";

export const getServerSideProps = requirePageAuth({
  roles: [UserRoleName.TUTOR],
  redirect: "/",
});

export default function TutorCoursesPage() {
  return (
    <PrivateLayout>
      <MyCoursesPageContent myCoursesURL="/courses/tutor" roleName="tutor" />
    </PrivateLayout>
  );
}

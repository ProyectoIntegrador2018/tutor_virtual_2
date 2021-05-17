import React from "react";
import requirePageAuth from "lib/auth/requirePageAuth";
import { UserRoleName } from "lib/types/role";
import { PrivateLayout } from "components/layouts/PrivateLayout";
import { TutorCoursesStudentsPageContent } from "components/contents/TutorCoursesStudentsPageContent";
import { useRouter } from "next/router";

export const getServerSideProps = requirePageAuth({
  roles: [UserRoleName.TUTOR],
  redirect: "/",
});

export default function TutorCoursesPage() {
  const router = useRouter();

  return (
    <PrivateLayout>
      {router.query.id && !(router.query.id instanceof Array) && (
        <TutorCoursesStudentsPageContent courseKey={router.query.id} />
      )}
    </PrivateLayout>
  );
}

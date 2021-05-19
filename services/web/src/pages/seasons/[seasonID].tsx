import React from "react";
import { useRouter } from "next/router";
import { PrivateLayout } from "components/layouts/PrivateLayout";
import { CoursesBySeasonPageContent } from "../../components/contents/CoursesBySeasonPageContent";
import requirePageAuth from "lib/auth/requirePageAuth";
import { UserRoleName } from "lib/types/role";

export const getServerSideProps = requirePageAuth({
  roles: [UserRoleName.SUPERADMIN],
  redirect: "/",
});

export default function Season() {
  const router = useRouter();
  const { seasonID } = router.query;

  return (
    <PrivateLayout>
      <CoursesBySeasonPageContent seasonID={seasonID} />
    </PrivateLayout>
  );
}
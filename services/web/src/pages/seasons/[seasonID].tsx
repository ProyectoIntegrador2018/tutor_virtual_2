import React from "react";
import { useRouter } from "next/router";
import { PrivateLayout } from "components/layouts/PrivateLayout";
import requirePageAuth from "lib/auth/requirePageAuth";
import { UserRoleName } from "lib/types/role";
import { CoursesBySeasonPageContent } from "../../components/contents/CoursesBySeasonPageContent";

export const getServerSideProps = requirePageAuth({
  roles: [UserRoleName.SUPERADMIN],
  redirect: "/",
});

export default function Season() {
  const router = useRouter();
  const { seasonID } = router.query;

  return (
    <PrivateLayout>
      <CoursesBySeasonPageContent seasonID={seasonID as string} />
    </PrivateLayout>
  );
}

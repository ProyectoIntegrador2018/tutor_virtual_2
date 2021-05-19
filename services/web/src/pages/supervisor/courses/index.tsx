import React from "react";
import requirePageAuth from "lib/auth/requirePageAuth";
import { UserRoleName } from "lib/types/role";
import { PrivateLayout } from "components/layouts/PrivateLayout";
import { useAuth } from "lib/hooks/useAuth";
import { LoadingSpinner } from "components/modules/LoadingSpinner";
import { MyCoursesPageContent } from "../../../components/contents/MyCoursesPageContent";

export const getServerSideProps = requirePageAuth({
  roles: [UserRoleName.SUPERVISOR],
  redirect: "/",
});

export default function SupervisorCoursesPage() {
  const { role, loading } = useAuth();
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <PrivateLayout>
      <MyCoursesPageContent
        myCoursesURL="/courses/supervisor"
        roleName={role}
      />
    </PrivateLayout>
  );
}

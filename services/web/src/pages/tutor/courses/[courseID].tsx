import { CoursePageContent } from "components/contents/CoursePageContent";
import { PrivateLayout } from "components/layouts/PrivateLayout";
import React from "react";
import { useRouter } from "next/router";

export default function Course() {
  const router = useRouter();
  const { courseID } = router.query;
  return (
    <PrivateLayout>
      {courseID && (
      <CoursePageContent courseID={courseID} />
      )}
    </PrivateLayout>
  );
}
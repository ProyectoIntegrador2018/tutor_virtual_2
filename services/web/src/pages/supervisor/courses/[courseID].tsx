import { CoursePageContent } from "components/contents/CoursePageContent";
import { PrivateLayout } from "components/layouts/PrivateLayout";
import { useRouter } from "next/router";
import React from "react";

export default function Course() {
  const router = useRouter();
  const { courseID } = router.query;

  if (!courseID || courseID instanceof Array) {
    return null;
  }

  return (
    <PrivateLayout>
      {courseID && <CoursePageContent courseID={courseID} />}
    </PrivateLayout>
  );
}

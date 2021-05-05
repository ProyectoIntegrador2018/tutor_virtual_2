import React from "react";
import { PrivateLayout } from "components/layouts/PrivateLayout";
import { GuidesIndexPageContent } from "components/contents/GuidesIndexPageContent";

export default function GuidesPage() {
  return (
    <PrivateLayout>
      <GuidesIndexPageContent />
    </PrivateLayout>
  );
}

import React from "react";
import { PublicLayout } from "components/layouts/PublicLayout";
import { LoginPageContent } from "components/contents/LoginPageContent";

export default function LoginPage() {
  return (
    <PublicLayout>
      <LoginPageContent />
    </PublicLayout>
  );
}

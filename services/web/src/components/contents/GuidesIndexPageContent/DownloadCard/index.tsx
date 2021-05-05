import React from "react";
import { useAuth } from "lib/hooks/useAuth";
import { UserRoleName } from "lib/types/role";
import { Flex, Text } from "@chakra-ui/react";
import { DownloadButton } from "./DownloadButton";
import { UploadButton } from "./UploadButton";

interface IProps {
  title: string;
  description: string;
  filename: string;
}

export function DownloadCard({ title, description, filename }: IProps) {
  const { role } = useAuth();
  return (
    <Flex flexDir="column" boxShadow="lg" borderRadius="lg" p={8}>
      <Text fontWeight={700} fontSize="3xl">
        {title}
      </Text>
      <Text mb={10}>{description}</Text>
      <Flex justifyContent="space-between">
        <DownloadButton filename={filename} />
        {role === UserRoleName.SUPERADMIN && (
          <UploadButton filename={filename} />
        )}
      </Flex>
    </Flex>
  );
}

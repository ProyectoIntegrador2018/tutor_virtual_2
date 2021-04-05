import { Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface IProps {
  title: string;
  route: string;
  icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

export default function NavbarItem({ title, route, icon }: IProps) {
  const router = useRouter();
  const isRoute = router.pathname === route;

  return (
    <NextLink href={route} passHref>
      <a href={route}>
        <Button
          as="div"
          colorScheme={isRoute ? "blue" : "gray"}
          variant="ghost"
          leftIcon={icon}
          justifyContent="start"
          fontSize="lg"
          borderColor="blue.500"
          w="100%"
          h="48px"
        >
          {title}
        </Button>
      </a>
    </NextLink>
  );
}

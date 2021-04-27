import {
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { FiMenu } from "react-icons/fi";

interface IProps {
  children: ReactNode;
}

export default function NavbarLayout({ children }: IProps) {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const [isMoreThan728] = useMediaQuery("(min-width: 728px)");

  if (isMoreThan728) {
    return (
      <Flex w="100%" maxW="250px" h="100vh" flexDir="column">
        {children}
      </Flex>
    );
  }

  return (
    <Flex
      position={["absolute", "absolute", "relative", "relative"]}
      bottom={0}
    >
      <IconButton
        icon={<FiMenu />}
        ml={2}
        mb={2}
        h="48px"
        w="48px"
        fontSize="2xl"
        aria-label="Menu"
        onClick={onOpen}
        rounded="full"
        colorScheme="blue"
      />
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="xs">
        <DrawerOverlay>
          <DrawerContent>
            {children}
            <Button onClick={onToggle} variant="ghost" my={2}>
              Ocultar
            </Button>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Flex>
  );
}

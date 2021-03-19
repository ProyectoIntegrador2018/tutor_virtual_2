import React from "react";
import {
  Button as ChakraButton,
  forwardRef,
  ButtonProps,
} from "@chakra-ui/react";
import { getButtonColorScheme } from "./helpers";
import { TButtonVariant } from "./types";

interface IProps extends ButtonProps {
  colorVariant: TButtonVariant;
}

export const Button = forwardRef(
  ({ children, colorVariant, ...props }: IProps, ref) => (
    <ChakraButton
      colorScheme={getButtonColorScheme(colorVariant)}
      {...props}
      ref={ref}
    >
      {children}
    </ChakraButton>
  )
);

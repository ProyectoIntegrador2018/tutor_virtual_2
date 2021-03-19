import { TButtonVariant } from "./types";

export function getButtonColorScheme(buttonVariant: TButtonVariant) {
  switch (buttonVariant) {
    case "primary":
      return "primary";
    default:
      return "primary";
  }
}

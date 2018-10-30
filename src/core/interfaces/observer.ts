import { AtLeastOneOf } from "types";

export type Observer<T = any> = AtLeastOneOf<{
  next: (value: T) => void;
  error: (error: Error) => void;
  complete: () => void;
}>;
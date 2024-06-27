import { proxy } from "valtio";

export const locationState = proxy({
  pathname: undefined as undefined | string,
});

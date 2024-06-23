import { proxy } from "valtio";
import * as search from "./search";

export const states = proxy({
  search,
});

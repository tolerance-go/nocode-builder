import { loadTreeDataAction } from "@/stores/projectTreeStore";
import { locationState } from "@/stores/route";
import { subscribe } from "valtio";

subscribe(locationState, () => {
  if (
    locationState.pathname !== "/login" &&
    locationState.pathname !== "/register"
  ) {
    loadTreeDataAction();
  }
});

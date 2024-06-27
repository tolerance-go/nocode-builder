import { loadTreeDataAction } from "@/stores/projectTree";
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

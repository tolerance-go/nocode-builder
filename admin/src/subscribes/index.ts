import {
  compareProjectTreeAction,
  projectTreeState,
} from "@/stores/projectTreeStore";
import { subscribeKey } from "valtio/utils";

subscribeKey(projectTreeState, "treeData", (treeData) => {
  compareProjectTreeAction;
});

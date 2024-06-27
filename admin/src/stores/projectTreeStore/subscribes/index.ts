import {
  projectTreeHistoryState,
  projectTreeState,
} from "@/stores/projectTreeStore";
import { subscribe } from "valtio";
import { subscribeKey } from "valtio/utils";

// subscribeKey(projectTreeState, "treeData", (treeData) => {
//   projectTreeHistoryState.value.data = treeData;
// });


// subscribe(projectTreeHistoryState, () => {

// })
import { devtools } from "valtio/utils";
import { projectTreeTimelineState } from "./projectTreeStore";

export * as layoutStore from "./layoutStore";
export * as projectTreeStore from "./projectTreeStore";

devtools(projectTreeTimelineState, {
  name: "projectTreeTimelineState",
  enabled: import.meta.env.DEV,
});


// devtools(projectTreeHistoryState, {
//   name: "projectTreeHistoryState",
//   enabled: import.meta.env.DEV,
// });

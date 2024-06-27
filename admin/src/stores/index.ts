import { devtools } from "valtio/utils";
import { projectTreeTimelineState } from "./projectTree";

export * as layoutStore from "./layout";
export * as projectTreeStore from "./projectTree";

devtools(projectTreeTimelineState, {
  name: "projectTreeTimelineState",
  enabled: import.meta.env.DEV,
});


// devtools(projectTreeHistoryState, {
//   name: "projectTreeHistoryState",
//   enabled: import.meta.env.DEV,
// });

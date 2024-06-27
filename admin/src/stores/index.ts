import { devtools } from "valtio/utils";
import { projectTreeHistoryState } from "./projectTreeStore";

export * as projectTreeStore from "./projectTreeStore";
export * as layoutStore from "./layoutStore";

devtools(projectTreeHistoryState, {
  name: "projectTreeHistoryState",
  enabled: import.meta.env.DEV,
});

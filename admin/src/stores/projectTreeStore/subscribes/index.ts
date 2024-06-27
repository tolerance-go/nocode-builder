import {
  projectTreeHistoryState,
  projectTreeTimelineState,
} from "@/stores/projectTreeStore";
import { subscribe } from "valtio";

subscribe(projectTreeHistoryState, () => {
  projectTreeTimelineState.data = projectTreeHistoryState.history.nodes.map(
    (item) => {
      return {
        treeData: item.snapshot.data,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
    },
  );
});

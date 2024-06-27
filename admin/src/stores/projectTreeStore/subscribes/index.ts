import { projectTreeHistoryState } from "@/stores/projectTreeStore";
import { subscribe } from "valtio";

subscribe(projectTreeHistoryState, () => {});

import { SyncController } from "./SyncController";

// 使用示例
const syncController = new SyncController("https://api.example.com/friends");
syncController
  .syncData()
  .then(() => {
    console.log("Sync process complete");
  })
  .catch((error) => {
    console.error("Sync process failed:", error);
  });

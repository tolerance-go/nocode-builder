import { db } from "@/db";
import axios from "axios";

interface Friend {
  id?: number;
  name: string;
  age: number;
}

export class SyncController {
  apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl; // 远程数据库的 API URL
  }

  // 从远程数据库获取数据
  async fetchRemoteData(): Promise<Friend[]> {
    try {
      const response = await axios.get<Friend[]>(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error("Error fetching remote data:", error);
      throw new Error("Failed to fetch remote data");
    }
  }

  // 检查本地数据库是否有数据
  async hasLocalData(): Promise<boolean> {
    try {
      const count = await db.friends.count();
      return count > 0;
    } catch (error) {
      console.error("Error checking local data:", error);
      throw new Error("Failed to check local data");
    }
  }

  // 同步数据到本地 Dexie 数据库
  async syncData(): Promise<void> {
    try {
      const hasData = await this.hasLocalData();
      if (hasData) {
        console.log("Local data exists, skipping initialization");
        return;
      }

      const remoteData = await this.fetchRemoteData();
      await db.transaction("rw", db.friends, async () => {
        // 清空本地数据库中的数据
        await db.friends.clear();

        // 插入新的数据到本地数据库
        await db.friends.bulkAdd(remoteData);
      });
      console.log("Data synced successfully");
    } catch (error) {
      console.error("Error syncing data:", error);
    }
  }
}

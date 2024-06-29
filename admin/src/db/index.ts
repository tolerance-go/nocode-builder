import Dexie, { Table } from "dexie";
import { Item } from "../models";

export class Database extends Dexie {
  items: Table<Item, number>;

  constructor() {
    super("Database");
    this.version(1).stores({
      items: "++id, name, value",
    });

    this.items = this.table("items");
  }
}

export const db = new Database();

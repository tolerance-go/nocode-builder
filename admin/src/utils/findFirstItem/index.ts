import { NavItem } from "@/types";

export function findFirstItem(
  navData: NavItem[],
  parentKey: string,
  childKey: string
): NavItem | undefined {
  for (const item of navData) {
    if (item.key === parentKey && item.items) {
      for (const childItem of item.items) {
        if (
          childItem.key === childKey &&
          childItem.items &&
          childItem.items.length > 0
        ) {
          return childItem.items[0];
        }
      }
    }
  }
  return undefined;
}

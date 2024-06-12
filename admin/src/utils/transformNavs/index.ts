import { SiteAgreementNavs, NavItem } from "@/types";

export const transformNavs = (
  navs: SiteAgreementNavs,
  labelMap: { [key: string]: string }
): NavItem[] => {
  const transformItem = (
    item: string | SiteAgreementNavs | { [key: string]: SiteAgreementNavs }
  ): NavItem | null => {
    if (typeof item === "string") {
      return {
        key: item,
        label: labelMap[item] || item,
      };
    } else if (
      Array.isArray(item) &&
      typeof item[0] === "string" &&
      typeof item[1] === "object" &&
      !Array.isArray(item[1])
    ) {
      return {
        key: item[0],
        label: labelMap[item[0]] || item[0],
      };
    } else if (
      Array.isArray(item) &&
      typeof item[0] === "string" &&
      Array.isArray(item[1])
    ) {
      /**
       * 父子关系
       */
      const [key, children] = item;
      return {
        key: key as string,
        label: labelMap[key as string] || (key as string),
        items: transformNavs(children, labelMap),
      };
    }
    return null;
  };

  return navs
    .map(transformItem)
    .filter((item): item is NavItem => item !== null); // Filter out null values
};

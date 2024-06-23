import { SearchParams } from "@/types";
import { useSearchData } from "@/utils/useSearchData";
import { Designer } from "./Designer";
import BlueMap from "./BlueMap";

export const DesignArea = () => {
  const { searchData } = useSearchData<{
    contentType: SearchParams["/apps/:id/design"]["contentType"];
  }>({
    contentType: "design",
  });

  if (searchData.contentType === "blueMap") {
    return <BlueMap />;
  }
  return <Designer />;
};

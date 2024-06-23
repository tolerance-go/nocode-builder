import { SearchParams } from "@/types";
import { useSearchData } from "@/utils/useSearchData";
import BlueMap from "../BlueMap";
import { Designer } from "./Designer";

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

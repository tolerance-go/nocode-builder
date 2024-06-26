import { SearchParams } from "@/types";
import { useSearchData } from "@/utils/useSearchData";
import { Designer } from "./Designer";
import { BlueMap } from "./BlueMap";

export const DesignArea = () => {
  const { searchData } = useSearchData<{
    contentType: SearchParams["/apps/:id/design"]["contentType"];
  }>({
    contentType: "design",
  });

  return (
    <div className="relative h-[100%]">
      <Designer />
      {searchData.contentType === "blueMap" && (
        <div className='absolute inset-0 bg-white'>
          <BlueMap />
        </div>
      )}
    </div>
  );
};

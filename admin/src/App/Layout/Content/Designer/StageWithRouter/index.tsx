import { MemoryRouter } from "@/components/memoryRouter/MemoryRouter";
import { globalEventBus } from "@/globals/eventBus";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { useEffect, useRef } from "react";
import { To, useSearchParams } from "react-router-dom";
import { Stage } from "./Stage";

export const StageWithRouter = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    pathname: "/",
  });
  const pathname = searchParams.get("pathname") as string;

  const navigateRef = useRef<{ navigate: (to: To | number) => void }>(null);

  const handlePathnameChange = (pathname: string) => {
    setSearchParams(
      updateSearchParams(searchParams, {
        pathname,
      })
    );
  };

  useEffect(() => {
    return globalEventBus.on("stageNavigate", (payload) => {
      if (navigateRef.current) {
        navigateRef.current.navigate(payload.to);
      }
    });
  }, []);

  return (
    <MemoryRouter
      initialLocation={pathname}
      onPathnameChange={handlePathnameChange}
      navigateRef={navigateRef}
    >
      <Stage />
    </MemoryRouter>
  );
};

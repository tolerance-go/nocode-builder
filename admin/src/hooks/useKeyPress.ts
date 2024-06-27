import { useEffect } from "react";

function useKeyPress(targetKeys: string[], callback: () => void): void {
  useEffect(() => {
    function downHandler({ key }: KeyboardEvent): void {
      console.log(key);
      if (targetKeys.includes(key)) {
        callback();
      }
    }

    window.addEventListener("keydown", downHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [targetKeys, callback]);
}

export { useKeyPress };

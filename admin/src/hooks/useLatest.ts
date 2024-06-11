import { useEffect, useRef } from "react";

// 定义 useLatest Hook
const useLatest = <T>(value: T) => {
  const ref = useRef(value);

  // 每次 value 变化时更新 ref.current
  useEffect(() => {
    ref.current = value;
  }, [value]);

  // 返回 ref 对象
  return ref;
};

export default useLatest;

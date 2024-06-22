import React, { ReactNode, useEffect, useRef, useState } from "react";

interface MouseFollowerProps {
  children: ReactNode;
  visible: boolean;
}

const MouseFollower: React.FC<MouseFollowerProps> = ({ children, visible }) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const moveEventRef = useRef<MouseEvent>();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      moveEventRef.current = event;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    if (visible && moveEventRef.current) {
      handleMouseMove(moveEventRef.current);
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [visible]);

  if (!visible) return null;

  const style: React.CSSProperties = {
    position: "absolute",
    top: position.y + 20 + "px", // 距离鼠标指针20px
    left: position.x + 20 + "px", // 距离鼠标指针20px
    pointerEvents: "none", // 避免鼠标事件影响
  };

  return <div style={style}>{children}</div>;
};

export default MouseFollower;

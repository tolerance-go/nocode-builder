import MouseFollower from "@/components/MouseFollower";
import React, { useState, useCallback, ReactNode, useEffect } from "react";

const MouseFollowerManager: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  const handleShow = useCallback(() => {
    setContent(
      <div
        style={{
          padding: "10px",
          backgroundColor: "lightblue",
          borderRadius: "5px",
        }}
      >
        我在跟随鼠标移动
      </div>
    );
    setVisible(true);
  }, []);

  const handleHide = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    const handleExternalEvent = (event: KeyboardEvent) => {
      if (event.key === "s") {
        handleShow();
      } else if (event.key === "h") {
        handleHide();
      }
    };

    window.addEventListener("keydown", handleExternalEvent);

    return () => {
      window.removeEventListener("keydown", handleExternalEvent);
    };
  }, [handleShow, handleHide]);

  return <MouseFollower visible={visible}>{content}</MouseFollower>;
};

export default MouseFollowerManager;

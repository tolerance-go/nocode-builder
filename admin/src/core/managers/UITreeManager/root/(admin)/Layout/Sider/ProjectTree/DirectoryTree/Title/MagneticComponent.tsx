import { InputRef, theme } from 'antd';
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface MagneticComponentProps {
  visible: boolean;
  compRef: React.RefObject<InputRef>;
  children: React.ReactNode;
}

const MagneticComponent: React.FC<MagneticComponentProps> = ({
  visible,
  compRef,
  children,
}) => {
  const magneticRef = useRef<HTMLDivElement>(null);

  const { token } = theme.useToken();

  useEffect(() => {
    if (
      visible &&
      compRef.current &&
      compRef.current.input &&
      magneticRef.current
    ) {
      const rect = compRef.current.input.getBoundingClientRect();
      magneticRef.current.style.top = `${rect.bottom + window.scrollY - 1}px`;
      magneticRef.current.style.left = `${rect.left + window.scrollX}px`;
      magneticRef.current.style.width = `${rect.width}px`;
    }
  }, [visible, compRef]);

  const magneticContent = (
    <div
      ref={magneticRef}
      style={{
        boxSizing: 'border-box',
        position: 'absolute',
        background: token.colorErrorBg, // 你可以根据需要更改样式
        border: `1px solid ${token.colorError}`,
        zIndex: token.zIndexPopupBase + 1,
      }}
    >
      {children}
    </div>
  );

  return visible ? createPortal(magneticContent, document.body) : null;
};

export default MagneticComponent;

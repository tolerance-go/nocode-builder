import keyboardjs from 'keyboardjs';
import { useEffect, useRef } from 'react';

type KeyPressCallback = (event?: keyboardjs.KeyEvent) => void;

export function useKeyPress(
  keys: string | string[],
  callback: KeyPressCallback,
  keyEvent: 'keydown' | 'keyup' = 'keydown',
) {
  const callbackRef = useRef<KeyPressCallback>(callback);

  // 更新 ref.current 使得它总是指向最新的回调函数
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleKeyPress = (event?: keyboardjs.KeyEvent) => {
      callbackRef.current(event);
    };

    // 绑定按键事件
    if (keyEvent === 'keydown') {
      keyboardjs.bind(keys, handleKeyPress);
    } else {
      keyboardjs.bind(keys, null, handleKeyPress);
    }

    // 清理函数，组件卸载时解绑按键事件
    return () => {
      if (keyEvent === 'keydown') {
        keyboardjs.unbind(keys, handleKeyPress);
      } else {
        keyboardjs.unbind(keys, null, handleKeyPress);
      }
    };
  }, [keys, keyEvent]);
}

import { Input, InputProps, InputRef } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export const AutoSelectInput = forwardRef<InputRef, InputProps>(
  (props, ref) => {
    const inputRef = useRef<InputRef>(null);

    useImperativeHandle(ref, () => inputRef.current as InputRef);

    useEffect(() => {
      inputRef.current?.focus({
        cursor: 'all', // 'all' 选中全部内容, 'start' 光标在开始位置, 'end' 光标在结束位置
      });
    }, []);

    return <Input {...props} ref={inputRef} autoFocus />;
  },
);

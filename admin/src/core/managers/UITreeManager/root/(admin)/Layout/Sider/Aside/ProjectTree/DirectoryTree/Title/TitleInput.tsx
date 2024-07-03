import { Input, InputProps, InputRef } from 'antd';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { isTitleInputError } from './utils';

export const TitleInput = forwardRef<InputRef, InputProps>((props, ref) => {
  const inputRef = useRef<InputRef>(null);
  const [value, setValue] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  useImperativeHandle(ref, () => inputRef.current as InputRef);

  useEffect(() => {
    inputRef.current?.focus({
      cursor: 'all', // 'all' 选中全部内容, 'start' 光标在开始位置, 'end' 光标在结束位置
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    if (isTitleInputError(inputValue)) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  return (
    <Input
      {...props}
      ref={inputRef}
      value={value}
      onChange={handleChange}
      autoFocus
      status={isError ? 'error' : undefined}
    />
  );
});

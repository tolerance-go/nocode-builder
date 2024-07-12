import {
  useUIStoreManager,
  use验证管理者,
} from '@/core/managers/UITreeManager/hooks';
import { useKeyPressEventByKeyboardJs } from '@/hooks';
import { ReplaceKeyType } from '@/utils';
import { Flex, Input, InputProps, InputRef, theme } from 'antd';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import MagneticComponent from './MagneticComponent';
import MarkdownParser from './MarkdownParser';
import { useAppDispatch, useAppSelector } from '@/core/managers/UIStoreManager';

export const TitleInput = forwardRef<
  InputRef,
  ReplaceKeyType<InputProps, 'defaultValue', string>
>((props, ref) => {
  const {
    slices: {
      projectTree: { actions: projectTreeActions },
    },
  } = useUIStoreManager();

  const 验证管理者实例 = use验证管理者();
  const { token } = theme.useToken();
  const inputRef = useRef<InputRef>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const 当前输入的标题 = useAppSelector(
    (state) => state.projectTree.当前输入的标题,
  );

  useImperativeHandle(ref, () => inputRef.current as InputRef);

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (
    e: React.CompositionEvent<HTMLInputElement>,
  ) => {
    setIsComposing(false);
    handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>, true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fromCompositionEnd = false,
  ) => {
    const inputValue = e.target.value;
    dispatch(projectTreeActions.更新当前输入的标题(inputValue));
    const errMsg = 验证管理者实例.项目树节点标题是否有效(inputValue);
    if (!isComposing || fromCompositionEnd) {
      setErrMsg(errMsg);
    } else {
      setErrMsg(null);
    }
  };

  useEffect(() => {
    inputRef.current?.focus({
      cursor: 'all', // 'all' 选中全部内容, 'start' 光标在开始位置, 'end' 光标在结束位置
    });
  }, []);

  useKeyPressEventByKeyboardJs(['esc'], () => {
    dispatch(projectTreeActions.退出当前正在编辑的节点());
  });

  return (
    <>
      <Input
        {...props}
        autoComplete="off"
        ref={inputRef}
        value={当前输入的标题}
        onChange={handleChange}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        autoFocus
        status={errMsg ? 'error' : undefined}
        style={{
          borderRadius: token.borderRadiusXS,
        }}
      />
      <MagneticComponent visible={!!errMsg} compRef={inputRef}>
        <Flex
          style={{
            padding: `${token.paddingXXS}px ${token.paddingXS}px`,
          }}
        >
          {errMsg && <MarkdownParser content={errMsg}></MarkdownParser>}
        </Flex>
      </MagneticComponent>
    </>
  );
});

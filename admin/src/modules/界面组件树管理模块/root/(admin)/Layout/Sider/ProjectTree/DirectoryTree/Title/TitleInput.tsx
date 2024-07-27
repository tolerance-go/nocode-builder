import { useAppDispatch, useAppSelector } from '@/modules/界面状态仓库模块';
import {
  use界面状态管理者,
  use验证管理者,
} from '@/modules/界面组件树管理模块/hooks';
import { useKeyPressEventByKeyboardJs } from '@/common/hooks';
import { 测试标识 } from '@/common/constants';
import { Flex, Input, InputRef, theme } from 'antd';
import { useEffect, useRef, useState } from 'react';
import MagneticComponent from './MagneticComponent';
import MarkdownParser from './MarkdownParser';

export const TitleInput = ({ nodeKey }: { nodeKey: string }) => {
  const {
    slices: {
      projectTree: { actions: projectTreeActions },
    },
  } = use界面状态管理者();

  const 是否执行了esc退出 = useRef<boolean>(false);

  const 验证管理者 = use验证管理者();
  const 验证管理者实例 = use验证管理者();
  const { token } = theme.useToken();
  const inputRef = useRef<InputRef>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const 为了编辑临时创建的节点的key = useAppSelector(
    (state) => state.projectTree.临时创建的节点的key,
  );
  const 当前输入的标题 = useAppSelector(
    (state) => state.projectTree.当前输入的标题,
  );

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

  const 保存标题输入 = (来自失去焦点: boolean = false) => {
    const 输入框内容 = inputRef.current?.input?.value ?? '';
    const 标题内容错误消息 = 验证管理者.项目树节点标题是否有效(输入框内容);

    if (标题内容错误消息) {
      if (为了编辑临时创建的节点的key === nodeKey) {
        if (来自失去焦点) {
          dispatch(projectTreeActions.删除单个节点(nodeKey));
        }
      } else {
        if (来自失去焦点) {
          dispatch(projectTreeActions.停止节点编辑状态并清空输入内容());
        }
      }
    } else {
      if (为了编辑临时创建的节点的key === nodeKey) {
        dispatch(
          projectTreeActions.新增节点({
            nodeKey,
            title: 输入框内容,
          }),
        );
      } else {
        dispatch(
          projectTreeActions.修改节点({
            nodeKey: nodeKey,
            title: 输入框内容,
          }),
        );
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus({
      cursor: 'all', // 'all' 选中全部内容, 'start' 光标在开始位置, 'end' 光标在结束位置
    });
  }, []);

  useKeyPressEventByKeyboardJs(['esc'], () => {
    是否执行了esc退出.current = true;

    dispatch(projectTreeActions.退出当前正在编辑的节点());
  });

  return (
    <>
      <Input
        onBlur={() => {
          /**
           * 防止有些浏览器环境当 esc 执行后，会触发 input 的 blur
           */
          if (是否执行了esc退出.current) {
            是否执行了esc退出.current = false;
            return;
          }
          保存标题输入(true);
        }}
        onPressEnter={() => {
          保存标题输入();
        }}
        id={测试标识.项目树标题输入框}
        size="small"
        autoComplete="off"
        autoFocus
        ref={inputRef}
        value={当前输入的标题}
        onChange={handleChange}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        status={errMsg ? 'error' : undefined}
        style={{
          width: '100%',
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
};

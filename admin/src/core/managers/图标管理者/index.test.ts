import { typedKeys } from '@/utils';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { 图标管理者 } from '.';

describe('图标管理者', () => {
  const manager = 图标管理者.getInstance();

  typedKeys(图标管理者.跟随组件id到组件映射).forEach((id) => {
    it(`根据id获取组件 - ${id}`, () => {
      const { container } = render(manager.根据id获取组件(id));
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

import { EngineBase } from '@/base';
import { EngineManagerBase } from '@/base/EngineManager';
import { typedKeys } from '@/common/utils';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { 图标管理者 } from '.';

describe('图标管理者', async () => {
  class TestEngineManager extends EngineManagerBase {
    protected providerEngines(): void {
      super.providerEngines(new TestEngine(this));
    }
  }
  class TestEngine extends EngineBase {
    protected providerModules(): void {
      const manager = new 图标管理者(this);
      super.providerModules(manager);
    }
  }
  const engineManager = new TestEngineManager();
  await engineManager.launch();
  const manager = engineManager.getEngine(TestEngine).getModule(图标管理者);

  typedKeys(图标管理者.跟随组件id到组件映射).forEach((id) => {
    it(`根据id获取组件 - ${id}`, () => {
      const { container } = render(manager.根据id获取组件(id));
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

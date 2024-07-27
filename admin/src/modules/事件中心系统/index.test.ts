import { describe, it, expect, vi } from 'vitest';
import { 事件中心系统 } from '.';
import { EngineBase } from '@/base';
import { EngineManagerBase } from '@/base/EngineManager';

class TestEngineManager extends EngineManagerBase {}
class TestEngine extends EngineBase {
  constructor(engineManager: EngineManagerBase) {
    super(engineManager);
  }
}

type 测试事件映射 = {
  用户登录: { 用户ID: string };
  用户登出: { 用户ID: string };
};

describe('全局事件系统', () => {
  it('应该注册和触发事件', async () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const 系统 = new 事件中心系统<测试事件映射>(engine);
    await 系统.setup();
    await 系统.start();

    const 用户登录处理器 = vi.fn();
    const 用户登出处理器 = vi.fn();

    系统.on('用户登录', 用户登录处理器);
    系统.on('用户登出', 用户登出处理器);

    await 系统.emit('用户登录', { 用户ID: '12345' });
    await 系统.emit('用户登出', { 用户ID: '12345' });

    expect(用户登录处理器).toHaveBeenCalledWith({ 用户ID: '12345' });
    expect(用户登出处理器).toHaveBeenCalledWith({ 用户ID: '12345' });
  });

  it('应该取消注册事件', async () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const 系统 = new 事件中心系统<测试事件映射>(engine);
    await 系统.setup();
    await 系统.start();

    const 用户登录处理器 = vi.fn();

    const 取消订阅 = 系统.on('用户登录', 用户登录处理器);
    取消订阅();

    await 系统.emit('用户登录', { 用户ID: '12345' });

    expect(用户登录处理器).not.toHaveBeenCalled();
  });

  it('应该允许重新注册事件', async () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const 系统 = new 事件中心系统<测试事件映射>(engine);
    await 系统.setup();
    await 系统.start();

    const 用户登录处理器 = vi.fn();

    系统.on('用户登录', 用户登录处理器);
    系统.off('用户登录', 用户登录处理器);
    系统.on('用户登录', 用户登录处理器);

    await 系统.emit('用户登录', { 用户ID: '12345' });

    expect(用户登录处理器).toHaveBeenCalledWith({ 用户ID: '12345' });
  });

  it('应该在启动前缓存事件并在启动后按顺序发送', async () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const 系统 = new 事件中心系统<测试事件映射>(engine);
    await 系统.setup();

    const 用户登录处理器 = vi.fn();
    const 用户登出处理器 = vi.fn();

    系统.on('用户登录', 用户登录处理器);
    系统.on('用户登出', 用户登出处理器);

    await 系统.emit('用户登录', { 用户ID: '12345' });
    await 系统.emit('用户登出', { 用户ID: '67890' });

    expect(用户登录处理器).not.toHaveBeenCalled();
    expect(用户登出处理器).not.toHaveBeenCalled();

    await 系统.start();

    expect(用户登录处理器).toHaveBeenCalledWith({ 用户ID: '12345' });
    expect(用户登出处理器).toHaveBeenCalledWith({ 用户ID: '67890' });
  });
});

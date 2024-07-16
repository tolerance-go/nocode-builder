import { describe, it, expect, vi } from 'vitest';
import { 全局事件系统 } from '@/core/systems/全局事件系统';

type 测试事件映射 = {
  用户登录: { 用户ID: string };
  用户登出: { 用户ID: string };
};

describe('全局事件系统', () => {
  it('应该注册和触发事件', async () => {
    const 系统 = new 全局事件系统<测试事件映射>();

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
    const 系统 = new 全局事件系统<测试事件映射>();

    const 用户登录处理器 = vi.fn();

    const 取消订阅 = 系统.on('用户登录', 用户登录处理器);
    取消订阅();

    await 系统.emit('用户登录', { 用户ID: '12345' });

    expect(用户登录处理器).not.toHaveBeenCalled();
  });

  it('应该允许重新注册事件', async () => {
    const 系统 = new 全局事件系统<测试事件映射>();

    const 用户登录处理器 = vi.fn();

    系统.on('用户登录', 用户登录处理器);
    系统.off('用户登录', 用户登录处理器);
    系统.on('用户登录', 用户登录处理器);

    await 系统.emit('用户登录', { 用户ID: '12345' });

    expect(用户登录处理器).toHaveBeenCalledWith({ 用户ID: '12345' });
  });

  it('应该在启动前缓存事件并在启动后按顺序发送', async () => {
    const 系统 = new 全局事件系统<测试事件映射>();

    const 用户登录处理器 = vi.fn();
    const 用户登出处理器 = vi.fn();

    系统.on('用户登录', 用户登录处理器);
    系统.on('用户登出', 用户登出处理器);

    await 系统.emit('用户登录', { 用户ID: '12345' });
    await 系统.emit('用户登出', { 用户ID: '67890' });

    expect(用户登录处理器).not.toHaveBeenCalled();
    expect(用户登出处理器).not.toHaveBeenCalled();

    expect(用户登录处理器).toHaveBeenCalledWith({ 用户ID: '12345' });
    expect(用户登出处理器).toHaveBeenCalledWith({ 用户ID: '67890' });
  });
});

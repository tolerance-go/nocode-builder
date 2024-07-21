import { describe, it, expect } from 'vitest';
import { createActor } from 'xstate';
import { 异步同步状态机 } from './异步同步状态机';

describe('异步同步状态机', () => {
  it('应该从待机状态转移到同步中状态', () => {
    const actor = createActor(异步同步状态机).start();
    actor.send({ type: '开始同步' });
    expect(actor.getSnapshot().value).toEqual({ 同步中: '一般同步中' });
  });

  it('应该从同步中状态转移到同步失败状态', () => {
    const actor = createActor(异步同步状态机).start();
    actor.send({ type: '开始同步' });
    actor.send({ type: '同步失败' });
    expect(actor.getSnapshot().value).toEqual({ 同步已失败: '一般同步已失败' });
  });

  it('应该从同步失败状态转移到重试中状态', () => {
    const actor = createActor(异步同步状态机).start();
    actor.send({ type: '开始同步' });
    actor.send({ type: '同步失败' });
    actor.send({ type: '开始重试' });
    expect(actor.getSnapshot().value).toEqual({ 同步中: '重试中' });
  });

  it('应该从重试中状态转移到重试失败状态', () => {
    const actor = createActor(异步同步状态机).start();
    actor.send({ type: '开始同步' });
    actor.send({ type: '同步失败' });
    actor.send({ type: '开始重试' });
    actor.send({ type: '重试失败' });
    expect(actor.getSnapshot().value).toEqual({ 同步已失败: '重试已失败' });
  });

  it('应该从同步中状态转移到待机状态当同步成功', () => {
    const actor = createActor(异步同步状态机).start();
    actor.send({ type: '开始同步' });
    actor.send({ type: '同步成功' });
    expect(actor.getSnapshot().value).toEqual('待机');
  });

  it('应该从重试中状态转移到待机状态当重试成功', () => {
    const actor = createActor(异步同步状态机).start();
    actor.send({ type: '开始同步' });
    actor.send({ type: '同步失败' });
    actor.send({ type: '开始重试' });
    actor.send({ type: '重试成功' });
    expect(actor.getSnapshot().value).toEqual('待机');
  });
});

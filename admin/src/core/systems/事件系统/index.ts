import { System } from '@/types';
import Emittery from 'emittery';

export type UnsubscribeFn = () => void;

export class 全局事件系统<T = Record<string, unknown>> implements System {
  private emitter = new Emittery<T>();

  public async launch() {
    // 启动逻辑
  }

  public on<EventName extends keyof T>(
    eventName: EventName,
    listener: (eventData: T[EventName]) => void | Promise<void>,
  ): UnsubscribeFn {
    return this.emitter.on(eventName, listener);
  }

  public off<EventName extends keyof T>(
    eventName: EventName,
    listener: (eventData: T[EventName]) => void | Promise<void>,
  ): void {
    return this.emitter.off(eventName, listener);
  }

  public emit<EventName extends keyof T>(
    eventName: EventName,
    eventData: T[EventName],
  ): Promise<void> {
    return this.emitter.emit(eventName, eventData);
  }
}

interface OnOptions {
  immediate?: boolean;
}

// 用于生成嵌套对象路径的类型，过滤掉带下标的路径
type EventPath<T, Prefix extends string = ""> = T extends object
  ? {
      [K in keyof T]: T[K] extends object
        ? T[K] extends unknown[]
          ? `${Prefix}${Prefix extends "" ? "" : "."}${K & string}`
          :
              | `${Prefix}${Prefix extends "" ? "" : "."}${K & string}`
              | EventPath<
                  T[K],
                  `${Prefix}${Prefix extends "" ? "" : "."}${K & string}`
                >
        : `${Prefix}${Prefix extends "" ? "" : "."}${K & string}`;
    }[keyof T]
  : never;

// 用于获取事件负载类型的类型
type EventPayload<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? Rest extends ""
      ? T[K] extends unknown[]
        ? T[K]
        : [T[K]]
      : T[K] extends object
      ? EventPayload<T[K], Rest>
      : never
    : never
  : P extends keyof T
  ? T[P] extends unknown[]
    ? T[P]
    : [T[P]]
  : never;

export class EventBus<TEvents extends Record<string, unknown>> {
  private listeners: {
    [K in EventPath<TEvents>]?: ((
      ...params: EventPayload<TEvents, K>
    ) => void)[];
  } = {};

  private eventHistory: {
    [K in EventPath<TEvents>]?: EventPayload<TEvents, K>;
  } = {};

  constructor() {}

  on<K extends EventPath<TEvents>>(
    eventType: K,
    listener: (...params: EventPayload<TEvents, K>) => void,
    options?: OnOptions
  ): () => void {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType]!.push(listener);

    if (options?.immediate && this.eventHistory[eventType] !== undefined) {
      listener(...(this.eventHistory[eventType] as EventPayload<TEvents, K>));
    }

    return () => this.off(eventType, listener);
  }

  off<K extends EventPath<TEvents>>(
    eventType: K,
    listener: (...params: EventPayload<TEvents, K>) => void
  ): void {
    const listeners = this.listeners[eventType];
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  emit<K extends EventPath<TEvents>>(
    eventType: K,
    ...params: EventPayload<TEvents, K>
  ): void {
    console.log("eventType:", eventType, "params:", params);
    this.eventHistory[eventType] = params as EventPayload<TEvents, K>;

    this.triggerListeners(eventType, ...params);
  }

  private triggerListeners<K extends EventPath<TEvents>>(
    eventType: K,
    ...params: EventPayload<TEvents, K>
  ): void {
    const listeners = this.listeners[eventType];
    if (listeners) {
      listeners.forEach((listener) => listener(...params));
    }

    // 递归触发子路径
    const eventTypePrefix = `${eventType}.`;
    Object.keys(this.listeners).forEach((key) => {
      if (key.startsWith(eventTypePrefix)) {
        const subEventType = key as EventPath<TEvents>;
        const subParams = this.eventHistory[subEventType] as EventPayload<
          TEvents,
          typeof subEventType
        >;
        if (subParams) {
          const subListeners = this.listeners[subEventType];
          if (subListeners) {
            subListeners.forEach((listener) => listener(...subParams));
          }
        }
      }
    });
  }
}

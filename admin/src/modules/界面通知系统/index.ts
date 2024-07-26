import { 测试标识 } from '@/common/constants';
import { MessageInstance } from 'antd/es/message/interface';
import { HookAPI } from 'antd/es/modal/useModal';
import { NotificationInstance } from 'antd/es/notification/interface';
import { createElement } from 'react';
import { ModalFuncProps } from 'antd';
import { EngineBase, ModuleBase } from '@/base';

interface MessageOptions {
  type: 'success' | 'error' | 'info' | 'warning' | 'loading';
  content: string;
  duration?: number;
}

interface NotificationOptions {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  description: string;
  duration?: number;
}

type ModalOptions = ModalFuncProps & {
  type: 'info' | 'success' | 'error' | 'warning' | 'confirm';
};

export class 界面通知系统 extends ModuleBase {
  private static instance: 界面通知系统;

  public static getInstance(engine: EngineBase): 界面通知系统 {
    if (!界面通知系统.instance) {
      界面通知系统.instance = new 界面通知系统(engine);
    }
    return 界面通知系统.instance;
  }

  setMessageApi = (messageApi: MessageInstance): void => {
    this.messageApi = messageApi;
    this.processQueue(this.messageQueue);
  };

  setNotificationApi = (notificationApi: NotificationInstance): void => {
    this.notificationApi = notificationApi;
    this.processQueue(this.notificationQueue);
  };

  setModalApi = (modalApi: HookAPI): void => {
    this.modalApi = modalApi;
    this.processQueue(this.modalQueue);
  };

  showMessage = (options: MessageOptions): Promise<void> => {
    return new Promise((resolve) => {
      const action = () => {
        if (this.messageApi) {
          this.messageApi.open({
            type: options.type,
            content: createElement('span', {
              'data-test-id': 测试标识.全局消息框标题,
              children: options.content,
            }),
            duration: options.duration,
          });
          resolve();
        } else {
          this.messageQueue.push(action);
        }
      };
      action();
    });
  };

  showNotification = ({
    type,
    ...rest
  }: NotificationOptions): Promise<void> => {
    return new Promise((resolve) => {
      const action = () => {
        if (this.notificationApi) {
          this.notificationApi[type]({
            message: createElement('span', {
              'data-test-id': 测试标识.全局通知框标题,
              children: rest.message,
            }),
            description: rest.description,
            duration: rest.duration,
          });
          resolve();
        } else {
          this.notificationQueue.push(action);
        }
      };
      action();
    });
  };

  showModal = ({ type, ...rest }: ModalOptions): Promise<void> => {
    return new Promise((resolve) => {
      const action = () => {
        if (this.modalApi) {
          this.modalApi[type]({
            ...rest,
            title: createElement('span', {
              'data-test-id': 测试标识.全局模态框标题,
              children: rest.title,
            }),
            content: rest.content,
            onOk: rest.onOk,
            onCancel: rest.onCancel,
          });
          resolve();
        } else {
          this.modalQueue.push(action);
        }
      };
      action();
    });
  };

  private messageApi: MessageInstance | null = null;
  private notificationApi: NotificationInstance | null = null;
  private modalApi: HookAPI | null = null;

  private messageQueue: Array<() => void> = [];
  private notificationQueue: Array<() => void> = [];
  private modalQueue: Array<() => void> = [];

  private processQueue(queue: Array<() => void>): void {
    while (queue.length > 0) {
      const action = queue.shift();
      if (action) {
        action();
      }
    }
  }
}

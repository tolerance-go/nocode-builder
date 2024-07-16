import { System } from '@/types';
import { MessageInstance } from 'antd/es/message/interface';
import { HookAPI } from 'antd/es/modal/useModal';
import { NotificationInstance } from 'antd/es/notification/interface';

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

interface ModalOptions {
  type: 'info' | 'success' | 'error' | 'warning' | 'confirm';
  title: string;
  content?: string;
  onOk?: () => void;
  onCancel?: () => void;
}

export class 界面通知系统 implements System {
  private messageApi: MessageInstance | null = null;
  private notificationApi: NotificationInstance | null = null;
  private modalApi: HookAPI | null = null;

  private messageQueue: Array<() => void> = [];
  private notificationQueue: Array<() => void> = [];
  private modalQueue: Array<() => void> = [];

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

  private processQueue(queue: Array<() => void>): void {
    while (queue.length > 0) {
      const action = queue.shift();
      if (action) {
        action();
      }
    }
  }

  showMessage = (options: MessageOptions): Promise<void> => {
    return new Promise((resolve) => {
      const action = () => {
        if (this.messageApi) {
          this.messageApi.open({
            type: options.type,
            content: options.content,
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
            message: rest.message,
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
            title: rest.title,
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

  public async launch() {
    // 启动逻辑
  }
}

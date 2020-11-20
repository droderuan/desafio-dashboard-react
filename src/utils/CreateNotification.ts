import { notification } from 'antd';

interface ICreateNotification {
  key: string;
  message: string;
  type: 'sucess' | 'warning' | 'error';
  duration?: number;
}

export default function createNotification({
  key,
  message,
  type,
  duration = 2,
}: ICreateNotification): void {
  switch (type) {
    case 'sucess':
      notification.success({
        key,
        message,
        duration,
        placement: 'bottomLeft',
      });
      break;

    case 'warning':
      notification.warning({
        key,
        message,
        duration,
        placement: 'bottomLeft',
      });
      break;

    case 'error':
      notification.error({
        key,
        message,
        duration,
        placement: 'bottomLeft',
      });
      break;
    default:
      notification.open({
        key,
        message,
        duration,
        placement: 'topRight',
      });
  }
}

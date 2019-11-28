import { message } from 'antd';

const key = 'updatable';

export const openMessage = (content) => {
    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      message.success({ content: content, key, duration: 2 });
    });
  };
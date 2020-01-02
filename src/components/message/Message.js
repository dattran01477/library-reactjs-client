import { message } from 'antd';

const key = 'updatable';

export const openMessage = (content,isFail) => {
    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      if(isFail===true){
        message.error({ content: content, key, duration: 2 });
      }else{
        message.success({ content: content, key, duration: 2 });
      }
    });
    
  };
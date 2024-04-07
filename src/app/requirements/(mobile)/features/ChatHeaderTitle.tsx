import {MobileNavBarTitle} from '@lobehub/ui';
import {memo} from 'react';
import {useGlobalStore} from '@/store/global';

const ChatHeaderTitle = memo(() => {
  const toggleConfig = useGlobalStore((s) => s.toggleMobileTopic);

  return (
    <MobileNavBarTitle
      title={
        <div onClick={() => toggleConfig()}>
          {'商机详情'}
        </div>
      }
    />
  );
});

export default ChatHeaderTitle;

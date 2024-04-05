import {ChatHeader, ChatHeaderTitle} from '@lobehub/ui';
import {memo} from 'react';

import {SettingsTabs} from '@/store/global/initialState';

const Header = memo(({activeTab}: { activeTab: SettingsTabs }) => {

  return (
    <ChatHeader
      left={
        <div style={{paddingLeft: 8}}>
          <ChatHeaderTitle title={'商机详情'} />
        </div>
      }
    />
  );
});

export default Header;

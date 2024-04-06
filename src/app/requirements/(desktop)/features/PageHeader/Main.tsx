import {ChatHeaderTitle} from '@lobehub/ui';
import {Skeleton} from 'antd';
import {memo} from 'react';
import {Flexbox} from 'react-layout-kit';

import {useSessionStore} from '@/store/session';
import {agentSelectors, sessionSelectors} from '@/store/session/selectors';

const Main = memo(() => {
  const [init, title, description, avatar, backgroundColor] = useSessionStore((s) => [
    sessionSelectors.isSomeSessionActive(s),
    agentSelectors.currentAgentTitle(s),
    agentSelectors.currentAgentDescription(s),
    agentSelectors.currentAgentAvatar(s),
    agentSelectors.currentAgentBackgroundColor(s),
  ]);

  return !init ? (
    <Flexbox horizontal>
      <Skeleton
        active
        avatar={{shape: 'circle', size: 'default'}}
        paragraph={false}
        title={{style: {margin: 0, marginTop: 8}, width: 200}}
      />
    </Flexbox>
  ) : (
    <span style={{fontSize: '16px'}}>商机详情</span>
  );
});

export default Main;

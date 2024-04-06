import {DraggablePanel, DraggablePanelContainer} from '@lobehub/ui';
import {createStyles} from 'antd-style';
import {memo} from 'react';

import SafeSpacing from '@/components/SafeSpacing';
import {CHAT_SIDEBAR_WIDTH, REQUIREMENTS_SIDEBAR_WIDTH} from '@/const/layoutTokens';
import {useGlobalStore} from '@/store/global';
import Solution from "./Solution";

const useStyles = createStyles(({css, token}) => ({
  content: css`
    display: flex;
    flex-direction: column;
    height: 100% !important;
  `,
  drawer: css`
    z-index: 0;
    background: ${token.colorBgLayout};
  `,
  header: css`
    border-bottom: 1px solid ${token.colorBorder};
  `,
}));

const Desktop = memo(() => {
  const {styles} = useStyles();
  const [showAgentSettings, toggleConfig] = useGlobalStore((s) => [
    s.preference.showChatSideBar,
    s.toggleChatSideBar,
  ]);

  return (
    <DraggablePanel
      className={styles.drawer}
      classNames={{
        content: styles.content,
      }}
      expand={showAgentSettings}
      minWidth={REQUIREMENTS_SIDEBAR_WIDTH}
      mode={'fixed'}
      onExpandChange={toggleConfig}
      placement={'right'}
    >
      <DraggablePanelContainer
        style={{
          flex: 'none',
          height: '100%',
          maxHeight: '100vh',
          minWidth: REQUIREMENTS_SIDEBAR_WIDTH,
          overflow: 'scroll',
        }}
      >
        <SafeSpacing />
        <Solution />
      </DraggablePanelContainer>
    </DraggablePanel>
  );
});

export default Desktop;

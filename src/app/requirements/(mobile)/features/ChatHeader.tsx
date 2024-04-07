import {ActionIcon, MobileNavBar} from '@lobehub/ui';
import {useRouter} from 'next/navigation';
import {memo} from 'react';

import ChatHeaderTitle from './ChatHeaderTitle';
import {PanelRightClose, PanelRightOpen} from "lucide-react";
import {DESKTOP_HEADER_ICON_SIZE} from "@/const/layoutTokens";
import {useGlobalStore} from "@/store/global";

const MobileHeader = memo(() => {
  const router = useRouter();

  const [showAgentSettings, toggleConfig] = useGlobalStore((s) => [
    s.preference.showChatSideBar,
    s.toggleMobileTopic,
  ]);

  return (
    <MobileNavBar
      center={<ChatHeaderTitle />}
      onBackClick={() => router.push('/requirements')}
      right={
        <>
          <ActionIcon
            icon={showAgentSettings ? PanelRightClose : PanelRightOpen}
            onClick={() => toggleConfig()}
            size={DESKTOP_HEADER_ICON_SIZE}
          />
        </>
      }
      showBackButton
    />
  );
});

export default MobileHeader;

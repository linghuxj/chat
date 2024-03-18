import {ActionIcon, MobileNavBar} from '@lobehub/ui';
import { useRouter } from 'next/navigation';
import { memo } from 'react';

// import SettingButton from '../../features/ChatHeader/SettingButton';
// import ShareButton from '../../features/ChatHeader/ShareButton';
import ChatHeaderTitle from './ChatHeaderTitle';
import {PanelRightClose, PanelRightOpen} from "lucide-react";
import {DESKTOP_HEADER_ICON_SIZE} from "@/const/layoutTokens";
import {useGlobalStore} from "@/store/global";

const MobileHeader = memo(() => {
  const router = useRouter();
  // const [open, setOpen] = useState(false);

  // const items: MenuProps['items'] = [
  //   {
  //     icon: <Icon icon={Share2} />,
  //     key: 'share',
  //     label: t('share', { ns: 'common' }),
  //     onClick: () => setOpen(true),
  //   },
  //   !isInbox && {
  //     icon: <Icon icon={Settings} />,
  //     key: 'settings',
  //     label: t('header.session', { ns: 'setting' }),
  //     onClick: () => router.push(pathString('/chat/settings', { hash: location.hash })),
  //   },
  // ].filter(Boolean) as MenuProps['items'];

  const [showAgentSettings, toggleConfig] = useGlobalStore((s) => [
    s.preference.showChatSideBar,
    s.toggleMobileTopic,
  ]);

  return (
    <MobileNavBar
      center={<ChatHeaderTitle />}
      onBackClick={() => router.push('/chat')}
      right={
        <>
          {/*<ShareButton mobile open={open} setOpen={setOpen} />*/}
          {/*<SettingButton mobile />*/}
          {/*<Dropdown*/}
          {/*  menu={{*/}
          {/*    items,*/}
          {/*  }}*/}
          {/*  trigger={['click']}*/}
          {/*>*/}
          {/*  <ActionIcon icon={MoreHorizontal} />*/}
          {/*</Dropdown>*/}
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

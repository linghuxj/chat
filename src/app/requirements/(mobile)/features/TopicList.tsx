import {Modal} from '@lobehub/ui';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';

import {useGlobalStore} from '@/store/global';
import RequirementsNode from "@/app/chat/features/RequirementsNode";

const Topics = memo(() => {
  const [showAgentSettings, toggleConfig] = useGlobalStore((s) => [
    s.preference.mobileShowTopic,
    s.toggleMobileTopic,
  ]);

  return (
    <Modal
      allowFullscreen
      onCancel={() => toggleConfig(false)}
      open={showAgentSettings}
      title={'商机列表'}
    >
      <RequirementsNode />
    </Modal>
  );
});

export default Topics;

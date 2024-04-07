import {Modal} from '@lobehub/ui';
import {memo} from 'react';

import {useGlobalStore} from '@/store/global';
import Solution from "@/app/requirements/features/Solution";

const Topics = memo(() => {
  const [showAgentSettings, toggleConfig] = useGlobalStore((s) => [
    s.preference.mobileShowSolution,
    s.toggleMobileSolution,
  ]);

  return (
    <Modal
      allowFullscreen
      onCancel={() => toggleConfig(false)}
      open={showAgentSettings}
      title={'推荐合作'}
    >
      <Solution />
    </Modal>
  );
});

export default Topics;

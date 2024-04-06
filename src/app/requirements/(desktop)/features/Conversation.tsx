import {memo} from 'react';

import {Flexbox} from "react-layout-kit";
import SafeSpacing from "@/components/SafeSpacing";
import {useResponsive} from "antd-style";
import PageDetails from "@/app/requirements/features/PageDetails";

const Conversation = memo(() => {
  const {mobile} = useResponsive();

  return (
    <Flexbox flex={1} style={{position: 'relative'}}>
      <SafeSpacing mobile={mobile} />
      <PageDetails />
    </Flexbox>
  );
});

export default Conversation;

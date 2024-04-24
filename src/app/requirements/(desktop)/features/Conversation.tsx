import {memo} from 'react';

import {Flexbox} from "react-layout-kit";

import PageDetails from "@/app/requirements/features/PageDetails";

const Conversation = memo(() => {
  return (
    <Flexbox flex={1} style={{position: 'relative'}}>
      <PageDetails />
    </Flexbox>
  );
});

export default Conversation;

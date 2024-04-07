'use client';

import {memo} from 'react';
import {Flexbox} from 'react-layout-kit';

import ChatHeader from '../features/ChatHeader';
import AppLayoutMobile from '@/layout/AppLayout.mobile';
import PageDetails from "@/app/requirements/features/PageDetails";

const Chat = memo(() => {
  // due to mobile side don't have sessionList, so we need to fetch sessions here
  // refs: https://github.com/lobehub/lobe-chat/pull/541

  return (
    <AppLayoutMobile navBar={<ChatHeader />}>
      <Flexbox height={'calc(100% - 44px)'} horizontal>
        <PageDetails />
      </Flexbox>
    </AppLayoutMobile>
  );
});
export default Chat;

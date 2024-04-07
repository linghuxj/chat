'use client';

import {useRouter} from 'next/navigation';
import {memo, useEffect} from 'react';

import AppLayoutMobile from '@/layout/AppLayout.mobile';

import PageTitle from '../features/PageTitle';
import SessionHeader from './features/SessionHeader';
import SessionList from './features/SessionList';

const ChatMobilePage = memo(() => {
  const router = useRouter();
  useEffect(() => {
    router.prefetch('/requirements/mobile');
  }, []);

  return (
    <AppLayoutMobile navBar={<SessionHeader />}>
      <PageTitle />
      <SessionList />
    </AppLayoutMobile>
  );
});

export default ChatMobilePage;

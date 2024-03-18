'use client';

import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';
import { Flexbox } from 'react-layout-kit';

import AppLayoutMobile from '@/layout/AppLayout.mobile';
import { SidebarTabKey } from '@/store/global/initialState';

import Header from './features/Header';
import {useTranslation} from "react-i18next";

const DetailModal = dynamic(() => import('./features/AgentDetail'));

const MarketLayout = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation("common")
  return (
    <AppLayoutMobile navBar={<Header />} showTabBar tabBarKey={SidebarTabKey.Market}>
      <Flexbox flex={1} gap={16} style={{ padding: 16 }}>
        <Flexbox align={'center'}>{t('tab.market4')}</Flexbox>
        {children}
      </Flexbox>
      <DetailModal />
    </AppLayoutMobile>
  );
};

export default MarketLayout;

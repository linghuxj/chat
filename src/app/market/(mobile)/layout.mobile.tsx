'use client';

import dynamic from 'next/dynamic';
import {PropsWithChildren} from 'react';
import {Flexbox} from 'react-layout-kit';

import AppLayoutMobile from '@/layout/AppLayout.mobile';
import {SidebarTabKey} from '@/store/global/initialState';

import Header from './features/Header';
import {useTranslation} from "react-i18next";

const DetailModal = dynamic(() => import('./features/AgentDetail'));

const MarketLayout = ({children}: PropsWithChildren) => {
  const {t} = useTranslation("common")
  return (
    <AppLayoutMobile navBar={<Header />} showTabBar tabBarKey={SidebarTabKey.Market}>
      <Flexbox flex={1} gap={16} style={{padding: '0 16'}}>
        <Flexbox>
          <div> -- 用AI工具活跃银行客户</div>
          <div> -- 在客户合作（生态）中，实现批量业务和业务的持续创新</div>
          <div> -- 快速整合资源，领先时代和行业</div>
        </Flexbox>
        {children}
      </Flexbox>
      <DetailModal />
    </AppLayoutMobile>
  );
};

export default MarketLayout;

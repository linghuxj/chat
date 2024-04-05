'use client';

import {ReactNode, memo} from 'react';
import {Center, Flexbox} from 'react-layout-kit';

import SafeSpacing from '@/components/SafeSpacing';
import AppLayoutDesktop from '@/layout/AppLayout.desktop';
import {SettingsTabs, SidebarTabKey} from '@/store/global/initialState';

import Header from './features/Header';
import SideBar from './features/SideBar';

export interface DesktopLayoutProps {
  activeTab: SettingsTabs;
  children: ReactNode;
}

const DesktopLayout = memo<DesktopLayoutProps>(({children, activeTab}) => {
  return (
    <AppLayoutDesktop sidebarKey={SidebarTabKey.Market}>
      <SideBar activeTab={activeTab} />
      <Flexbox flex={1} height={'100%'} style={{position: 'relative'}}>
        <Header activeTab={activeTab} />
        <Flexbox flex={1} padding={24} style={{overflow: 'scroll'}}>
          <SafeSpacing />
          {children}
        </Flexbox>
      </Flexbox>
    </AppLayoutDesktop>
  );
});

export default DesktopLayout;

'use client';

import dynamic from 'next/dynamic';
import {FC, memo} from 'react';

import ResponsiveContainer from '@/components/ResponsiveContainer';
import MobileSwitchLoading from '@/features/MobileSwitchLoading';

import DesktopLayout from './layout.desktop';
import PageDetails from "@/app/requirements/features/PageDetails";

const Mobile: FC = dynamic(() => import('../(mobile)'), {
  loading: MobileSwitchLoading,
  ssr: false,
}) as FC;

export default memo(() => (
  <ResponsiveContainer Mobile={Mobile}>
    <DesktopLayout activeTab={'v1'}>
      <PageDetails />
    </DesktopLayout>
  </ResponsiveContainer>
));

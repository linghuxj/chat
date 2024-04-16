'use client';

import {Divider, Statistic, StatisticProps} from 'antd';
import {createStyles} from 'antd-style';
import {memo} from 'react';
import {Center, Flexbox} from 'react-layout-kit';

import {CURRENT_VERSION} from '@/const/version';
import AvatarWithUpload from '@/features/AvatarWithUpload';
import {useGlobalStore} from '@/store/global';
import {commonSelectors} from '@/store/global/selectors';

import SettingList from '../../features/SettingList';
import AvatarBanner from '../features/AvatarBanner';
import Layout from './layout.mobile';
import CountUp from 'react-countup';
import {FireOutlined, TeamOutlined, TransactionOutlined} from "@ant-design/icons";
import {useCustomStore} from "@/store/custom";

const useStyles = createStyles(({css, token}) => ({
  divider: css`
    height: 6px;
    background: ${token.colorFillTertiary};
  `,
  footer: css`
    font-size: 12px;
    color: ${token.colorTextQuaternary};
  `,
}));

const Setting = memo(() => {
  const avatar = useGlobalStore(commonSelectors.userAvatar);
  const {styles} = useStyles();

  const [stat, totalStat] = useCustomStore((s) => [s.stat, s.totalStat]);

  const formatter: StatisticProps['formatter'] = (value) => (
    <CountUp end={value as number} separator={','} />
  );

  return (
    <Layout>
      <AvatarBanner avatar={avatar}>
        <Center style={{position: 'absolute', zIndex: 2}}>
          <AvatarWithUpload size={88} />
        </Center>
      </AvatarBanner>
      <div style={{width: '100%'}}>
        <Flexbox justify={'space-between'} style={{padding: '1.2em'}} horizontal>
          <Flexbox align={'end'} gap={2} horizontal>
            <Statistic title={'用户访问'} value={totalStat.userLoginData} formatter={formatter}
                       prefix={<FireOutlined />}
                       valueStyle={{fontSize: '1.4em'}} />
            <Statistic value={stat.userLoginData} formatter={formatter} prefix={'+'}
                       valueStyle={{fontSize: '1.2em', color: 'red'}} />
          </Flexbox>
          <Flexbox align={'end'} gap={2} horizontal>
            <Statistic title={'商机'} value={totalStat.chatRequireData} formatter={formatter}
                       prefix={<TransactionOutlined />}
                       valueStyle={{fontSize: '1.4em'}} />
            <Statistic value={stat.chatRequireData} formatter={formatter} prefix={'+'}
                       valueStyle={{fontSize: '1.2em', color: 'red'}} />
          </Flexbox>
          <Flexbox align={'end'} gap={2} horizontal>
            <Statistic title={'意向合作'} value={totalStat.chatRequirePlanData} formatter={formatter}
                       prefix={<TeamOutlined />}
                       valueStyle={{fontSize: '1.4em'}} />
            <Statistic value={stat.chatRequirePlanData} formatter={formatter} prefix={'+'}
                       valueStyle={{fontSize: '1.2em', color: 'red'}} />
          </Flexbox>
        </Flexbox>
        <div className={styles.divider} />
        <SettingList />
        <div className={styles.divider} />
        {/*<ExtraList />*/}
        <Center style={{paddingInline: 64}}>
          <Divider>
            <span className={styles.footer}>ChatBank v{CURRENT_VERSION}</span>
          </Divider>
        </Center>
      </div>
    </Layout>
  );
});

export default Setting;

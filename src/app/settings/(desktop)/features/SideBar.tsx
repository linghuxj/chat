import {createStyles, useResponsive} from 'antd-style';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {Flexbox} from 'react-layout-kit';

import SettingList, {SettingListProps} from '../../features/SettingList';
import {Statistic, StatisticProps} from "antd";
import {FireOutlined, TeamOutlined, TransactionOutlined} from "@ant-design/icons";
import CountUp from "react-countup";
import {useCustomStore} from "@/store/custom";

const useStyles = createStyles(({stylish, token, css}) => ({
  body: stylish.noScrollbar,
  container: css`
    border-inline-end: 1px solid ${token.colorBorder};
  `,
  logo: css`
    fill: ${token.colorText};
  `,
  top: css`
    font-size: 20px;
    font-weight: bold;
  `,
}));

const SideBar = memo<SettingListProps>(({activeTab}) => {
  const {styles} = useStyles();

  const {t} = useTranslation('common');
  const {mobile} = useResponsive();

  const [stat, totalStat] = useCustomStore((s) => [s.stat, s.totalStat]);

  const formatter: StatisticProps['formatter'] = (value) => (
    <CountUp end={value as number} separator={','} />
  );

  return (
    <Flexbox className={styles.container} width={280}>
      <Flexbox className={styles.top} padding={16}>
        {t('setting')}
      </Flexbox>
      <Flexbox gap={8} style={{paddingInline: 8}}>
        <Flexbox style={{padding: '0 1.0em'}}>
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
        <SettingList activeTab={activeTab} mobile={mobile} />
      </Flexbox>
    </Flexbox>
  );
});

export default SideBar;

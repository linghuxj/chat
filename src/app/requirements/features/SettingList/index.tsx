import Link from 'next/link';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';

import {SettingsTabs} from '@/store/global/initialState';

const {Item} = List;
import {createStyles} from "antd-style";
import {List} from "@lobehub/ui";

export interface SettingListProps {
  activeTab?: SettingsTabs;
  mobile?: boolean;
}

const useStyles = createStyles(({css, token, responsive}) => ({
  container: css`
    position: relative;
    padding-top: 16px;
    padding-bottom: 16px;
    border-radius: ${token.borderRadius}px;

    ${responsive.mobile} {
      border-radius: 0;
    }
  `,
  noHover: css`
    pointer-events: none;
  `,
}));

const SettingList = memo<SettingListProps>(({activeTab, mobile}) => {
  const {t} = useTranslation('setting');
  const {cx, styles} = useStyles();

  const items = [
    {label: '设计与装修', value: 'v1'},
    {label: '证照办理与合规', value: 'v2'},
    {label: '采购与招聘', value: 'v3'},
  ];

  return items.map(({value, label}) => (
    <Link aria-label={label} href={`/requirements/${value}`} key={value}>
      <Item
        avatar={null}
        active={mobile ? false : activeTab === value}
        className={cx(styles.container, mobile && styles.noHover)}
        title={label as string}
      />
    </Link>
  ));
});

export default SettingList;

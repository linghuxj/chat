import {Avatar, Logo, MobileNavBar} from '@lobehub/ui';
import {createStyles} from 'antd-style';
import {useRouter} from 'next/navigation';
import {memo} from 'react';

import {useGlobalStore} from '@/store/global';
import {commonSelectors} from '@/store/global/selectors';
import {useTranslation} from "react-i18next";

export const useStyles = createStyles(({css, token}) => ({
  logo: css`
    fill: ${token.colorText};
  `,
  top: css`
    position: sticky;
    top: 0;
  `,
}));

const Header = memo(() => {
  const router = useRouter();
  return (
    <MobileNavBar
      center={
        <span style={{fontSize: '16px', fontWeight: '500'}}>
          {'商机列表'}
        </span>
      }
      onBackClick={() => router.push('/market')}
      showBackButton
    />
  );
});

export default Header;

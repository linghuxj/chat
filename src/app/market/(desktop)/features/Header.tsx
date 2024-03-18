import { ChatHeader, Logo } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import Link from 'next/link';
import { memo } from 'react';

// import ShareAgentButton from '../../features/ShareAgentButton';
import { useTranslation } from "react-i18next";

export const useStyles = createStyles(({ css, token }) => ({
  logo: css`
    color: ${token.colorText};
    fill: ${token.colorText};
  `,
}));

const Header = memo(() => {
  const { t } = useTranslation('common');

  return (
    <ChatHeader
      left={
        <Link aria-label={'home'} href={'/'}>
          {t('tab.market')}
        </Link>
      }
      // right={<ShareAgentButton />}
    />
  );
});

export default Header;

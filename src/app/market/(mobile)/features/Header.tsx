import { MobileNavBar } from '@lobehub/ui';
import { memo } from 'react';
import {useTranslation} from "react-i18next";

const Header = memo(() => {
  const { t } = useTranslation("common")
  return <MobileNavBar center={
    <>
      {t('tab.market')}
    </>
  }/>;
});

export default Header;

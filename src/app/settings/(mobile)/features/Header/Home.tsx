import { MobileNavBar } from '@lobehub/ui';
import {memo} from 'react';
import { useTranslation } from "react-i18next";


const Header = memo(() => {
  const { t } = useTranslation('common')
  return <MobileNavBar center={
    <>
      我的智能助手
    </>
  } />;
});

export default Header;

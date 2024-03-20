import { MobileNavBar } from '@lobehub/ui';
import { memo } from 'react';
import {useTranslation} from "react-i18next";
import {Flexbox} from "react-layout-kit";

const Header = memo(() => {
  const { t } = useTranslation("common")
  return <MobileNavBar center={
    <Flexbox align={'center'}>
      <div>{t('tab.market3')}</div>
      <div style={{fontSize: '10px'}}>{t('tab.market4', {ns: 'common'})}</div>
    </Flexbox>
  }/>;
});

export default Header;

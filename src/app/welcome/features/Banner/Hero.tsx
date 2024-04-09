// import dynamic from 'next/dynamic';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';

import {genSize, useStyles} from './style';
import {Typography} from "antd";
import {useRouter} from "next/navigation";

const {Link} = Typography;

const Hero = memo<{ mobile?: boolean; width: number }>(({width, mobile}) => {
  const size: any = {
    base: genSize(width / 3.5, 240),
    desc: genSize(width / 50, 18),
    desc2: genSize(width / 65, 13),
    logo: genSize(width / 2.5, 180),
    title: genSize(width / 20, 32),
  };

  size.marginTop = mobile ? -size.logo / 9 : -size.logo / 3;
  size.marginBottom = mobile ? -size.logo / 9 : -size.logo / 4;

  const {styles} = useStyles(size.base);

  const {t} = useTranslation('welcome');
  const router = useRouter();

  return (
    <>
      <div className={styles.title} style={{fontSize: size.title}} onClick={() => {
        router.push('/settings/intro')
      }}>
        <strong style={mobile ? {fontSize: '1.2em'} : {}}>ChatBank</strong>
        {mobile ? <br /> : ' - '}
        智能合作
      </div>
    </>
  );
});

export default Hero;

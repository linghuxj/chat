// import dynamic from 'next/dynamic';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';

// import { Flexbox } from 'react-layout-kit';

import {genSize, useStyles} from './style';
import {Typography} from "antd";

const {Link} = Typography;

// const LogoThree = dynamic(() => import('@lobehub/ui/es/LogoThree'));
// const LogoSpline = dynamic(() => import('@lobehub/ui/es/LogoThree/LogoSpline'));

const Hero = memo<{ mobile?: boolean; width: number }>(({width, mobile}) => {
  const size: any = {
    base: genSize(width / 3.5, 240),
    desc: genSize(width / 50, 14),
    desc2: genSize(width / 65, 12),
    logo: genSize(width / 2.5, 180),
    title: genSize(width / 20, 32),
  };

  size.marginTop = mobile ? -size.logo / 9 : -size.logo / 3;
  size.marginBottom = mobile ? -size.logo / 9 : -size.logo / 4;

  const {styles} = useStyles(size.base);

  const {t} = useTranslation('welcome');

  return (
    <>
      {/*<Flexbox*/}
      {/*  style={{*/}
      {/*    height: size.logo,*/}
      {/*    marginBottom: size.marginBottom,*/}
      {/*    marginTop: size.marginTop,*/}
      {/*    position: 'relative',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {mobile ? <LogoThree size={size.logo} /> : <LogoSpline height={'100%'} width={'100%'} />}*/}
      {/*</Flexbox>*/}
      <div className={styles.desc} style={{fontSize: size.desc}}>
        {t('slogan.desc')}
      </div>
      <div className={styles.desc} style={{fontSize: size.desc}}>
        {t('slogan.desc1')}
      </div>
      <div className={styles.title} style={{fontSize: size.title}}>
        <strong style={mobile ? {fontSize: '1.4em'} : {}}>ChatBank</strong>
        {/*{mobile ? <br /> : ' '}*/}
        {/*{t('slogan.title')}*/}
      </div>
      <Link className={styles.desc2} style={{fontSize: size.desc2}} target={'_blank'}>
        @{t('slogan.desc2')}
      </Link>
    </>
  );
});

export default Hero;

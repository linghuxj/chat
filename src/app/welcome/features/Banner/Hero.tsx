// import dynamic from 'next/dynamic';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';

// import { Flexbox } from 'react-layout-kit';

import {genSize, useStyles} from './style';
import {Typography} from "antd";
import {Flexbox} from "react-layout-kit";
import {useRouter} from "next/navigation";

const {Link} = Typography;

// const LogoThree = dynamic(() => import('@lobehub/ui/es/LogoThree'));
// const LogoSpline = dynamic(() => import('@lobehub/ui/es/LogoThree/LogoSpline'));

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
        XY银行<Link className={styles.desc2} style={{fontSize: size.desc}} onClick={() => router.push('/settings/intro')}
                    target={'_blank'}>智能运营官</Link>
      </div>
      {/*<div className={styles.desc} style={{fontSize: size.desc}}>*/}
      {/*  {t('slogan.desc1')}*/}
      {/*</div>*/}
      <div className={styles.title} style={{fontSize: size.title}}>
        <strong style={mobile ? {fontSize: '1.4em'} : {}}>ChatBank</strong>
        {/*{mobile ? <br /> : ' '}*/}
        {/*{t('slogan.title')}*/}
      </div>
      <Flexbox className={styles.desc} style={{fontSize: size.desc2, padding: '16px'}} align={'start'}>
        <div>最新汇报:</div>
        <div>入职手机银行App到岗第三天开始，每天因我打开XY银行App的客户数30+人，其中15人为XY银行新客户；</div>
        <div>10天后为为参与ZH项目，存入保证金，增加存款；</div>
        <div>20天后，为开展HZ项目，多人贷款获得批准。</div>
        <Link className={styles.desc2} target={'_blank'} onClick={() => router.push('/market?agent=ID-0002')}>查看详情</Link>
      </Flexbox>
    </>
  );
});

export default Hero;

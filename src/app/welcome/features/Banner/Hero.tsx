// import dynamic from 'next/dynamic';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';

// import { Flexbox } from 'react-layout-kit';

import {genSize, useStyles} from './style';
import {Typography} from "antd";
import {Flexbox} from "react-layout-kit";
import {useRouter} from "next/navigation";
import {DoubleRightOutlined} from "@ant-design/icons";

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
      <div className={styles.desc} style={{fontSize: size.desc}}>
        银行<Link className={styles.desc2} style={{fontSize: size.desc}} onClick={() => router.push('/settings/intro')}
                  target={'_blank'}>智能运营官</Link>
      </div>
      <div className={styles.title} style={{fontSize: size.title}}>
        <strong style={mobile ? {fontSize: '1.4em'} : {}}>ChatBank</strong>
      </div>
      <Flexbox className={styles.desc} style={{fontSize: size.desc2, padding: '16px'}} align={'start'}>
        <div><span style={{fontWeight: 600}}>新网银行</span>的业务范围不受属地限制，特别推荐可在全国扩张的养牛产业平台的贷款商机
        </div>
        <div>贵行或可：</div>
        <div>1. 参与一次真实的业务机会。预计该业务的贷款规模可达数十亿/年/省</div>
        <div>2. 获得一种解决中小银行贷款难的有效方法。将更多可能的业务机会转化为低风险的优质贷款业务，扩大贷款规模同时降低风险
        </div>
        <Flexbox flex={1} align={'end'} justify={'end'} horizontal>
          <Link className={styles.desc2} target={'_blank'}
                onClick={() => router.push('/market?agent=ID-0008')}>查看详情 <DoubleRightOutlined /></Link>
        </Flexbox>
      </Flexbox>
    </>
  );
});

export default Hero;

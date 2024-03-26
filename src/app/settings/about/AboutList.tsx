import {memo} from 'react';
import {useStyles} from './style';
import {Flexbox} from "react-layout-kit";

const AboutList = memo(() => {
  const {styles} = useStyles();

  return (
    <Flexbox style={{fontSize: '16px', padding: '20px'}}>
      <span>长亮科技是全球领先的金融IT解决方案供应商，为金融机构提供核心业务、互联网金融业务、数据业务和管理业务等整体化金融IT解决方案。</span>
      <Flexbox style={{marginTop: '18px'}} />
      <span>公司总部位于深圳，子公司13家，员工超5000人足迹遍布北上广深、杭州、香港、马来西亚、印尼、泰国等地区。</span>
      <Flexbox style={{marginTop: '18px'}} />
      <span>凭借超强自主创新能力、灵活的定制能力和完善的交付及售后服务能力，为全球逾800家客户提供具有互联网思维的整体化智能金融IT解决方案！助力传统银行搭载互联网金融架构实现转型升级，满足客户的多并发需求，抓住转型新机遇；助力金融机构逐浪互联网大潮，抢占经济制高点。</span>
    </Flexbox>
  );
});

export default AboutList;

import {memo} from 'react';
import {Flexbox} from "react-layout-kit";

const Intro = memo(() => {

  return (
    <Flexbox style={{fontSize: '16px', padding: '20px'}}>
      <span style={{fontSize: '20px'}}>ChatBank是什么?</span>
      <Flexbox style={{marginTop: '18px'}} />
      <span>ChatBank是构建更多合作、实现多方共赢的智能工具，基于通用大语言模型+自研的经济（合作）行为学习模型。</span>
      <Flexbox style={{marginTop: '18px'}} />
      <span>1. 为每个用户提供智能代理人，帮助个人补足资源和智慧，达成商业目标，实现综合（隐形）财富增长；</span>
      <span>2. 帮助企业推动业务模式和技术创新，找到利润区并实现持续增长；</span>
      <span>3. 帮助银行创造更多交易机会，提升资产质量和盈利能力；</span>
      <span>4. 帮助投资机构从海量商机中实现优选，对已投项目提供更多有效资源和专业服务；</span>
      <Flexbox style={{marginTop: '32px'}} />
      <span>客户 -- 隐性财富获得更多增长</span>
      <span>银行 -- 资产质量持续改善，挖掘和兑现客户隐性财富，让客户为银行创造更多价值</span>
      <span>投资 -- 从更多商机中筛选更好的项目，为在投项目寻找增值资源和机会</span>
    </Flexbox>
  );
});

export default Intro;

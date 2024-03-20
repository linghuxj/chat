import {memo} from 'react';
import {Flexbox} from "react-layout-kit";

const Intro = memo(() => {

  return (
    <Flexbox style={{fontSize: '14px', padding: '20px'}}>
      <span>ChatBank是基于通用大语言模型+自研经济行为学习模型的经济行为引导工具。</span>
      <Flexbox style={{marginTop: '18px'}}/>
      <span>为银行构建客户合作生态；</span>
      <Flexbox style={{marginTop: '18px'}}/>
      <span>并为每个银行客户提供智能代理人，帮助客户找到合适的资源，提出并及时修正方案，引导正确的行动，达成个体目标和多方合作共赢：</span>
      <Flexbox style={{marginTop: '18px'}}/>
      <span>1. 帮助银行实现低成本、高效率的“活客-获客-留客”，让客户引导银行业务量增长，提升利润率；</span>
      <span>2. 帮助企业推动业务模式和技术创新，实现利润提升；</span>
      <span>3. 帮助个人实现综合财富增长，满足个性化需求；</span>
      <span>4. 帮助投资机构从海量商机中实现优选，对已投项目提供更多有效资源和专业服务；</span>
    </Flexbox>
  );
});

export default Intro;

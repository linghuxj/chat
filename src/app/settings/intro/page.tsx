import {memo} from 'react';
import {Flexbox} from "react-layout-kit";

const Intro = memo(() => {

  return (
    <Flexbox style={{fontSize: '16px', padding: '20px'}}>
      <span style={{fontSize: '20px'}}>ChatBank是什么?</span>
      <Flexbox style={{marginTop: '18px'}} />
      <span>ChatBank是基于通用大语言模型，自主研发的经济（合作）行为学习模型。</span>
      <Flexbox style={{marginTop: '18px'}} />
      <span>ChatBank会为每个用户创建一个专属的智能助手AI-Banking Agent，这个运营官负责运营客户和数字人民币，激活用户财富潜力，构建一种生态型的多方合作模式，共同决定如何用好钱、做好事：</span>
      <Flexbox style={{marginTop: '18px'}} />
      <span>1. 激活个体的能动性，补足智慧及资源（找到人做对事）更好达成个体的商业目标；</span>
      <span>2. 多方的综合收益最大，实现共赢；重复博弈和合作博弈；</span>
      <span>3. 生态化合作：合作各方互相影响—促进—调节。各个环节控制风险、系统适应外界变化；</span>
      <span>4. 帮助投资机构从海量商机中实现优选，对已投项目提供更多有效资源和专业服务；</span>
    </Flexbox>
  );
});

export default Intro;

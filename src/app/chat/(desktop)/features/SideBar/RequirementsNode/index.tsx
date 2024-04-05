import {ActionIcon, primaryColors} from '@lobehub/ui';
import {Button, Steps, Tag} from 'antd';
import {memo} from "react";
import {Flexbox} from "react-layout-kit";

const RequirementsNode = memo(() => {
  return <Flexbox style={{padding: '16px'}}>
    <Steps
      direction="vertical"
      items={[
        {
          title: <Flexbox horizontal align={'center'} justify={'center'} gap={8}>
            <div>选址与物业获取</div>
            <Tag color={'blue'}>需求</Tag>
          </Flexbox>,
          description: <Flexbox>
            <div>1. 选址考察：考虑地段（交通便利性、周边配套设施、景点距离等）、建筑条件（面积、楼层、结构适应性、消防要求等）、租赁/购买成本等因素，选择合适的物业。</div>
            <div>2. 合同谈判与签署：与业主就租金、租期、装修期、续约条款等细节进行协商，签订租赁或购买合同。</div>
            <Button>查看建议方案（10+）</Button>
          </Flexbox>,
          status: 'process',
        },
        {
          title: <Flexbox horizontal align={'center'} justify={'center'} gap={8}>
            <div>设计与装修</div>
            <Tag color={'blue'}>需求</Tag>
          </Flexbox>,
          description: <Flexbox>
            <div>1. 概念设计：根据酒店定位聘请专业设计团队进行平面布局、室内装饰、品牌形象等设计。</div>
            <div>2. 施工图绘制与工程招标：完成详细施工图纸，进行工程预算，发布招标公告，选择资质合格、经验丰富的施工单位</div>
            <div>3. 装修施工与监工：确保施工按设计方案和工期进行，严格把控工程质量与安全。</div>
            <Button disabled={true}>暂无建议方案</Button>
          </Flexbox>,
          status: 'process',
        },
        {
          title: '需求3',
          description: '已确认',
          status: 'finish',
        },
        {
          title: <Flexbox horizontal align={'center'} justify={'center'} gap={8}>
            <div>可提供服务或业务</div>
            <Tag color={'green'}>供给</Tag>
          </Flexbox>,
          status: 'process',
        },
      ]}
    />
  </Flexbox>
});

export default RequirementsNode;

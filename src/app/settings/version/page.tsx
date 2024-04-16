'use client';

import {memo} from 'react';
import {Timeline} from "antd";
import {Flexbox} from "react-layout-kit";
import SafeSpacing from "@/components/SafeSpacing";
import {useResponsive} from "antd-style";
import {ClockCircleOutlined} from "@ant-design/icons";

const Fan = memo(() => {
  const {mobile} = useResponsive();

  const items = [
    {
      children: <Flexbox>
        <Flexbox align={'end'} justify={'space-between'} horizontal>
          <div style={{fontSize: '1.4em', fontWeight: 600}}>v0.0.1</div>
          <div>03/17</div>
        </Flexbox>
        <div>原型基础版本，构建了整个应用基础体系。</div>
        <div>1、搭建AI对话基础功能，并对接部分商业大模型；</div>
        <div>2、发现页面加入案例和想法功能，包含案例详情和原理；</div>
        <div>3、设置页面关于功能。</div>
      </Flexbox>
    },
    {
      children: <Flexbox>
        <Flexbox align={'end'} justify={'space-between'} horizontal>
          <div style={{fontSize: '1.4em', fontWeight: 600}}>v0.0.2</div>
          <div>03/20</div>
        </Flexbox>
        <div>修复页面部分bug，调整页面内容。</div>
      </Flexbox>
    },
    {
      children: <Flexbox>
        <Flexbox align={'end'} justify={'space-between'} horizontal>
          <div style={{fontSize: '1.4em', fontWeight: 600}}>v0.0.3</div>
          <div>04/04</div>
        </Flexbox>
        <div>1、AI对话加入RAG知识库检索功能，并自定义Prompt；</div>
        <div>2、设置加入产品介绍。</div>
      </Flexbox>
    },
    {
      children: <Flexbox>
        <Flexbox align={'end'} justify={'space-between'} horizontal>
          <div style={{fontSize: '1.4em', fontWeight: 600}}>v0.0.5</div>
          <div>04/13</div>
        </Flexbox>
        <div>1、AI加入意图引导并进行商机总结；</div>
        <div>2、提供展示各类商机内容，并允许用户留言，即将用户的意向合作内容发表至对应商机内容下；</div>
        <div>3、将用户意向合作内容提取并更进一步形成推荐合作内容，方便发起人观看并确定。</div>
      </Flexbox>
    },
    {
      children: <Flexbox>
        <Flexbox align={'end'} justify={'space-between'} horizontal>
          <div style={{fontSize: '1.4em', fontWeight: 600}}>v0.0.6</div>
          <div>04/16</div>
        </Flexbox>
        <div>1、设置加入版本内容介绍；</div>
        <div>2、提供各类数据相关统计。</div>
      </Flexbox>
    },
    {
      dot: <ClockCircleOutlined style={{fontSize: '1.4em'}} />,
      color: 'red',
      children: <Flexbox>
        <Flexbox align={'end'} justify={'space-between'} horizontal>
          <div style={{fontSize: '1.4em'}}>即将发布</div>
        </Flexbox>
        <div>1、AI拆解商机，将整体拆成更详细的商机内容，同时指明其对应类型、目的、建议操作和其他相关内容等；</div>
        <div>2、其他用户在参与商机内容中，发表意向合作内容将优化为提供AI对话以引导和提炼用户表述内容；</div>
        <div>3、自动完成意向合作内容提取并推荐给对应的商机发起人以及相关人员；</div>
        <div>4、加入个人Agent，将记忆用户所有对话以及其他行为，为未来的行为和决策做好基础准备；</div>
        <div>5、加入AI-CEO团队管理模式下的经济业务流程处理的Multi-Agents。</div>
      </Flexbox>
    }]

  return (
    <Flexbox style={{padding: '0 1.2em'}}>
      <SafeSpacing mobile={mobile} />
      <Timeline mode={'left'} items={items} reverse={true} />
    </Flexbox>
  );
});

export default Fan;

import {memo} from "react";
import {Center, Flexbox} from "react-layout-kit";
import TagList from "../TagList";
import CommentList from "@/app/requirements/features/CommentList";
import {Button, Input} from "antd";
import {FireOutlined, HeartOutlined, LikeOutlined, SendOutlined} from "@ant-design/icons";

const PageDetails = memo(() => {
  return (
    <Flexbox gap={16} style={{padding: '16px'}}>
      <Center style={{fontSize: '24px', fontWeight: '600'}}>设计与装修</Center>
      <div>1. 聘请专业设计团队：选择有酒店设计经验、理解酒店定位的设计公司，负责整体空间规划、室内设计、品牌形象设计等工作。
      </div>
      <div>2.
        施工招标与监督：公开招标选取资质齐全、经验丰富、口碑良好的装修公司进行施工。业主需全程参与，确保设计方案准确落地，工程质量达标，工期按计划进行。
      </div>
      <TagList />
      <Flexbox gap={24} horizontal style={{marginTop: '32px'}}>
        <Button type="primary" icon={<FireOutlined />}>
          需要 20
        </Button>
        <Button type="text" icon={<SendOutlined />}>
          分享
        </Button>
        <Button type="text" icon={<HeartOutlined />}>
          收藏
        </Button>
        <Button type="text" icon={<LikeOutlined />}>
          点赞
        </Button>
      </Flexbox>
      <div style={{marginTop: '32px', fontSize: '24px', fontWeight: '400'}}>留言区</div>
      <Flexbox gap={24}>
        <Input placeholder="写下你的留言" />
        <CommentList />
      </Flexbox>
    </Flexbox>
  )
})

export default PageDetails;

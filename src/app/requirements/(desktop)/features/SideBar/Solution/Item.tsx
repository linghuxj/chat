import {memo} from "react";
import {Flexbox} from "react-layout-kit";
import {Badge, Card, Tag} from "antd";
import TagList from "@/app/requirements/features/TagList";
import {Avatar} from "@lobehub/ui";

export interface SolutionProps {
  id: number,
  content: string,
  amount?: number,
  companyName?: string,
  createTime: string,
  user: {
    id: number,
    username: string,
    avatar?: string,
  }
  tag: string
}

const Item = memo<SolutionProps>(({solution}) => {
  return <Flexbox gap={4}>
    <Badge.Ribbon text={solution.tag} color={'red'}>
      <Card hoverable
            cover={<img alt='example' src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
            style={{width: '100%'}}>
        <Flexbox gap={8}>
          {solution.content}
          <span style={{fontSize: '20px', fontWeight: '400'}}>预估价：¥ {solution.amount}</span>
          <Flexbox justify={'space-between'} horizontal>
            {solution.createTime}
            <Flexbox gap={6} horizontal>
              <Avatar size={24} src={solution.user.avatar} />
              {solution.user.username}
            </Flexbox>
          </Flexbox>
          <Flexbox align={'end'}>
            {solution.companyName && <Tag>{solution.companyName}</Tag>}
          </Flexbox>
        </Flexbox>
      </Card>
    </Badge.Ribbon>
  </Flexbox>
})

export default Item;

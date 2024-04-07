import {memo} from "react";
import {Flexbox} from "react-layout-kit";
import {Badge, Card, Tag} from "antd";
import {Avatar} from "@lobehub/ui";
import {Plan} from "@/types/custom";

const Item = memo<Plan>((solution) => {
  return <Flexbox gap={4}>
    <Badge.Ribbon text={solution.tag} color={'red'}>
      <Card hoverable
            cover={<img alt='example' src={solution.mainImage} />}
            style={{width: '100%'}}>
        <Flexbox gap={8}>
          {solution.content}
          <span style={{fontSize: '20px', fontWeight: '400'}}>预估价：¥ {solution.amount}</span>
          <Flexbox justify={'space-between'} horizontal>
            {solution.createTime.substring(0, 10)}
            <Flexbox gap={6} horizontal>
              <Avatar size={24} src={solution.user.avatar} />
              {solution.user.userName}
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

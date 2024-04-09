import {memo} from "react";
import {Flexbox} from "react-layout-kit";
import {Badge, Card, Tag} from "antd";
import {Plan} from "@/types/custom";
import {Typography} from "antd";
import TagList from "@/app/requirements/features/TagList";

const {Link} = Typography;

const Item = memo<Plan>((solution) => {
  return <Flexbox gap={4}>
    <Badge.Ribbon text={solution.tag} color={'red'}>
      <Card hoverable
            cover={<img alt='example' src={solution.mainImage} />}
            style={{width: '100%'}}>
        <Flexbox gap={8}>
          {solution.content}
          <Flexbox gap={16} align={'center'} horizontal>
            {solution.prePrice && <span style={{fontSize: '16px', fontWeight: '500'}}>价值：¥ {solution.prePrice}</span>}
            <Tag color={'orange'}>{solution.status}</Tag>
          </Flexbox>
          <Flexbox justify={'space-between'} horizontal>
            {solution.createTime.substring(0, 10)}
            {solution.companyName ? <Link>@{solution.companyName}</Link> : <Link>@个人</Link>}
          </Flexbox>
          <TagList tags={solution.tags} wrap={false}/>
        </Flexbox>
      </Card>
    </Badge.Ribbon>
  </Flexbox>
})

export default Item;

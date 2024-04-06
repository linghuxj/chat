import {memo} from "react";
import {Flexbox} from "react-layout-kit";
import Item from './Item';

const Solution = memo(() => {
  const solutions = [{
    id: 1,
    content: '4星级酒店设计方案，复古风格，详情可见图片。',
    amount: 9999.99,
    companyName: '深圳市***有限公司',
    createTime: '2024-01-01',
    user: {
      id: 1,
      username: '用户1',
    },
    tag: 'AI推荐'
  }, {
    id: 1,
    content: '5星级酒店设计方案，我只是一段话，我只是一段话，我只是一段话，我只是一段话，我只是一段话，我只是一段话，我只是一段话，我只是一段话，我只是一段话。',
    amount: 999999.99,
    companyName: '广州市***有限公司',
    createTime: '2024-01-01',
    user: {
      id: 1,
      username: '用户1',
    },
    tag: '人气最高'
  }]
  return (
    <Flexbox flex={1} gap={16} style={{padding: '16px'}}>
      <span style={{fontSize: '22px', fontWeight: '600'}}>AI总结推荐方案</span>
      {solutions.map(item => (<Item solution={item} />))}
    </Flexbox>
  )
})

export default Solution;

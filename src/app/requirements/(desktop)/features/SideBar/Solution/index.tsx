import {memo} from "react";
import {Flexbox} from "react-layout-kit";
import Item from './Item';
import {useCustomStore} from "@/store/custom";

const Solution = memo(() => {
  const solutions = useCustomStore((s) => s.plans);
  return (
    <Flexbox flex={1} gap={16} style={{padding: '16px'}}>
      <span style={{fontSize: '22px', fontWeight: '600'}}>AI总结推荐方案</span>
      {solutions.map(item => (
        <Item tag={item.tag} content={item.content} createTime={item.createTime} user={item.user} amount={item.amount}
              companyName={item.companyName} mainImage={item.mainImage} id={item.id} />))}
    </Flexbox>
  )
})

export default Solution;

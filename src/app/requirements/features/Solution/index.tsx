import {memo} from "react";
import {Center, Flexbox} from "react-layout-kit";
import Item from './Item';
import {useCustomStore} from "@/store/custom";
import {useResponsive} from "antd-style";
import {Empty} from "antd";

const Solution = memo(() => {
  const solutions = useCustomStore((s) => s.plans);
  const {mobile} = useResponsive();

  return (
    <Flexbox flex={1} gap={16} style={{padding: '16px'}}>
      {!mobile && <span style={{fontSize: '18px', fontWeight: '500'}}>推荐合作</span>}
      {solutions && solutions.length > 0 ? solutions.map(item => (
          <Item id={item.id} tag={item.tag} content={item.content} createTime={item.createTime} user={item.user}
                prePrice={item.prePrice} status={item.status} companyName={item.companyName} tags={item.tags}
                mainImage={item.mainImage} />)) :
        <Center>
          <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                 imageStyle={{height: 60}}
                 description={<span>暂无可推荐合作</span>}
          />
        </Center>}
    </Flexbox>
  )
})

export default Solution;

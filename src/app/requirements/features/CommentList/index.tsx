import {memo} from "react";
import Item from "@/app/requirements/features/CommentList/Item";
import {useCustomStore} from "@/store/custom";
import {Flexbox} from "react-layout-kit";
import {Empty} from "antd";

const CommentList = memo(() => {
  const comments = useCustomStore((s) => s.comments);

  return comments && comments.length > 0 ? comments.map(item =>
      <Item id={item.id} content={item.content} createTime={item.createTime} ipAddress={item.ipAddress}
            user={item.user} liked={item.liked} />) :
    <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
           imageStyle={{height: 60}}
           description={<span>目前暂无留言，赶紧来发表你的合作意向吧</span>}
    />
})

export default CommentList;

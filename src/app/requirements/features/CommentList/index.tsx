import {memo} from "react";
import Item from "@/app/requirements/features/CommentList/Item";
import {useCustomStore} from "@/store/custom";
import {Empty} from "antd";
import {Comment} from "@/types/custom";
import CommentGroup from "@/app/requirements/features/CommentList/group";

const defaultTag = '留言';

const CommentList = memo(() => {
  const comments = useCustomStore((s) => s.comments);

  const groupedItems: { [key: string]: Comment[] } = comments.reduce((groups: { [key: string]: Comment[] }, item) => {
    const group = !!item.tags ? item.tags : defaultTag;
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(item);
    return groups;
  }, {});
  // Move 'defaultTag' to the end if it exists
  if (groupedItems[defaultTag]) {
    const groupC = groupedItems[defaultTag];
    delete groupedItems[defaultTag];
    groupedItems[defaultTag] = groupC;
  }

  return comments && comments.length > 0 ? <CommentGroup groups={groupedItems}/> :
    <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
           imageStyle={{height: 60}}
           description={<span>目前暂无留言，赶紧来发表你的合作意向吧</span>}
    />
})

export default CommentList;

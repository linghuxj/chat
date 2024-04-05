import {memo} from "react";
import Item from "@/app/requirements/features/CommentList/Item";
import {Flexbox} from "react-layout-kit";

const CommentList = memo(() => {
  const comments = [{
    id: 1,
    content: '这是一段留言文字，可能会比较长',
    user: {id: 1, username: '用户名'},
    createTime: '2024-01-01',
    ipAddress: 'IP归属地 深圳'
  }, {
    id: 1,
    content: '这是一段留言文字，可能会比较长',
    user: {id: 1, username: '用户名'},
    createTime: '2024-01-01',
    ipAddress: 'IP归属地 深圳'
  }, {
    id: 1,
    content: '这是一段留言文字，可能会比较长',
    user: {id: 1, username: '用户名'},
    createTime: '2024-01-01',
    ipAddress: 'IP归属地 深圳'
  }]
  return comments.map(item =>
    <Item id={item.id} content={item.content} createTime={item.createTime} ipAddress={item.ipAddress}
          user={item.user} />)

})

export default CommentList;

import {memo} from "react";
import {Flexbox} from "react-layout-kit";
import {Avatar} from "@lobehub/ui";

export interface CommentProps {
  id: number,
  content: string,
  user?: {
    id: number,
    username: string,
    avatar?: string,
  },
  createTime: string,
  ipAddress: string,
}

const Item = memo<CommentProps>((comment) => {
  return <Flexbox flex={1} gap={8} horizontal>
    <Avatar size={32} src={comment.user?.avatar} />
    <Flexbox gap={4} style={{width: '100%', maxWidth: '1024px'}}>
      <span>{comment.user?.username}</span>
      <div>{comment.content}</div>
      <Flexbox justify={'space-between'} horizontal>
        <Flexbox gap={64} horizontal>
          <div>{comment.createTime}</div>
          <div>{comment.ipAddress}</div>
        </Flexbox>
        <Flexbox gap={64} horizontal>
          {/*<div>回复</div>*/}
          <div>点赞</div>
        </Flexbox>
      </Flexbox>
    </Flexbox>
  </Flexbox>
});

export default Item;

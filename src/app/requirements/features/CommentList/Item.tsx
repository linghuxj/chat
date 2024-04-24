import {memo} from "react";
import {Flexbox} from "react-layout-kit";
import {Comment} from "@/types/custom";
import {Typography} from "antd";

interface CommentProps {
  comment: Comment;
}

const Item = memo<CommentProps>(({comment}) => {
  return (
    <Flexbox style={{width: '100%', marginTop: 12}}>
      <Typography.Paragraph
        ellipsis={{rows: 2, expandable: true}}
        title={comment.content}
      >
        {comment.content}
      </Typography.Paragraph>
      <Flexbox justify={'end'} gap={16} horizontal style={{marginTop: -12}}>
        {/*<div>{comment.createTime?.substring(0, 10)}</div>*/}
        <span style={{fontWeight: '600'}}>{comment.user.userName}</span>
      </Flexbox>
    </Flexbox>
  )
});

export default Item;

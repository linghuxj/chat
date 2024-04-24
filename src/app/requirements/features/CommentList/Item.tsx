import {memo, useState} from "react";
import {Flexbox} from "react-layout-kit";
import {Avatar} from "@lobehub/ui";
import {Comment} from "@/types/custom";
import {LikeOutlined} from "@ant-design/icons";
import {Button, Typography} from "antd";

const Item = memo<Comment>((comment) => {
  return <Flexbox flex={1} gap={8} horizontal>
    <Avatar size={32} src={comment.user?.avatar} />
    <Flexbox gap={4} style={{width: '100%', maxWidth: '1024px'}}>
      <span style={{fontWeight: '600'}}>{comment.user.userName}</span>
      <Typography.Paragraph
        ellipsis={{
          rows: 2,
          expandable: true,
        }}
        title={comment.content}
      >
        {comment.content}
      </Typography.Paragraph>
      <Flexbox justify={'space-between'} horizontal>
        <Flexbox gap={64} horizontal>
          <div>{comment.createTime?.substring(0, 10)}</div>
          <div>{comment.ipAddress}</div>
        </Flexbox>
        <Flexbox gap={64} horizontal>
          {/*<div>回复</div>*/}
          <Button type="text" icon={<LikeOutlined />} size={'small'}>
            点赞 {comment.liked > 0 && comment.liked}
          </Button>
        </Flexbox>
      </Flexbox>
    </Flexbox>
  </Flexbox>
});

export default Item;

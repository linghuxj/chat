import {memo} from 'react';
import {shallow} from 'zustand/shallow';

import ListItem from '../../ListItem';
import {useCustomStore} from "@/store/custom";
import {Point} from "@/types/custom";
import TagList from "@/app/requirements/features/TagList";

const SessionItem = memo<Point>((point) => {
  const {id, title, content, createTime, tags} = point;

  const [active] = useCustomStore((s) => [s.activeId === id]);

  return (
    <ListItem
      active={active}
      description={content}
      date={Date.parse(createTime)}
      addon={<TagList tags={tags} wrap={false} />}
      title={title}
    />
  );
}, shallow);

export default SessionItem;

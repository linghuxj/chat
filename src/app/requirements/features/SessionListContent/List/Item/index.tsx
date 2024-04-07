import {memo, useState} from 'react';
import {shallow} from 'zustand/shallow';

import ListItem from '../../ListItem';
import {useCustomStore} from "@/store/custom";
import {Point} from "@/types/custom";

const SessionItem = memo<Point>((point) => {
  const [open, setOpen] = useState(false);
  const {id, title, content} = point;

  const [active] = useCustomStore((s) => [s.activeId === id]);

  return (
    <ListItem
      active={active}
      description={content}
      showAction={open}
      title={title}
    />
  );
}, shallow);

export default SessionItem;

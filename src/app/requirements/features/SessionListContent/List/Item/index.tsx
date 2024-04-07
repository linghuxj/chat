import {memo, useState} from 'react';
import {shallow} from 'zustand/shallow';

import ListItem from '../../ListItem';
import {useCustomStore} from "@/store/custom";
import {Point} from "@/types/custom";
import {Timer} from "lucide-react";

const SessionItem = memo<Point>((point) => {
  const [open, setOpen] = useState(false);
  const {id, title, content, createTime} = point;

  const [active] = useCustomStore((s) => [s.activeId === id]);

  return (
    <ListItem
      active={active}
      description={content}
      showAction={open}
      date={Date.parse(createTime)}
      title={title}
    />
  );
}, shallow);

export default SessionItem;

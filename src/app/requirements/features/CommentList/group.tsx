import React, {memo} from "react";
import {Flexbox} from "react-layout-kit";
import {Comment} from "@/types/custom";
import Item from "@/app/requirements/features/CommentList/Item";

interface GroupProps {
  groups: { [key: string]: Comment[] }
}

const CommentGroup = memo<GroupProps>(({groups}) => {

  const names: string[] = []
  for (const groupName in groups) {
    if (Object.prototype.hasOwnProperty.call(groups, groupName)) {
      names.push(groupName);
    }
  }

  const GroupItem = (name: string) => {
    return groups[name].map((comment) => <Item comment={comment} />)
  }

  const Group = (name: string) => (
    <Flexbox style={{marginTop: 12}}>
      <span style={{fontSize: 20, fontWeight: 500}}>{name}</span>
      {GroupItem(name)}
    </Flexbox>
  );

  return (
    <Flexbox style={{marginTop: 12, marginBottom: 12}}>
      {names.map((name) => Group(name))}
    </Flexbox>
  )
})

export default CommentGroup;

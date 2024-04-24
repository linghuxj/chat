import {Button, Tag} from 'antd';
import {startCase} from 'lodash-es';
import {memo} from 'react';
import {TagOutlined} from "@ant-design/icons";

export interface TagProps {
  tagList?: string[]
}

const Inner = memo<TagProps>(({tagList}) => {

  return tagList?.map((item) => (
    <Tag style={{margin: 0}}>
      <TagOutlined />
      {startCase(item)}
    </Tag>
  ));
});

export default Inner;

import {Button, Tag} from 'antd';
import {startCase} from 'lodash-es';
import {memo} from 'react';

export interface TagProps {
  tagList?: string[]
}

const Inner = memo<TagProps>(({tagList}) => {

  return tagList?.map((item) => (
    <Tag style={{margin: 0}}>
      {startCase(item)}
    </Tag>
  ));
});

export default Inner;

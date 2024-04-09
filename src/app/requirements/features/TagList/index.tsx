import {Skeleton} from 'antd';
import {Suspense, memo} from 'react';
import {Flexbox} from 'react-layout-kit';

import Inner from './Inner';

export interface TagProps {
  tags: string,
  wrap?: boolean,
}

const TagList = memo<TagProps>(({tags, wrap = true}) => {
  return (
    <Flexbox gap={6} horizontal style={{flexWrap: wrap ? 'wrap' : 'nowrap'}}>
      <Suspense
        fallback={Array.from({length: 5})
          .fill('')
          .map((_, index) => (
            <Skeleton.Button key={index} shape={'round'} size={'small'} />
          ))}
      >
        <Inner tagList={!tags ? [] : tags.split(',')} />
      </Suspense>
    </Flexbox>
  );
});

export default TagList;

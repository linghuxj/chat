import {Skeleton} from 'antd';
import {Suspense, memo} from 'react';
import {Flexbox} from 'react-layout-kit';

import Inner from './Inner';

const TagList = memo(() => {
  const tags = ["设计", "装修", "酒店", "施工"]
  return (
    <Flexbox gap={6} horizontal style={{flexWrap: 'wrap'}}>
      <Suspense
        fallback={Array.from({length: 5})
          .fill('')
          .map((_, index) => (
            <Skeleton.Button key={index} shape={'round'} size={'small'} />
          ))}
      >
        <Inner tagList={tags} />
      </Suspense>
    </Flexbox>
  );
});

export default TagList;

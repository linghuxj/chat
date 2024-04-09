import {createStyles, useResponsive} from 'antd-style';
import Link from 'next/link';
import {memo} from 'react';
import LazyLoad from 'react-lazy-load';

import {POINT_URL} from '@/const/url';

import SessionItem from './Item';
import {useRouter} from "next/navigation";
import {useCustomStore} from "@/store/custom";
import {Flexbox} from "react-layout-kit";

const useStyles = createStyles(
  ({css}) => css`
    min-height: 70px;
  `,
);

const SessionList = memo(() => {
  const [activePoint, switchPoint, points] = useCustomStore((s) => [
    s.activePoint,
    s.switchPoint,
    s.points,
  ]);
  const {styles} = useStyles();
  const router = useRouter();

  const {mobile} = useResponsive();

  return <Flexbox gap={8} style={{paddingLeft: '12px', paddingRight: '12px'}}>
    {points.length > 0 && points.map((point) => (
      <LazyLoad className={styles} key={String(point.id)}>
        <Link
          aria-label={String(point.id)}
          href={POINT_URL(point.id, mobile)}
          onClick={(e) => {
            e.preventDefault();
            if (mobile) switchPoint(point.id, router, mobile);
            else activePoint(point.id);
          }}
        >
          <SessionItem id={point.id} title={point.title} content={point.content} createTime={point.createTime}
                       tags={point.tags} />
        </Link>
      </LazyLoad>
    ))}
  </Flexbox>
});

export default SessionList;

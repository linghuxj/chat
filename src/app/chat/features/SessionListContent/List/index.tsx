import {createStyles, useResponsive} from 'antd-style';
import Link from 'next/link';
import {memo} from 'react';
import LazyLoad from 'react-lazy-load';

import {SESSION_CHAT_URL} from '@/const/url';
import {useSessionStore} from '@/store/session';
import {sessionSelectors} from '@/store/session/selectors';
import {LobeAgentSession} from '@/types/session';

// import AddButton from './AddButton';
import SessionItem from './Item';
import SkeletonList from './SkeletonList';
import {useRouter} from "next/navigation";
import {useCustomStore} from "@/store/custom";
import {useChatStore} from "@/store/chat";

const useStyles = createStyles(
  ({css}) => css`
    min-height: 70px;
  `,
);

interface SessionListProps {
  dataSource: LobeAgentSession[];
  groupId?: string;
  showAddButton?: boolean;
}

const SessionList = memo<SessionListProps>(({dataSource, groupId, showAddButton = true}) => {
  const [activeSession, switchSession, isInit,] = useSessionStore((s) => [
    s.activeSession,
    s.switchSession,
    sessionSelectors.isSessionListInit(s),
  ]);
  const getPoints = useCustomStore((s) => s.getPoints)
  const topicId = useChatStore((s) => s.activeTopicId)
  const {styles} = useStyles();
  const router = useRouter();

  const {mobile} = useResponsive();

  return !isInit ? (
    <SkeletonList />
  ) : dataSource.length > 0 ? (
    dataSource.map(({id}) => (
      <LazyLoad className={styles} key={id}>
        <Link
          aria-label={id}
          href={SESSION_CHAT_URL(id, mobile)}
          onClick={(e) => {
            e.preventDefault();
            if (mobile) switchSession(id, router);
            else activeSession(id);
            getPoints(id, topicId);
          }}
        >
          <SessionItem id={id} />
        </Link>
      </LazyLoad>
    ))
  ) : '';
});

export default SessionList;

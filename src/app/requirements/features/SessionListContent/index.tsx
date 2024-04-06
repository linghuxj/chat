import isEqual from 'fast-deep-equal';
import {memo} from 'react';
import {useSessionStore} from '@/store/session';
import {sessionSelectors} from '@/store/session/selectors';

import SessionList from './List';

const SessionListContent = memo(() => {
  const [useFetchSessions] = useSessionStore((s) => [s.useFetchSessions]);
  useFetchSessions();

  const defaultSessions = useSessionStore(sessionSelectors.defaultSessions, isEqual);

  return (
    <>
      <SessionList dataSource={defaultSessions} />
    </>
  );
});

export default SessionListContent;

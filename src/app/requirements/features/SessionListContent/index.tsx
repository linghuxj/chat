import {memo} from 'react';

import SessionList from './List';

const SessionListContent = memo(() => {

  return (
    <>
      <SessionList />
    </>
  );
});

export default SessionListContent;

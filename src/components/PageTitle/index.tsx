import { memo, useEffect } from 'react';

const PageTitle = memo<{ title: string }>(({ title }) => {
  useEffect(() => {
    document.title = title ? `${title} · ChatBank` : 'ChatBank';
  }, [title]);

  return null;
});

export default PageTitle;

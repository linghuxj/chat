import { memo } from 'react';
import { useStyles } from './style';

const AboutList = memo(() => {
  const { styles } = useStyles();

  return (
    <div className={styles.wrapper}>
      长亮科技。。。
    </div>
  );
});

export default AboutList;

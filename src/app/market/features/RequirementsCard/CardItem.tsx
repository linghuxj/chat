import {Typography} from 'antd';
import {useThemeMode} from 'antd-style';
import {memo, useRef} from 'react';
import {Flexbox} from 'react-layout-kit';

import RequirementsCardBanner from './CardBanner';
import {useStyles} from '../AgentCard/style';
import {useRouter} from "next/navigation";
import {Point} from "@/types/custom";

const {Paragraph} = Typography;

const RequirementsCardItem = memo<Point>((point) => {
  const ref = useRef(null);
  const {styles, theme} = useStyles();
  const {isDarkMode} = useThemeMode();
  const router = useRouter();

  const {id, title, content} = point;

  return (
    <Flexbox className={styles.container} onClick={() => router.push(`/requirements?id=${id}`)}>
      <RequirementsCardBanner style={{opacity: isDarkMode ? 0.9 : 0.4}} />
      <Flexbox className={styles.inner} gap={8} ref={ref}>
        <Paragraph className={styles.title} ellipsis={{rows: 1, tooltip: title}}>
          {title}
        </Paragraph>
        <Paragraph className={styles.desc} ellipsis={{rows: 2, tooltip: content}}>
          {content}
        </Paragraph>
      </Flexbox>
    </Flexbox>
  );
});

export default RequirementsCardItem;
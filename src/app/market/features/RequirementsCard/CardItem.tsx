import {Typography} from 'antd';
import {useResponsive, useThemeMode} from 'antd-style';
import {memo, useRef} from 'react';
import {Flexbox} from 'react-layout-kit';

import RequirementsCardBanner from './CardBanner';
import {useStyles} from '../AgentCard/style';
import {useRouter} from "next/navigation";
import {Point} from "@/types/custom";
import {useCustomStore} from "@/store/custom";
import {POINT_URL} from "@/const/url";

const {Paragraph} = Typography;

const RequirementsCardItem = memo<Point>((point) => {
  const activePoint = useCustomStore((s) => s.activePoint);
  const ref = useRef(null);
  const {styles, theme} = useStyles();
  const {isDarkMode} = useThemeMode();
  const router = useRouter();

  const {id, title, content} = point;

  const {mobile} = useResponsive();

  const toRequirements = (pointId: number) => {
    activePoint(pointId)
    router.push(POINT_URL(pointId, mobile));
  }

  return (
    <Flexbox className={styles.container} onClick={() => toRequirements(id)}>
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

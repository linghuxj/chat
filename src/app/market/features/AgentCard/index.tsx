import {SpotlightCardProps} from '@lobehub/ui';
import isEqual from 'fast-deep-equal';
import {FC, memo, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {Flexbox} from 'react-layout-kit';
import LazyLoad from 'react-lazy-load';

import {agentMarketSelectors, useMarketStore} from '@/store/market';

import TagList from '../TagList';
import AgentCardItem from './AgentCardItem';
import RequirementsCardItem from '../RequirementsCard/CardItem';
import Loading from './Loading';
import {useStyles} from './style';
import {useToggle} from "ahooks";
import {useGlobalStore} from "@/store/global";
import {useCustomStore} from "@/store/custom";
import {DoubleRightOutlined} from "@ant-design/icons";
import {useRouter} from "next/navigation";

export interface AgentCardProps {
  CardRender: FC<SpotlightCardProps>;
  mobile?: boolean;
}

const AgentCard = memo<AgentCardProps>(({CardRender, mobile}) => {
  const {t} = useTranslation('market');
  const [useFetchAgentList, keywords] = useMarketStore((s) => [
    s.useFetchAgentList,
    s.searchKeywords,
  ]);
  const [points, activeNode] = useCustomStore((s) => [s.points, s.activePoint])
  const {isLoading} = useFetchAgentList();
  const agentList = useMarketStore(agentMarketSelectors.getAgentList, isEqual);
  const toggleChange = useGlobalStore((s) => s.toggleAgentChange);
  const {styles} = useStyles();
  const router = useRouter();

  const GridRender: SpotlightCardProps['renderItem'] = useCallback(
    (props: any) => (
      <LazyLoad className={styles.lazy}>
        <AgentCardItem {...props} />
      </LazyLoad>
    ),
    [styles.lazy],
  );

  const GridReqRender: SpotlightCardProps['renderItem'] = useCallback(
    (props: any) => (
      <LazyLoad className={styles.lazy}>
        <RequirementsCardItem {...props} />
      </LazyLoad>
    ),
    [styles.lazy],
  );

  const handleMore = () => {
    activeNode(points[0].id);
    router.push('/requirements');
  }

  if (isLoading) return <Loading />;

  return (
    <Flexbox gap={mobile ? 16 : 24}>
      {/*<TagList />*/}
      {keywords ? (
        <CardRender
          items={agentList}
          renderItem={GridRender}
          spotlight={mobile ? undefined : false}
        />
      ) : (
        <>
          <Flexbox justify={'space-between'} align={'center'} horizontal>
            <div className={styles.subTitle}>{t('title.allAgents')}</div>
            <a onClick={handleMore}>查看更多 <DoubleRightOutlined /></a>
          </Flexbox>
          {points && points.length > 0 && <CardRender
            items={points}
            renderItem={GridReqRender}
            spotlight={mobile ? undefined : false}
          />}
          <div className={styles.subTitle}>{t('title.recentSubmits')}</div>
          <CardRender items={agentList.slice(0, 5)} renderItem={GridRender} />
        </>
      )}
    </Flexbox>
  );
});

export default AgentCard;

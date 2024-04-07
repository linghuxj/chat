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
  const [points] = useCustomStore((s) => [s.points])
  const {isLoading} = useFetchAgentList();
  const agentList = useMarketStore(agentMarketSelectors.getAgentList, isEqual);
  const toggleChange = useGlobalStore((s) => s.toggleAgentChange);
  const {styles} = useStyles();

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
          <div className={styles.subTitle}>{t('title.recentSubmits')}</div>
          <CardRender items={agentList.slice(0, 5)} renderItem={GridRender} />
          <div className={styles.subTitle}>{t('title.allAgents')}</div>
          {points && points.length > 0 && <CardRender
            items={points}
            renderItem={GridReqRender}
            spotlight={mobile ? undefined : false}
          />}
        </>
      )}
    </Flexbox>
  );
});

export default AgentCard;

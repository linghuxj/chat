import {Markdown, TabsNav} from '@lobehub/ui';
import {memo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Flexbox} from 'react-layout-kit';

import {useMarketStore} from '@/store/market';

import AgentCardBanner from '../../../features/AgentCard/AgentCardBanner';
import Comment from './Comment';
import Header from './Header';
import Loading from './Loading';
// import TokenTag from './TokenTag';
import {useStyles} from './style';
import SessionList from "@/app/requirements/features/SessionListContent/List";
import Earnings from "@/app/market/features/AgentDetailContent/AgentInfo/Earnings";

enum InfoTabs {
  comment = 'comment',
  earnings = 'earnings',
  prompt = 'prompt',
}

const AgentModalInner = memo(() => {
  const [useFetchAgent, currentIdentifier] = useMarketStore((s) => [
    s.useFetchAgent,
    s.currentIdentifier,
  ]);
  const {t} = useTranslation('market');
  const [tab, setTab] = useState<string>(InfoTabs.prompt);
  const {data, isLoading} = useFetchAgent(currentIdentifier);
  const {styles} = useStyles();

  if (isLoading || !data?.meta) return <Loading />;

  const {meta, identifier, detail, content, comments} = data;
  // const { systemRole } = config;

  return (
    <>
      <AgentCardBanner meta={meta} size={400} style={{height: 80, marginBottom: -60}} />
      <Header />
      <Flexbox align={'center'}>
        <TabsNav
          activeKey={tab}
          className={styles.nav}
          items={[
            {
              key: InfoTabs.prompt,
              label: (
                <Flexbox align={'center'} gap={8} horizontal>
                  {t('sidebar.prompt')}
                  {/*<TokenTag systemRole={systemRole} />*/}
                </Flexbox>
              ),
            },
            {
              key: InfoTabs.comment,
              label: t('sidebar.comment'),
            },
            {
              key: InfoTabs.earnings,
              label: t('sidebar.earnings'),
            },
          ]}
          onChange={setTab}
          variant={'compact'}
        />
      </Flexbox>
      <Flexbox style={{padding: 16}}>
        {tab === InfoTabs.prompt && (
          <Markdown fullFeaturedCodeBlock variant={'chat'}>
            {detail}
          </Markdown>
        )}
        {tab === InfoTabs.comment && <SessionList agentId={identifier} />}
        {tab === InfoTabs.earnings && <Earnings agentId={identifier} />}
      </Flexbox>
    </>
  );
});

export default AgentModalInner;

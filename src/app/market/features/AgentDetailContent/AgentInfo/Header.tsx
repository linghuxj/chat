import {Avatar, Tag} from '@lobehub/ui';
import {App, Button, Typography} from 'antd';
import {startCase} from 'lodash-es';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {Center, Flexbox} from 'react-layout-kit';

import {agentMarketSelectors, useMarketStore} from '@/store/market';
import {useSessionStore} from '@/store/session';

import {useStyles} from './style';
import {useRouter} from "next/navigation";

const {Link} = Typography;

const Header = memo(() => {
  const {t} = useTranslation('market');
  const {styles} = useStyles();
  const createSession = useSessionStore((s) => s.createSession);
  const agentItem = useMarketStore(agentMarketSelectors.currentAgentItem);
  const router = useRouter();

  const {meta, createAt, author, homepage, config} = agentItem;
  const {title, description, tags} = meta;

  return (
    <Center className={styles.container} gap={8}>
      <div className={styles.title}>{title}</div>
      <Center gap={6} horizontal style={{flexWrap: 'wrap'}}>
        {(tags as string[]).map((tag: string, index) => (
          <Tag
            key={index}
            onClick={() => useMarketStore.setState({searchKeywords: tag})}
            style={{margin: 0}}
          >
            {startCase(tag).trim()}
          </Tag>
        ))}
      </Center>
      <div className={styles.desc}>{description}</div>
      <Flexbox justify={'space-evenly'} align={'center'} horizontal>
        <Link aria-label={author} className={styles.author} href={homepage} target={'_blank'}>
          @{author}
        </Link>
        <div className={styles.date}>{createAt}</div>
      </Flexbox>
      <Button
        block
        onClick={() => {
          if (!agentItem) return;

          createSession({config, meta}, router);
        }}
        type={'primary'}
      >
        {t('addAgentAndConverse')}
      </Button>
    </Center>
  );
});

export default Header;

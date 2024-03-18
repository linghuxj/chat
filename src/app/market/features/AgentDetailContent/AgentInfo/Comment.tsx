import {List, Select, Tag} from 'antd';
import {memo} from 'react';
import {ActionIcon, Avatar, DivProps} from "@lobehub/ui";
import {Flexbox} from "react-layout-kit";
import {useTranslation} from "react-i18next";
import {agentMarketSelectors, useMarketStore} from "@/store/market";
import {LobeAgentComment} from "@/types/market";

interface AgentCommentProps extends DivProps {
  comments: LobeAgentComment[];
  size?: number;
}

const colors = ['green', 'orange', 'red']

const Comment = memo<AgentCommentProps>(({comments, size = 200}) => {
  const {t} = useTranslation('market');
  const [selectType, setCommentType] = useMarketStore((s) => [
    agentMarketSelectors.selectCommentType(s),
    s.setCommentType,
  ]);

  const handleChange = (value: string) => {
    setCommentType(value)
  };

  return (
    <Flexbox style={{padding: 16}}>
      <Flexbox align={'end'}>
        <Select
          defaultValue={selectType}
          style={{width: 120}}
          onChange={handleChange}
          options={[
            {value: '0', label: t('type.supply')},
            {value: '1', label: t('type.demand')},
            {value: '2', label: t('type.all')},
          ]}
        />
      </Flexbox>
      <List
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(item, index) => (
          ((item.type == selectType || selectType == '2' || item.type == '2') && <List.Item>
            <Flexbox horizontal gap={8}>
              <Avatar alt={'avatar'} src={item.avatar} size={size} />
              <Flexbox style={{paddingLeft: 8}}>
                {item.content}
                <Flexbox horizontal style={{marginTop: 6}} gap={24}>
                  <Tag color={colors[Number(item.type)]}>
                    {item.type == '0' ? t('type.supply') : item.type == '1' ? t('type.demand') : t('type.all')}
                  </Tag>
                  {item.time}
                  <a>t('type.call')</a>
                </Flexbox>
              </Flexbox>
            </Flexbox>
          </List.Item>)
        )}
      />
    </Flexbox>
  )
});

export default Comment;

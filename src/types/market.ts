import {MetaData} from '@/types/meta';
import {LobeAgentSettings} from '@/types/session';

export interface AgentsMarketIndexItem {
  author: string;
  createAt: string;
  homepage: string;
  identifier: string;
  manifest: string;
  meta: MetaData;
  schemaVersion: 1;
}

export type AgentsMarketItem = AgentsMarketIndexItem & LobeAgentSettings & LobeAgentContent;

export interface LobeChatAgentsMarketIndex {
  agents: AgentsMarketIndexItem[];
  schemaVersion: 1;
  tags: string[];
}

export interface LobeAgentContent {
  detail: string;
  content: string;
  comments: LobeAgentComment[];
}

export interface LobeAgentComment {
  id: string;
  avatar?: string;
  content: string;
  time: string;
  type: string;
}

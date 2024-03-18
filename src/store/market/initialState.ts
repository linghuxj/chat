import { AgentsMarketIndexItem, AgentsMarketItem } from '@/types/market';

export type MarketAgentMap = Record<string, AgentsMarketItem>;

export interface StoreState {
  agentList: AgentsMarketIndexItem[];
  agentMap: MarketAgentMap;
  commentType: string;
  currentIdentifier: string;
  searchKeywords: string;
  tagList: string[];
}

export const initialState: StoreState = {
  agentList: [],
  agentMap: {},
  commentType: '1',
  currentIdentifier: '',
  searchKeywords: '',
  tagList: [],
};

import { Agent, ApiResponse } from './types';

const API_BASE = 'https://valorant-api.com/v1';

export async function getAgents(): Promise<Agent[]> {
  const res = await fetch(`${API_BASE}/agents?language=zh-CN`);
  const json: ApiResponse<Agent[]> = await res.json();
  
  if (json.status !== 200) {
    throw new Error('Failed to fetch agents');
  }
  
  // 过滤掉未发布的特工
  return json.data.filter(agent => agent.isPlayable !== false);
}

export async function getAgent(uuid: string): Promise<Agent | null> {
  const res = await fetch(`${API_BASE}/agents/${uuid}?language=zh-CN`);
  const json: ApiResponse<Agent> = await res.json();
  
  if (json.status !== 200) {
    return null;
  }
  
  return json.data;
}

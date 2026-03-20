'use client';

import { useEffect, useState } from 'react';
import { Agent } from '@/lib/types';
import AgentCard from '@/components/AgentCard';
import { Search, Filter } from 'lucide-react';

const roleMap: Record<string, string> = {
  'Duelist': '决斗者',
  'Initiator': '先锋',
  'Controller': '控场者',
  'Sentinel': '哨卫',
};

export default function Home() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('全部');

  useEffect(() => {
    fetch('https://valorant-api.com/v1/agents?language=zh-CN')
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          setAgents(data.data.filter((a: Agent) => a.isPlayable !== false));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.displayName.includes(searchTerm);
    const matchesRole = selectedRole === '全部' || roleMap[agent.role.displayName] === selectedRole;
    return matchesSearch && matchesRole;
  });

  const roles = ['全部', '决斗者', '先锋', '控场者', '哨卫'];

  if (loading) {
    return (
      <div className="min-h-screen bg-valorant-dark flex items-center justify-center">
        <div className="text-valorant-red text-2xl">加载中...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-valorant-dark">
      {/* Header */}
      <header className="bg-valorant-red py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4">
            🎮 Miks Valorant Agent
          </h1>
          <p className="text-white/80 mb-4">Valorant 特工信息查询站</p>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="搜索特工..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
          
          {/* Filter */}
          <div className="flex flex-wrap gap-2">
            {roles.map(role => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedRole === role
                    ? 'bg-white text-valorant-red'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Agent Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredAgents.map(agent => (
            <AgentCard key={agent.uuid} agent={agent} />
          ))}
        </div>
        
        {filteredAgents.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            未找到匹配的特工
          </div>
        )}
      </div>
    </main>
  );
}

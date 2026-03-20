'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Agent, Ability } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const roleColors: Record<string, string> = {
  'Duelist': 'bg-red-500',
  'Initiator': 'bg-blue-500',
  'Controller': 'bg-green-500',
  'Sentinel': 'bg-yellow-500',
};

const roleMap: Record<string, string> = {
  'Duelist': '决斗者',
  'Initiator': '先锋',
  'Controller': '控场者',
  'Sentinel': '哨卫',
};

export default function AgentDetail() {
  const params = useParams();
  const router = useRouter();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.uuid) {
      fetch(`https://valorant-api.com/v1/agents/${params.uuid}?language=zh-CN`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 200) {
            setAgent(data.data);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [params.uuid]);

  if (loading) {
    return (
      <div className="min-h-screen bg-valorant-dark flex items-center justify-center">
        <div className="text-valorant-red text-2xl">加载中...</div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-valorant-dark flex items-center justify-center">
        <div className="text-white text-2xl">特工未找到</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-valorant-dark">
      {/* Back Button */}
      <div className="p-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white hover:text-valorant-red transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          返回
        </button>
      </div>

      {/* Agent Header */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-valorant-dark/50 rounded-lg overflow-hidden border border-valorant-red/30"
        >
          {/* Hero Section */}
          <div className="relative h-64 md:h-96">
            <img
              src={agent.fullPortrait || agent.displayIcon}
              alt={agent.displayName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-valorant-dark to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {agent.displayName}
              </h1>
              <div className={`inline-block px-3 py-1 rounded text-sm text-white ${
                roleColors[agent.role.displayName] || 'bg-gray-500'
              }`}>
                {roleMap[agent.role.displayName] || agent.role.displayName}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-6">
            <p className="text-gray-300 text-lg mb-6">
              {agent.description}
            </p>

            {/* Abilities */}
            <h2 className="text-2xl font-bold text-white mb-4">技能</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agent.abilities.map((ability, index) => (
                <AbilityCard key={index} ability={ability} index={index} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

function AbilityCard({ ability, index }: { ability: Ability; index: number }) {
  const slotColors: Record<string, string> = {
    'C': 'bg-blue-500',
    'Q': 'bg-green-500',
    'E': 'bg-yellow-500',
    'X': 'bg-red-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-valorant-dark/50 rounded-lg p-4 border border-valorant-red/20"
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl ${
          slotColors[ability.slot] || 'bg-gray-500'
        }`}>
          {ability.slot}
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-lg mb-1">
            {ability.displayName}
          </h3>
          <p className="text-gray-400 text-sm">
            {ability.description}
          </p>
        </div>
      </div>
      {ability.displayIcon && (
        <img
          src={ability.displayIcon}
          alt={ability.displayName}
          className="mt-3 w-full h-24 object-cover rounded-lg"
        />
      )}
    </motion.div>
  );
}

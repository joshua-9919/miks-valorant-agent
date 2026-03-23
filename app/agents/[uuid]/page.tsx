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
  'Duelist': 'Duelist',
  'Initiator': 'Initiator',
  'Controller': 'Controller',
  'Sentinel': 'Sentinel',
};

export default function AgentDetail() {
  const params = useParams();
  const router = useRouter();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.uuid) {
      fetch(`https://valorant-api.com/v1/agents/${params.uuid}`)
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
        <div className="text-valorant-red text-2xl">Loading...</div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-valorant-dark flex items-center justify-center">
        <div className="text-white text-2xl">Agent not found</div>
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
          Back
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
          <div className="relative bg-gradient-to-b from-valorant-red/20 to-valorant-dark">
            <div className="flex flex-col md:flex-row items-center p-6 gap-6">
              {/* Agent Portrait */}
              <div className="w-full md:w-1/2 flex justify-center">
                <img
                  src={agent.fullPortrait || agent.displayIcon}
                  alt={agent.displayName}
                  className="w-full max-w-md h-auto object-contain"
                />
              </div>
              
              {/* Agent Info */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {agent.displayName}
                </h1>
                <div className={`inline-block px-3 py-1 rounded text-sm text-white mb-4 ${
                  roleColors[agent.role.displayName] || 'bg-gray-500'
                }`}>
                  {roleMap[agent.role.displayName] || agent.role.displayName}
                </div>
                <p className="text-gray-300 text-sm md:text-base">
                  {agent.description}
                </p>
              </div>
            </div>
          </div>

          {/* Abilities */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Abilities</h2>
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
  // Map API slot names to key hints and colors
  const slotKeyMap: Record<string, string> = {
    'Ability1': 'C',
    'Ability2': 'Q',
    'Grenade': 'E',
    'Ultimate': 'X',
  };

  const slotColors: Record<string, string> = {
    'Ability1': 'from-blue-500 to-blue-700',
    'Ability2': 'from-green-500 to-green-700',
    'Grenade': 'from-yellow-500 to-yellow-700',
    'Ultimate': 'from-red-500 to-red-700',
  };

  const slotBorderColors: Record<string, string> = {
    'Ability1': 'border-blue-500/50',
    'Ability2': 'border-green-500/50',
    'Grenade': 'border-yellow-500/50',
    'Ultimate': 'border-red-500/50',
  };

  const keyHint = slotKeyMap[ability.slot] || ability.slot.charAt(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-valorant-dark/80 rounded-xl p-5 border ${slotBorderColors[ability.slot] || 'border-gray-500/30'} hover:border-valorant-red transition-all duration-300`}
    >
      <div className="flex items-center gap-3 mb-3">
        {/* Skill Icon */}
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${slotColors[ability.slot] || 'from-gray-500 to-gray-700'} flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0`}>
          {keyHint}
        </div>
        
        {/* Skill Name */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-base truncate">
            {ability.displayName}
          </h3>
        </div>
      </div>
      
      {/* Skill Description */}
      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        {ability.description}
      </p>
      
      {/* Skill Image */}
      {ability.displayIcon && (
        <div className="relative group overflow-hidden rounded-xl bg-valorant-dark/50 border border-white/10 group-hover:border-valorant-red/50 transition-all duration-300">
          {/* 技能图片 */}
          <div className="p-3">
            <img
              src={ability.displayIcon}
              alt={ability.displayName}
              className="w-full h-28 object-contain"
            />
          </div>
          
          {/* 悬停光效 */}
          <div className="absolute inset-0 bg-valorant-red opacity-0 group-hover:opacity-5 transition-opacity rounded-xl" />
        </div>
      )}
    </motion.div>
  );
}

'use client';

import { Agent } from '@/lib/types';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface AgentCardProps {
  agent: Agent;
}

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

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <Link href={`/agents/${agent.uuid}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-valorant-dark/50 rounded-lg overflow-hidden border border-valorant-red/30 hover:border-valorant-red transition-colors cursor-pointer"
      >
        {/* Agent Image */}
        <div className="aspect-square relative overflow-hidden">
          <img
            src={agent.displayIcon || agent.fullPortrait}
            alt={agent.displayName}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Agent Info */}
        <div className="p-3">
          <h3 className="text-white font-bold text-lg mb-1">
            {agent.displayName}
          </h3>
          <div className={`inline-block px-2 py-1 rounded text-xs text-white ${
            roleColors[agent.role.displayName] || 'bg-gray-500'
          }`}>
            {roleMap[agent.role.displayName] || agent.role.displayName}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

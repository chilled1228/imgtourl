'use client';

import { Card } from '@/components/ui/card';
import { Upload, Image, Zap, Globe } from 'lucide-react';

const stats = [
  {
    icon: Upload,
    label: 'Free Storage',
    value: '10GB',
    description: 'Generous free tier',
  },
  {
    icon: Globe,
    label: 'Global CDN',
    value: '100%',
    description: 'Worldwide distribution',
  },
  {
    icon: Zap,
    label: 'Optimization',
    value: 'Auto',
    description: 'Automatic compression',
  },
  {
    icon: Image,
    label: 'Formats',
    value: '5+',
    description: 'Multiple image types',
  },
];

export default function Stats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
          <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <stat.icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {stat.value}
          </div>
          <div className="font-medium text-sm">{stat.label}</div>
          <div className="text-xs text-muted-foreground mt-1">{stat.description}</div>
        </Card>
      ))}
    </div>
  );
}
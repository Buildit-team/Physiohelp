// src/components/StatCard.tsx

import React, { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface StatCardProps {
    title: string;
    mainStat: {
        label: string;
        value: string | number;
        change?: string;
    };
    secondaryStat?: {
        label: string;
        value: string | number;
        change?: string;
    };
    icon: ReactNode;
    timeFrame?: string;
}

const StatCard: React.FC<StatCardProps> = ({
    mainStat,
    secondaryStat,
    icon,
    timeFrame = 'This Week'
}) => {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <div className="bg-blue-100 p-2 rounded-lg">
                        {icon}
                    </div>
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                    <span>{timeFrame}</span>
                    <ChevronDown size={16} className="ml-1" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <div className="text-gray-500 text-sm">{mainStat.label}</div>
                    <div className="flex items-end mt-1">
                        <div className="text-2xl font-semibold">{mainStat.value}</div>
                        {mainStat.change && (
                            <div className={`text-xs ml-1 ${mainStat.change.startsWith('+')
                                ? 'text-green-500'
                                : mainStat.change.startsWith('-')
                                    ? 'text-red-500'
                                    : 'text-gray-400'
                                }`}>
                                {mainStat.change}
                            </div>
                        )}
                    </div>
                </div>

                {secondaryStat && (
                    <div>
                        <div className="text-gray-500 text-sm">{secondaryStat.label}</div>
                        <div className="flex items-end mt-1">
                            <div className="text-2xl font-semibold">{secondaryStat.value}</div>
                            {secondaryStat.change && (
                                <div className={`text-xs ml-1 ${secondaryStat.change.startsWith('+')
                                    ? 'text-green-500'
                                    : secondaryStat.change.startsWith('-')
                                        ? 'text-red-500'
                                        : 'text-gray-400'
                                    }`}>
                                    {secondaryStat.change}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatCard;
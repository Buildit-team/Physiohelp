import React from 'react';
import { SalesDataPoint } from '../../../interface/dashboard';

interface SalesBarChartProps {
    data: SalesDataPoint[];
    maxHeight?: number;
}

const SalesBarChart: React.FC<SalesBarChartProps> = ({ data }) => {
    const maxValue = Math.max(...data.map(item => item.value));

    return (
        <div className="flex items-end justify-between h-full w-full px-4">
            {data.map((item, index) => {
                const heightPercentage = (item.value / maxValue) * 100;

                return (
                    <div key={index} className="flex flex-col items-center justify-end w-full">
                        <div
                            className="w-8 bg-blue-600 rounded-t-sm"
                            style={{ height: `${heightPercentage}%` }}
                        ></div>
                        <div className="text-xs text-gray-500 mt-2">{item.day}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default SalesBarChart;

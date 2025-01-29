import { useState, useEffect } from 'react';
import { fetchGlobalPrice, DEFAULT_COST_PER_MINUTE, DEFAULT_HUMAN_COST_PER_HOUR } from '@/utils/pricing';

export const usePricing = () => {
  const [costPerMinute, setCostPerMinute] = useState(DEFAULT_COST_PER_MINUTE);
  const [humanCostPerHour, setHumanCostPerHour] = useState(DEFAULT_HUMAN_COST_PER_HOUR);
  const [loading, setLoading] = useState(false);

  const fetchLatestPrice = async () => {
    setLoading(true);
    const { price, humanCost } = await fetchGlobalPrice();
    setCostPerMinute(price);
    setHumanCostPerHour(humanCost);
    setLoading(false);
  };

  useEffect(() => {
    fetchLatestPrice();
  }, []);

  return {
    costPerMinute,
    setCostPerMinute,
    humanCostPerHour,
    setHumanCostPerHour,
    loading,
    setLoading,
    fetchLatestPrice
  };
};
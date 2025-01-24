import { useState, useEffect } from 'react';
import { fetchGlobalPrice, DEFAULT_COST_PER_MINUTE } from '@/utils/pricing';

export const usePricing = () => {
  const [costPerMinute, setCostPerMinute] = useState(DEFAULT_COST_PER_MINUTE);
  const [loading, setLoading] = useState(false);

  const fetchLatestPrice = async () => {
    setLoading(true);
    const price = await fetchGlobalPrice();
    setCostPerMinute(price);
    setLoading(false);
  };

  useEffect(() => {
    fetchLatestPrice();
  }, []);

  return {
    costPerMinute,
    setCostPerMinute,
    loading,
    setLoading,
    fetchLatestPrice
  };
};
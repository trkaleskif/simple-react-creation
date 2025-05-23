import { useState, useEffect } from 'react';
import api from '../api/axios';

interface ApiOptions {
  endpoint: string;
  initialData?: any;
  dependencies?: any[];
  enabled?: boolean;
}

export function useApi<T>({ endpoint, initialData = null, dependencies = [], enabled = true }: ApiOptions) {
  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!enabled) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // When ready to fetch real data, uncomment this and remove the mock data
        // const response = await api.get(endpoint);
        // setData(response.data);
        
        // For now, simulate an API call with the mock data
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // This would be replaced with actual API response
        console.log(`Simulated fetching data from API endpoint: ${endpoint}`);
        
        // Keep using the mock data for now
        setData(initialData);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
        console.error('API fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [...dependencies, endpoint, enabled]);

  return { data, isLoading, error, setData };
}

export default useApi;

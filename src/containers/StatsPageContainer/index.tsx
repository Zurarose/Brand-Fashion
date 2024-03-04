import React from 'react';
import { useStats } from '../../hooks/stats';
import { StatsPage } from '../../components/StatsPage';

export const StatsPageContainer: React.FC = () => {
  const { loading, error, onSearch, stats } = useStats();
  return (
    <>
      {error}
      <StatsPage loading={loading} onSearch={onSearch} stats={stats} />
    </>
  );
};

import React from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';
import { AppLayout } from './ui-kit/layout';
import { routes } from './constants/routes';
import { useAutoLogin } from './hooks/user';
import { ClientInfoPageContainer } from './containers/ClientInfoPageContainer';
import { StatsPageContainer } from './containers/StatsPageContainer';
import { ClientsPageContainer } from './containers/ClientsPageContainer';

export const Routes = () => {
  const { error } = useAutoLogin();

  return (
    <>
      {error}
      <Switch>
        <Route element={<AppLayout />}>
          <Route index path={routes.clients} element={<ClientsPageContainer />} />
          <Route path={routes.client()} element={<ClientInfoPageContainer />} />
          <Route path={routes.stats} element={<StatsPageContainer />} />
          <Route path="*" element={<Navigate to={routes.clients} replace />} />
        </Route>
      </Switch>
    </>
  );
};

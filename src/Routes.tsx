import React from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';
import { ClientsPageContainer } from './containers/ClientsPageContainer.tsx/index.tsx';
import { AppLayout } from './ui-kit/layout';
import { routes } from './constants/routes';
import { useAutoLogin } from './hooks/user';
import { ClientInfoPageContainer } from './containers/ClientInfoPageContainer/index.tsx';

export const Routes = () => {
  const { error } = useAutoLogin();

  return (
    <>
      {error}
      <Switch>
        <Route element={<AppLayout />}>
          <Route index path={routes.clients} element={<ClientsPageContainer />} />
          <Route path={routes.client()} element={<ClientInfoPageContainer />} />
          <Route path={routes.stats} element={<div>test</div>} />
          <Route path="*" element={<Navigate to={routes.clients} replace />} />
        </Route>
      </Switch>
    </>
  );
};

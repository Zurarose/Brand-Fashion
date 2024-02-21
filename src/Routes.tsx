import React from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';
import { ClientsPageContainer } from './containers/ClientPageContainer.tsx';
import { AppLayout } from './ui-kit/layout';
import { routes } from './constants/routes';
import { useAutoLogin } from './hooks/user';

export const Routes = () => {
  const { error } = useAutoLogin();

  return (
    <>
      {error}
      <Switch>
        <Route element={<AppLayout />}>
          <Route index path={routes.clients} element={<ClientsPageContainer />} />
          <Route index path={routes.stats} element={<div>test</div>} />
          <Route path="*" element={<Navigate to={routes.clients} replace />} />
        </Route>
      </Switch>
    </>
  );
};

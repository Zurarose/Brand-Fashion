import { Route, Routes as Switch } from 'react-router-dom';
import { routes } from './constants/routes';
import { AppLayout } from './ui-kit/layout';

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<AppLayout />}>
        <Route index key={routes.login} element={<>hello world</>} />
      </Route>
    </Switch>
  );
};

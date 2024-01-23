import { Route, Routes as Switch } from 'react-router-dom';
import { routes } from './constants/routes';

const Layout = () => {
  return (
    <>
      <div>hello world</div>
    </>
  );
};

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<Layout />}>
        <Route index key={routes.login} element={<>hello world</>} />
      </Route>
    </Switch>
  );
};

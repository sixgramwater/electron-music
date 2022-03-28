import { Switch, Route, useLocation } from 'react-router-dom';
import './App.css';
import React, { useEffect, lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
// import renderNestedRoutes from './routes';
// import config from './routes/routerConfig'
// import {} from 'react-router-dom'
import './App.scss';
import 'antd/dist/antd.css';
import { useAppDispatch } from './hooks/hooks';
const LazyLogin = lazy(() => import('./pages/login'));
const LazyMain = lazy(() => import('./pages/main'));
const LazyKlyric = lazy(() => import('./pages/klyric'));

export default function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    window.electron.ipcRenderer.on('login-success', (event: any, arg: any) => {
      const user = arg;
      console.log('user login', user);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({
        type: 'app/setUser',
        payload: user
      });

    });
  }, []);

  React.useEffect(() => {
    const userString = localStorage.getItem('user');
    if(userString) {
      const user = JSON.parse(userString);
      dispatch({
        type: 'app/setUser',
        payload: user
      });
    }
  }, [])
  // console.log(location.)
  return (
    <Suspense fallback={<div>loading</div>}>
    <QueryClientProvider client={queryClient}>
      <Switch location={location}>
        {/* <Route path="/playing" component={PlayingPage}></Route> */}

        <Route path="/login" component={LazyLogin}></Route>
        <Route path="/klyric" component={LazyKlyric}/>
        <Route path="/" component={LazyMain}></Route>
      </Switch>
    </QueryClientProvider>
    </Suspense>
  );
}

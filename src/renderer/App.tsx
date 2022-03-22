import { Switch, Route, useLocation } from 'react-router-dom';
// import { } from 'react-transiton-group';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Header from './components/header';
import PlayList from './components/playlist';
import './App.css';
// import Content from './components/content';
import FooterPlayer from './components/Footer/footerPlayer';
import Sider from './components/sider';
import PlayingPage from './pages/playing';
import Library from 'renderer/pages/library';
import Like from 'renderer/pages/like';
import Recommend from './pages/recommend';
import AlbumDetailPage from './pages/albumDetail';
import DownloadPage from './pages/download';
import RecentPage from './pages/recent';
import SearchPage from './pages/search';
import ArtistAlbumDetailPage from './pages/artistAlbumDetail';
import ArtistDetailPage from './pages/artistDetail';
import Login from './pages/login';
import React, { useEffect, lazy, Suspense } from 'react';
import AudioPlayer from './components/AudioPlayer';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
// import renderNestedRoutes from './routes';
// import config from './routes/routerConfig'
// import {} from 'react-router-dom'
import './App.scss';
import 'antd/dist/antd.css';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import Toast from './components/Toast';

const LazyLogin = lazy(() => import('./pages/login'));
const LazyMain = lazy(() => import('./pages/main'));
// const lazyHome = lazy(() => import('./'))

// import './styles/theme.less';
// import { useHistory } from 'react-router';

export const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state=>state.app.user);
  const isLogined = user ? true : false;
  useEffect(() => {
    window.electron.ipcRenderer.on('new-download-item', (event: any, arg: any) => {
      console.log(arg);
      dispatch({
        type: 'app/addNewDownloadItem',
        payload: arg
      })
    });
    window.electron.ipcRenderer.on('download-item-updated', (event: any, arg: any) => {
      console.log(arg);
      dispatch({
        type: 'app/updateDownloadItem',
        payload: arg
      })
    });
    window.electron.ipcRenderer.on('download-item-done', (event: any, arg: any) => {
      console.log('done',arg);
      dispatch({
        type: 'app/updateDownloadItem',
        payload: arg
      })
    });

  }, []);

  const location = useLocation();
  // React.useEffect(()=>{
  //   console.log(location);
  // }, [location])
  return (
    <>
      <div className="layout">
        <Sider />
        <div className="main-container">
          <Header />
          <div className="content">
            <TransitionGroup>
              <CSSTransition
                key={location.pathname}
                classNames="fade"
                timeout={250}
              >
                <Switch location={location}>
                  <Route path="/" exact component={Recommend} />
                  <Route path="/lib" component={Library} />
                  <Route path="/like" component={Like} />
                  <Route path="/albumDetail/:id" component={AlbumDetailPage} />
                  <Route path="/albumDetail" component={AlbumDetailPage} />
                  <Route path="/download" component={DownloadPage} />
                  <Route path="/recent" component={RecentPage} />
                  <Route path="/artist/:id" component={ArtistDetailPage} />
                  <Route path="/search/:query" component={SearchPage} />
                  <Route path="/artistAlbumDetail/:id" component={ArtistAlbumDetailPage} />
                  {/* <Redirect path='/rec'></Redirect> */}
                </Switch>
              </CSSTransition>
            </TransitionGroup>
            {/* <Outlet/> */}
          </div>
          {/* <Content /> */}
          <PlayList />
          <FooterPlayer />
          {/* <Player /> */}
        </div>
      </div>
      <PlayingPage />
      <AudioPlayer />
      <Toast />
    </>
  );
};


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

    // console.log(location);
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
        <Route path="/" component={LazyMain}></Route>
      </Switch>
    </QueryClientProvider>
    </Suspense>
  );
}

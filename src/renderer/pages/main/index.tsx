import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'renderer/hooks/hooks';
import { useLocation, Switch, Route, Redirect } from 'react-router';
import Header from 'renderer/components/header';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PlayList from '../../components/playlist';
// import Content from './components/content';
import FooterPlayer from '../../components/Footer/footerPlayer';
import Sider from '../../components/sider';
import PlayingPage from '../../pages/playing';
import Library from 'renderer/pages/library';
import Like from 'renderer/pages/like';
import Recommend from '../../pages/recommend';
import AlbumDetailPage from '../../pages/albumDetail';
import DownloadPage from '../../pages/download';
import RecentPage from '../../pages/recent';
import SearchPage from '../../pages/search';
import ArtistAlbumDetailPage from '../../pages/artistAlbumDetail';
import ArtistDetailPage from '../../pages/artistDetail';
import AudioPlayer from 'renderer/components/AudioPlayer';
import Toast from 'renderer/components/Toast';
import NotLoginPage from '../notLogin';

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state=>state.app.user);
  const isLogined = user ? true : false;
  useEffect(()=>{
    console.log(isLogined)
  }, [isLogined])
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
                  <Route path="/notLogin" component={NotLoginPage} />
                  {
                    !isLogined ? <Redirect to="/notLogin" />
                    :
                    (
                      <>
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

                      </>
                    )
                  }
                  {/* <Route path="/lib" component={Library} />
                  <Route path="/like" component={Like} />
                  <Route path="/albumDetail/:id" component={AlbumDetailPage} />
                  <Route path="/albumDetail" component={AlbumDetailPage} />
                  <Route path="/download" component={DownloadPage} />
                  <Route path="/recent" component={RecentPage} />
                  <Route path="/artist/:id" component={ArtistDetailPage} />
                  <Route path="/search/:query" component={SearchPage} />
                  <Route path="/artistAlbumDetail/:id" component={ArtistAlbumDetailPage} /> */}
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

export default Main;

import { Switch, Route, useLocation } from 'react-router-dom';
// import { } from 'react-transiton-group';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Header from './components/header';
import PlayList from './components/playlist';
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
import Login from './pages/login';
import React, { useEffect } from 'react';
import AudioPlayer from './components/AudioPlayer';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
// import renderNestedRoutes from './routes';
// import config from './routes/routerConfig'
// import {} from 'react-router-dom'
import './App.scss';
import 'antd/dist/antd.css';
import { useAppDispatch } from './hooks/hooks';

// import './styles/theme.less';
// import { useHistory } from 'react-router';

export const Main: React.FC = () => {
  const dispatch = useAppDispatch();
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
    })
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
                  <Route path="/search/:query" component={SearchPage} />
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
    </>
  );
};

// const Rec = () => {
//   return(
//     <div>
//       recommend
//     </div>
//   )
// }

// const getSceneConfig = (location: any) => {
//   const matchedRoute = config.find(config => new RegExp(`^${config.path}$`).test(location.pathname));
//   return (matchedRoute && matchedRoute.transitionConfig) || {enter: "from-bottom", exit: "to-bottom"};
// };

// let oldLocation: any = null;

// const Layout = () => {
//   const location = useLocation();
//   // const history = useHistory();
//   // React.useEffect(() => {
//   //   console.log(classes());
//   // }, [location.pathname]);

//   const classes = () => {
//     let classnames = '';
//     // if(history.action === 'PUSH') {
//     //   classnames = 'forward-' + getSceneConfig(location).enter
//     // } else if (history.action === 'POP' && oldLocation) {
//     //   classnames = 'backward-' + getSceneConfig(location).exit
//     // }
//     if(!location.key) {
//       classnames = 'forward-' + getSceneConfig(location).enter
//       location.key="used";
//     } else if(location.key && oldLocation) {
//       location.key = '';
//       classnames = 'backward-' + getSceneConfig(oldLocation).exit
//     }
//     console.log(classnames);
//     return classnames;
//     // else return "no";
//   }
//   oldLocation = location;

//   const getKey = () => {
//     return location.pathname === '/playing' ? 'isPlaying' : 'notPlaying'
//   }
//   // useEffect(() => {
//   //   console.log(location.pathname)
//   // }, [location.pathname])
//   // const location = useLocation();
//   // const TransitionPlayingPage = () => {
//   //   return (
//   //     <CSSTransition
//   //           in={location.pathname==='/playing'}
//   //           classNames="slide"
//   //           timeout={250}
//   //         >
//   //       <PlayingPage />
//   //     </CSSTransition>
//   //   )
//   // }
//   return (
//     <TransitionGroup
//       component={null}
//       childFactory={child => React.cloneElement(child, {classNames: classes()})}
//     >
//       <CSSTransition
//         key={getKey()}
//         timeout={250}
//         // classNames="slide"
//       >
//         <Routes>
//           <Route path="/" element={<Main />} >

//             <Route path="/" element={<Recommend />}/>
//             <Route path="/lib" element={<Library />}/>
//             <Route path="/like" element={<Like />}/>
//             <Route path="/albumDetail" element={<AlbumDetailPage />} />
//           </Route>
//           <Route path="/playing" element={<PlayingPage />}/>

//         </Routes>
//       </CSSTransition>
//     </TransitionGroup>

//   )
// }
export default function App() {
  const location = useLocation();
  React.useEffect(() => {
    console.log(location);
  }, []);
  // console.log(location.)
  return (
    <QueryClientProvider client={queryClient}>
      <Switch location={location}>
        {/* <Route path="/playing" component={PlayingPage}></Route> */}

        <Route path="/login" component={Login}></Route>
        <Route path="/" component={Main}></Route>
      </Switch>
    </QueryClientProvider>
  );
}

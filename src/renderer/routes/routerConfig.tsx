import { Main } from '../App';
import Recommend from '../pages/recommend';
import AlbumDetailPage from '../pages/albumDetail';
import PlayingPage from '../pages/playing';
import Library from 'renderer/pages/library';
import Like from 'renderer/pages/like';
import { IRouteItem } from './index'


const config: IRouteItem[] = [
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Recommend />
      },
      {
        path: '/lib',
        element: <Library />,
      },
      {
        path: '/like',
        element: <Like />,
      },
      {
        path: '/albumDetail',
        element: <AlbumDetailPage />
      }
    ]
  },
  {
    path: '/playing',
    element: <PlayingPage />,
    transitionConfig: {
      enter: 'from-bottom',
      exit: 'to-bottom'
    }
  }
]


export default config;
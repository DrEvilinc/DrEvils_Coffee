import { createBrowserRouter } from 'react-router';
import { Root } from './pages/Root';
import { Home } from './pages/Home';
import { Collection } from './pages/Collection';
import { About } from './pages/About';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'collection',
        Component: Collection,
      },
      {
        path: 'about',
        Component: About,
      },
      {
        path: '*',
        element: <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-white">404 - Page Not Found</div>
        </div>,
      },
    ],
  },
]);
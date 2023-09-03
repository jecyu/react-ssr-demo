import Home from '@/pages/Home';
import Demo from './pages/Demo';

interface IRouter {
  path: string;
  element: JSX.Element;
  loadData?: (param: unknown) => unknown;
}

const routes: IRouter[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/demo',
    element: <Demo />,
    loadData: Demo?.getInitProps
  }
];

export default routes;
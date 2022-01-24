import { Route } from 'react-router-dom';
import React from 'react';

export interface ITransitionConfig {
  enter: string;
  exit: string;
}

export interface IRouteItem {
  path: string;
  element: React.ReactElement;
  transitionConfig?: ITransitionConfig;
  children?: IRouteItem[];
}

const renderNestedRoutes = (routes: IRouteItem[]) => {
  return (
    <>
      {routes.map((routeItem) => (
        <Route
          path={routeItem.path}
          element={routeItem.element}
          key={routeItem.path}
        >
          {routeItem.children && renderNestedRoutes(routeItem.children)}
        </Route>
      ))}
    </>
  );
};

export default renderNestedRoutes;

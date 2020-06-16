import * as React from "react";
import { Route, RouteProps, BrowserRouter, Redirect } from "react-router-dom";

const ReduxPage = React.lazy(() => import("../containers/main/main"));

const Routes: React.FC<RouteProps> = () => (
  <BrowserRouter>
    <React.Suspense fallback={<div>Загрузка...</div>}>
      <Route exact path="/" render={() => <Redirect to="/redux" />} />
      <Route exact path="/redux" component={ReduxPage} />
    </React.Suspense>
  </BrowserRouter>
);

export default Routes;

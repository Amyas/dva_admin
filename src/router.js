import React from "react";
import { Router, Route, Switch, Redirect } from "dva/router";
import dynamic from "dva/dynamic";

import AppLayout from "./layout/AppLayout";

const routes = {
  app: [
    {
      name: "首页",
      path: "/dashboard",
      side: true,
      models: () => [import("./models/app/dashboard")],
      component: () => import("./routes/App/Dashboard")
    },
    {
      name: "产品管理",
      path: "/product",
      side: true,
      models: () => [import("./models/app/product")],
      component: () => import("./routes/App/Product")
    }
  ]
};

function RouterConfig({ history, app }) {
  return (
    <Router history={history}>
      <Switch>
        <Route
          path="/login"
          component={dynamic({
            app,
            models: () => [import("./models/auth/login")],
            component: () => import("./routes/Auth/Login")
          })}
        />
        <Route
          path="/"
          render={props => <AppLayout app={app} routes={routes.app} />}
        />
      </Switch>
    </Router>
  );
}

export default RouterConfig;

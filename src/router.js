import React from "react";
import { Router, Route, Switch, Redirect } from "dva/router";
import dynamic from "dva/dynamic";
import { Spin } from "antd";

import AppLayout from "./layout/AppLayout";

dynamic.setDefaultLoadingComponent(() => {
  return (
    <Spin size="large" style={{ width: "100%", margin: "40px 0 !important" }} />
  );
});

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
      name: "分类管理",
      path: "/classify",
      side: true,
      models: () => [import("./models/app/classify")],
      component: () => import("./routes/App/Classify")
    },
    {
      name: "产品管理",
      path: "/product",
      side: true,
      models: () => [import("./models/app/product")],
      component: () => import("./routes/App/Product")
    },
    {
      name: "订单管理",
      path: "/orders",
      side: true,
      models: () => [import("./models/app/orders")],
      component: () => import("./routes/App/Orders")
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

import React from "react";
import { connect } from "dva";
import { Link, Route, withRouter, routerRedux } from "dva/router";
import { redux } from "redux";
import styles from "./AppLayout.css";
import { Layout, Menu, Icon } from "antd";
const { Header, Sider, Content } = Layout;
import dynamic from "dva/dynamic";

class AppLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      navIndex: "0",
      navRoutes: null
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  componentWillMount() {
    console.log();
    const { pathname } = this.props.location;
    if (pathname === "/") {
      this.props.dispatch(
        routerRedux.push({
          pathname: "/dashboard"
        })
      );
    }
    this.updateNav(pathname);
  }
  componentWillReceiveProps(nextProps) {
    const { pathname } = nextProps.location;
    this.updateNav(pathname);
  }
  updateNav(pathname) {
    const { routes } = this.props;
    const navRoutes = routes.filter(e => e.side);
    const navIndex = this.getNavIndex(navRoutes, pathname);
    this.setState({ navRoutes, navIndex });
  }
  renderNav(routes) {
    return routes.map((e, i) => (
      <Menu.Item key={i}>
        <Icon type="video-camera" />
        <span>{e.name}</span>
        <Link to={e.path} replace />
      </Menu.Item>
    ));
  }
  getNavIndex(routes, pathname) {
    for (var i = 0; i < routes.length; i++) {
      if (routes[i].path === pathname) {
        return String(i);
      }
    }
  }
  render() {
    const { app } = this.props;
    return (
      <Layout style={{ height: "100%" }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className={styles.logo} />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[this.state.navIndex]}
            selectedKeys={[this.state.navIndex]}
          >
            {this.renderNav(this.state.navRoutes)}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Icon
              className={styles.trigger}
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              background: "#fff",
              minHeight: 280
            }}
          >
            {this.state.navRoutes.map(({ path, ...dynamics }) => {
              return (
                <Route
                  exact
                  key={path}
                  path={path}
                  component={dynamic({
                    app,
                    ...dynamics
                  })}
                />
              );
            })}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(connect()(AppLayout));

import React from "react";
import { connect } from "dva";

@connect(() => ({}))
export default class Dashboard extends React.Component {
  render() {
    return <div>Route Component: Dashboard</div>;
  }
}

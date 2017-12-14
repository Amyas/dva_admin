import React from "react";
import { connect } from "dva";

class Dashboard extends React.Component {
  render() {
    return <div>Route Component: Dashboard</div>;
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Dashboard);

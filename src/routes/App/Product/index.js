import React from "react";
import { connect } from "dva";

class Product extends React.Component {
  render() {
    return <div>Route Component: Product</div>;
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Product);

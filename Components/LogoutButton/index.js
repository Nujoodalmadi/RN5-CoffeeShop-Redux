import React, { Component } from "react";
import { Icon, Button, Text } from "native-base";
import { withNavigation } from "react-navigation";
import * as actionCreators from "../../store/actions/authActions";

import { connect } from "react-redux";

class LogoutButton extends Component {
  render() {
    return (
      <Button transparent>
        <Text style={{ color: "white", fontSize: 25 }}>
          <Icon
            onPress={() => this.props.logout(this.props.navigation)}
            name="logout"
            type="AntDesign"
          />
        </Text>
      </Button>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: navigation => dispatch(actionCreators.logoutUser(navigation))
});
export default withNavigation(
  connect(
    null,
    mapDispatchToProps
  )(LogoutButton)
);

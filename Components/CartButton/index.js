import React, { Component } from "react";
import { Icon, Button, Text } from "native-base";
import { withNavigation } from "react-navigation";

import { connect } from "react-redux";
import { quantityCounter } from "../../Utilities/Counter";

class CartButton extends Component {
  render() {
    return (
      <Button transparent>
        <Text style={{ color: "white", fontSize: 25 }}>
          {this.props.quantity && this.props.quantity}
          <Icon
            onPress={() =>
              this.props.navigation.navigate(
                this.props.user ? "CoffeeCart" : "Login"
              )
            }
            name="shoppingcart"
            type="AntDesign"
          />
        </Text>
      </Button>
    );
  }
}

const mapStateToProps = state => ({
  quantity: quantityCounter(state.cartReducer.items),
  user: state.authReducer.user
});

export default withNavigation(connect(mapStateToProps)(CartButton));

import React, { Component } from "react";
import { connect } from "react-redux";
// NativeBase Components
import { List, Content, Spinner } from "native-base";

// Store
import coffeeshops from "./list";

// Component
import CoffeeItem from "./CoffeeItem";
import CartButton from "../CartButton";
import LogoutButton from "../LogoutButton";

class CoffeeList extends Component {
  static navigationOptions = {
    title: "Coffee List",
    headerRight: <CartButton />
  };

  render() {
    const { coffeeShops, loading } = this.props.coffeeReducer;
    let shops;

    if (loading) {
      return <Spinner />;
    }
    shops = coffeeShops.map(coffeeShop => (
      <CoffeeItem coffeeShop={coffeeShop} key={coffeeShop.id} />
    ));

    return (
      <Content>
        <List>{shops}</List>
        {this.props.user ? <LogoutButton /> : <></>}
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  coffeeReducer: state.coffeeReducer,
  user: state.authReducer.user
});

export default connect(mapStateToProps)(CoffeeList);

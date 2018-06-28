import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
// classes eh um objeto JS que contem classes CSS
// configurados com CSS components
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggle = () => {
        // the correct way to set state using current state
        this.setState((prevState) => {
           return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render () {
        return (
            <Aux>
                <Toolbar drawerToggle={this.sideDrawerToggle} />
                <SideDrawer show={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;
import React from "react";
import {connect} from "react-redux";
import Navbar from "./Navbar";

let mapStateToProps = (state) => {
    return {
        dataNavbar: state.sidebar
    }
}

const NavbarContainer = connect(mapStateToProps, null)(Navbar);

export default NavbarContainer;
import React from "react";
import {connect} from "react-redux";
import Navbar from "./Navbar";
import {AppStateType} from "../../redux/redux-store";
import {InitialStateType} from "../../redux/sidebar-reducer";

type MapStateToPropsType = {
    dataNavbar: InitialStateType
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dataNavbar: state.sidebar
    }
}

const NavbarContainer = connect<MapStateToPropsType, {}, {}, AppStateType>(
    mapStateToProps, null)
(Navbar);

export default NavbarContainer;
import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';

const RoutesAuthentication = (props) => {
    const dispatch = useDispatch();

    console.log("Props from routes page: ",props);

    const user = props.state.user;

    

    if(user==null){
        return (
            <Switch>
                <Route path={`/auth`} component={AuthLayout} />
                {/* <Route path={`/rtl`} component={RtlLayout} /> */}
				<Redirect from='/' to='/auth/sign-in' />
            </Switch>
        )
    }
    else{
        return (
            <Switch>
                <Route path={`/admin`} component={AdminLayout} />
                {/* <Route path={`/rtl`} component={RtlLayout} /> */}
                <Redirect from='/' to='/admin/portfolio-marketplace' />
            </Switch>
        )
    }

}

const mapStateToProps = (state) => {
	// console.log("State:", state);
	return {
		// To get the list of employee details from store
		state: state,
	};
};

export default connect(mapStateToProps, null)(RoutesAuthentication);
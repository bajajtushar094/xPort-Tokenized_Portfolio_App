import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import RtlLayout from 'layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import { Provider } from "react-redux"
import configureStore from "./store";
import RouteAuthentication from 'routeAuthentication';

ReactDOM.render(
	<Provider store={configureStore()}>
	<ChakraProvider theme={theme}>
		<React.StrictMode>
			<ThemeEditorProvider>
				<HashRouter>
					<Switch>
						<Route path={`/auth/sign-in`} component={AuthLayout} />
						<Route path={`/admin`} component={AdminLayout} />
						<Redirect from='/' to='/auth/sign-in' />
						{/* <RouteAuthentication/> */}
					</Switch>
				</HashRouter>
			</ThemeEditorProvider>
		</React.StrictMode>
	</ChakraProvider>
	</Provider>,
	document.getElementById('root')
);

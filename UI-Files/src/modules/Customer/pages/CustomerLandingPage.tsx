import * as React from 'react'
import { Router, Link, Switch, Route, useRouteMatch } from 'react-router-dom'
import history from '../../History/history'
import CustomerDetails from './CustomerDetails'
import CustomerCart from './CustomerCart'
import CustomerMenu from './CustomerMenuPage'
import CustomerVendorSearch from '../components/CustomerVendorSearch'



export default class CustomerLandingPage extends React.Component<any> {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path={'/customer'} exact={true}>
                       <CustomerVendorSearch>
                       </CustomerVendorSearch>
                    </Route>
                    <Route path={'/customer/cart'}>
                        <CustomerCart>
                        </CustomerCart>
                    </Route>
                    <Route path={'/customer/order'}>
                        
                        <CustomerDetails>
                        </CustomerDetails>
                        <CustomerCart>
                        </CustomerCart>
                        
                    </Route>
                    <Route path={'/customer/menu/:vendorName'}>
                        <CustomerMenu> 
                        </CustomerMenu>
                    </Route>
                </Switch>
            </Router>
        )
    }
}
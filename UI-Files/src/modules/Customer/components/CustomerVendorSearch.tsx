
import * as React from 'react'
import { Form, ListGroup } from 'react-bootstrap'
import CustomerVendorListItem from './CustomerVendorListItem'

import { fetchVendors, SearchThunkDispatch } from '../../../Redux/ActionFiles/CustomerActions';
import { VendorInfo } from '../../../Redux/InterfaceFiles/types';
import { RootState } from '../../../Redux/StoreFiles/store';
import { connect } from 'react-redux';

interface CustomerVendorSearchProps {
    vendorList?: VendorInfo[] | null
    fetchVendors?: any
}

interface CustomerVendorSearchState {
    searchField: any;
}


export class VendorSearch extends React.Component<CustomerVendorSearchProps,CustomerVendorSearchState> {

    constructor(props: CustomerVendorSearchProps){
        super(props);
        this.state = {
            searchField: React.createRef()
        }
    }

    // Fetch vendors based on search query
    handleChange(){
        const query: String = this.state.searchField.current.value;
        this.props.fetchVendors(query)
    }

    render() {
        return (
            <div>
                <div style={{margin: 10}}>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control ref={this.state.searchField} onChange={() => this.handleChange()} type="text" placeholder="Search..." />
                    </Form.Group>
                </div>
                <ListGroup style={{padding: '2px'}}>
                    {this.props.vendorList && this.props.vendorList.map((vendor: VendorInfo) => {
                        return <CustomerVendorListItem 
                            vendorName={vendor.name}
                            vendorDescription={vendor.description}
                            vendorCuisine={vendor.cuisine}
                            vendorHours={vendor.hours}
                        ></CustomerVendorListItem>
                    })}
                </ListGroup>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState): CustomerVendorSearchProps => ({
    vendorList: state.customer.search.vendors 
});

const mapDispatchToProps = (dispatch: SearchThunkDispatch): CustomerVendorSearchProps => ({
    fetchVendors: (query: String) =>
        dispatch(fetchVendors(query))
});

const CustomerVendorSearch = connect(
    mapStateToProps,
    mapDispatchToProps
)(VendorSearch)

export default CustomerVendorSearch;
import * as React from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import '../css/Style.css'

import { vendorSignUp, LoginThunkDispatch } from '../../../Redux/ActionFiles/VendorActions';
import { RootState } from '../../../Redux/StoreFiles/store';
import { connect } from 'react-redux';

// TODO: add type for dispatch function
interface VendorSignUpProps {
    isLoading?: Boolean
    signUp?: any
}

 interface VendorSignUpState {
    emailField: any;
    passwordField: any; 
    passwordConfirmField: any; 
 }


export class SignUp extends React.Component<VendorSignUpProps, VendorSignUpState> {

    constructor(props: VendorSignUpProps){
        super(props);
        this.state = {
            emailField: React.createRef(),
            passwordField: React.createRef(),
            passwordConfirmField: React.createRef()
        }
    }

    // Initiates user sign-up on form submission
    handleSubmit(): Boolean {
        const email: String = this.state.emailField.current.value;
        const pass: String = this.state.passwordField.current.value;

        // Make sure password and confirmation fields match
        if (pass !== this.state.passwordConfirmField.current.value) {
            console.log("Passwords do not match")
            return false
        }

        this.props.signUp(email, pass)
        return true;
    }

    render(){
        return (
                <Container>
                    <Form onClick={() => this.handleSubmit()}>
                        <Form.Group controlId='formEmail'>
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control type="text" ref={this.state.emailField} ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='formPassword'>
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Control ref={this.state.passwordField} type="password">
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='formConfirmPassword'>
                            <Form.Label>
                                Confirm Password
                            </Form.Label>
                            <Form.Control ref={this.state.passwordConfirmField} type="password">
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="button">Create Account</Button>
                    </Form>
                </Container>
        )
    }
}

const mapStateToProps = (state: RootState): VendorSignUpProps => ({
    isLoading: state.vendor.login.isLoading
});

const mapDispatchToProps = (dispatch: LoginThunkDispatch): VendorSignUpProps => ({
    signUp: (email: String, pass: String) =>
        dispatch(vendorSignUp(email, pass))
});

const VendorSignUp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp)

export default VendorSignUp;
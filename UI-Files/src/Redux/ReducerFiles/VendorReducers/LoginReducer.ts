import { LOGIN_STATUS, LoginAction } from '../../ActionFiles/VendorActions';
import { VendorInfo } from '../../InterfaceFiles/types';

interface LoginState {
    vendor?: VendorInfo | null,
    isLoading: Boolean,
    error?: Error | null
};

let initState: LoginState = {
    vendor: null,
    isLoading: false,
    error: null
};

// TODO: add return type for login reducer
export const Login = (state: LoginState = initState, action: LoginAction): LoginState => {
    switch(action.type) {

        // Signals start of vendor login
        case LOGIN_STATUS.BEGIN:
            return {
                ...state,
                isLoading: true,
            };

        // Signals successfull vendor login
        case LOGIN_STATUS.SUCCESS:
            return {
                ...state,
                vendor: action.payload,
                isLoading: false,
            };

        // Signals failed vendor login
        case LOGIN_STATUS.FAILURE:
            return {
                ...state,
                vendor: null,
                isLoading: false,
                error: action.error
            };

        default:
            return state
    }
};
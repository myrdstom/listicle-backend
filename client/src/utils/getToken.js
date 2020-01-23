import setAuthToken from './setAuthToken';
import jwt_decode from 'jwt-decode';
import store from '../redux/store/combineStore';
import { setCurrentUser } from '../redux/actions/auth/auth';

 const checkForToken = () =>{
    if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
        const decoded = jwt_decode(localStorage.jwtToken);
        store.dispatch(setCurrentUser(decoded));
    }


}

export default checkForToken;
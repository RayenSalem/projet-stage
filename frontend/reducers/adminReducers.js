
import authService from '../services/auth';


const adminReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'SIGNUP':
      return action.payload;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

const signupSuperAdmin=(credentials)=>{
    return async (dispatch)=>{
        const user=axios.post("http://localhost:4000/") 
    }
}
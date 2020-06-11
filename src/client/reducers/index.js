import { combineReducers } from 'redux';
import resourceReducer from './resourceReducer';

// Combine all reducers
const reducers = combineReducers({
  userInfo: resourceReducer,
});

export default reducers;

// Never used this file - consider deleting
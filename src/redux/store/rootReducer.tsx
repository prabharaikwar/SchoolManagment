import { combineReducers } from 'redux';
import {planReducer} from '../reducers/planReducer';
import schoolReducer from '../reducers/schoolReducer';
import { userReducer } from '../reducers/userReducer';
import settingReducer from "../reducers/settingReducer";
import totalIncomeReducer from '../reducers/totalIncomeReducer';
import totalBalanceReducer from '../reducers/totalBalanceReducer';
import transitionHistoryReducer from '../reducers/transitionHistoryReducer';
import mostSellingPlanReducer from '../reducers/mostSellingPlanReducer';
import overallSellingPlan from '../reducers/overallSellingPlan';

const rootReducer = combineReducers({
  plan: planReducer,     // planReducer handles 'plan' state
  school: schoolReducer, // schoolReducer handles 'school' state
  user:userReducer,      //login reducer
  setting: settingReducer,
  totalIncome:totalIncomeReducer,
  totalBalance:totalBalanceReducer,
  transitionHistory:transitionHistoryReducer,
  mostSelling:mostSellingPlanReducer,
  overAllSelling:overallSellingPlan,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

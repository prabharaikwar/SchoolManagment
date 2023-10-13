interface School {
  _id?: string;
  schoolLogo: string; // URL or file path to the logo image
  schoolName: string;
  schoolAffiliation: string;
  contactInformation: number;
  principalName: string;
  schoolType: string;
  schoolIdentificationNumber: string;
  schoolEmail: string;
  principalContactInformation: string;
  address: string;
  schoolCity: string;
  schoolPinCode: string;
  createPassword: string;
  confirmPassword: string;
  termsAndConditions: boolean;
  discountCouponCode: string;
  planSelection: string;
  userName: string;
  schoolWebsite: string;
}
export type { School };

export type PlanSelectionType = {
  _id: string;
  planName: string;
  pricing: number;
  planActivation: string;
}

export type Plan = {
  _id?: number | null;
  planName: string;
  planNumber: string;
  createdAt: string;
  planExpiration: string;
  usageLimit: string;
  features: string;
  trialPeriod: string;
  billingCycle: string;
  codes: string;
  planVisibility: string;
  planDescription: string;
  paymentOption: string;
  planActivation: string;
  pricing: string;
  paymentGateway: string;
  discountCouponCode: string;
  duration: string;
  planAnalytics: string;
};

export type login = {
  email: string;
  password: string;
};

export type personalDetails = {
  _id?: string;
  name?: string;
  contactNumber?: string;
  email?: string;
  password?: string;
  role?: string;
  profileImage?: string;
  __v?: number;
}
export type changePassword = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type TransitionHistoryType = {
  schoolLogo: string;
  schoolName: string;
  planName: string;
  planPricing: string;
  date: string;
}

export type MostSellingPlanType = {
  totalPurchase: number;
  totalAmount: number;
  planName: string;
}

export type OverallSellingPlanType = {
  _id: string;
  totalPurchase: number;
  totalAmount: number;
}
export type TotalBalanceType = {
  data: string;
}

export type TotalIncomeType = {}
export interface MonthlyIncome {
  month: string;
  income: number;
}

export interface WeeklyIncome {
  day: string;
  income: number;
}

export interface IncomeDataType {
  totalIncomeTodayResult: any[];
  monthlyIncomeResult?: {
    monthlyIncome: MonthlyIncome[];
    currentMonthIncome: { totalIncome: number }[];
  };
  weeklyIncomeResult?: {
    currentWeekIncome: number;
    weeklyIncome: WeeklyIncome[];
  };
}


export interface CouponType {
  _id: string,
  code: string,
  discountAmount: number,
  validFrom: string,
  validTo: string,
  __v: number
}

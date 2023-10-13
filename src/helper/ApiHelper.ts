import axios from "axios";
import { login,School,Plan,changePassword } from "../helper/Types";
const apiUrl = process.env.REACT_APP_BASE_URL;
const token = localStorage.getItem("token");
const headers = {
  'Authorization': token ? `Bearer ${token}` : '',
  'Content-Type': 'application/json',
};

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  },
});
//schools
export const AddSchool = (schoolData: Partial<School>) => {
  return axiosInstance.post(`${apiUrl}/school`, schoolData);
};

export const EditSchool = (id: string, schoolData: Partial<School>) => {  
  return axiosInstance.put(`${apiUrl}/school/${id}`, schoolData);  
};

export const GetAllSchools = () => {
  return axiosInstance.get(`${apiUrl}/school/school-list`);
};

export const ViewSingleSchool = (id: string) => { 
  return axiosInstance.get(`${apiUrl}/school/${id}`);
};

export const planSelection = () => {
  return axiosInstance.get(`${apiUrl}/all-plans`);
};


//Plans
export const CreatePlan = (planData: Partial<Plan>) => {
  return axiosInstance.post(`${apiUrl}/create-plan`, planData);
};

export const getCoupons = () => {
  return axiosInstance.get(`${apiUrl}/all-coupons`);
};


export const ViewPlan = (id: string) => {  
  return axiosInstance.get(`${apiUrl}/plan-history/${id}`); 
};

export const GetAllPlans = () => {
  return axiosInstance.get(`${apiUrl}/get-plans`);
};

//setting
export const getSettingPersonalDetails = () => {
  return axiosInstance.get(`${apiUrl}/setting/get-details`);
};

export const passwordSecurity =(passwordField: Partial<changePassword>)=> {
  return axiosInstance.put(`${apiUrl}/setting/change-password`,passwordField);
}
// login
export const LoginUser = (url: string, credentials: login) => {
  return axiosInstance.post(url, credentials);
};
//dashboard
export const totalIncomeFetch = (timeRange: string) => {
  return axiosInstance.post(`${apiUrl}/total-income`,{ timeRange })    
};
export const TotalBalance = () => {
  return axiosInstance.get(`${apiUrl}/total-balance`)    
  };
export const CourseTransitionHistory = () => {
  return axiosInstance.get(`${apiUrl}/transition-history`)    
};
export const MostSellingPlan = () => {
  return axiosInstance.get(`${apiUrl}/most-selling-plans`)  
};
export const OverallSellingPlan = () => {
  return axiosInstance.get(`${apiUrl}/overall-selling-plans`)
};





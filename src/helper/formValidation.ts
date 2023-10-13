import * as Yup from "yup";

const getCharacterValidationError = (str: string) => {
    return `Your password must have at least 1 ${str} character`;
  };
  
export const validateSchema = Yup.object().shape ({
  schoolLogo: Yup.mixed()
  .test("fileType", "Invalid file type", (value) => {
    if (value instanceof FileList) {
      const fileType = value[0]?.type;
      return ["image/jpeg", "image/png"].includes(fileType);
    }
    return true;
  }),
    schoolName: Yup.string().required('School Name is required'),
    schoolType: Yup.string().required("Please select a school type."),
    schoolAffiliation: Yup.string().required('School Affiliation is required'),
    schoolIdentificationNumber: Yup.string()
    .required('School Identification Number is required')
    .matches(/^\d+$/, 'School Identification Number must be a valid number'),
    contactInformation: Yup.string()
    .required('School Mobile Number is required')
    .matches(/^[+]?\d{10,12}$/, 'Invalid mobile number format'),
    principalName: Yup.string()
    .required('Principal Name is required'),
    schoolEmail: Yup.string().email("Invalid email format.").required("This field is required"),
    principalContact:Yup.string().email("Invalid email format.").required("This field is required"),
    contactNumber: Yup.string().required("Contact Number is required."),
    userName: Yup.string().required('Username is required'),
    createPassword: Yup.string().required("Please enter a password")    
    .min(8, "Password must have at least 8 characters")    
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
    confirmPassword: Yup.string()
    .required("This field is required")
    .test("passwords-match", "Passwords must match", function(value) {
        return this.parent?.createPassword === value;
    }),
    schoolWebsite: Yup.string().matches(
      /^(https?:\/\/)?([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+\.[a-zA-Z]{2,6}([\/\w\.-]*)*\/?$/,
      "Invalid website URL format"
  ),
  principalContactInformation: Yup.string()
  .email('Invalid email format.')
  .required('Principal Contact Information is required'),
  planSelection: Yup.string().required("Please select a plan"),
  address: Yup.string().required('Address is required'),
  schoolCity: Yup.string().required('City/Village is required'),
  schoolPinCode: Yup.string()
    .required('Pin Code is required')
    .matches(/^[0-9]{6}$/, 'Invalid Pin Code'),    
  termsAndConditions: Yup.boolean()
    .oneOf([true], 'You must accept the Terms and Conditions to proceed')
    .required('You must accept the Terms and Conditions to proceed'),
});

export const editSchoolSchema = Yup.object().shape({
    schoolName: Yup.string().required("School Name must be at least 5 characters long."),

})

export const planSchema = Yup.object().shape ({
  planName: Yup.string()
  .min(5, "Plan Name must be at least 5 characters long.")
  .required("Plan Name is required."),
    planType: Yup.string().required("Please select a plan type."),
  planNumber: Yup.string()
    .required("Plan Number is required."),
  createdAt: Yup.date()
    .required("Creation Date is required.")
    .nullable(),
  planExpiration: Yup.mixed()
    .required("Plan Expiration Date is required.")    
    .nullable(),
  usageLimit: Yup.number()
    .integer("Usage Limit must be an integer.")
    .required("Usage Limit is required.")
    .positive("Usage Limit must be a positive number.")
    .max(5000, "Usage Limit must not exceed 5000."),
  features: Yup.string()
    .required("Features are required."),
  trialPeriod: Yup.number()
    .integer("Trial Period must be an integer.")
    .required("Trial Period is required.")
    .positive("Trial Period must be a positive number.")
    .max(30, "Trial Period must not exceed 30 days."),
  billingCycle: Yup.string()
    .required("Billing Cycle is required."),
  codes: Yup.string()
    .required("Codes are required."),
  planVisibility: Yup.string()
    .required("Plan Visibility is required."),
  planDescription: Yup.string()
    .required("Plan Description is required."),
  paymentOption: Yup.string()
    .required("Payment Option is required."),
  planActivation: Yup.string()
    .required("Plan Activation is required."),
  pricing: Yup.number()
    .required("Pricing is required.")
    .positive("Pricing must be a positive number."),
  paymentGateway: Yup.string()
    .required("Payment Gateway is required."),
  discountCouponCode: Yup.string(),
  duration: Yup.string()
    .required("Plan Duration is required."),
  planAnalytics: Yup.string()
    .required("Plan Analytics is required."),
    
});



export const loginSchema = Yup.object().shape({
    email: Yup.string()
    .email('Invalid email address')
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .required('Email is required')
    .test('contains-at', 'Invalid email/phone', function (value) {
        return /@/.test(value); // Check if value contains '@'
      }),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')    
    .test('contains-uppercase', 'Password must contain at least one uppercase letter', function (value) {
      return /[A-Z]/.test(value); // Check if value contains at least one uppercase letter
    })
    .test('contains-special-character', 'Password must contain at least one special character', function (value) {
      return /[!@#$%^&*()-_=+{}[]|;:'",.<>?`~]/.test(value); // Check if value contains at least one special character
    }),
})


export const PasswordSecuritySchema = Yup.object().shape({
oldPassword: Yup.string().required("Current Password is required"),
  newPassword: Yup.string()
    .required("New Password is required")
    .min(8, "New Password must be at least 8 characters long"),
  confirmPassword: Yup.string()
    .required("Confirm New Password is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});
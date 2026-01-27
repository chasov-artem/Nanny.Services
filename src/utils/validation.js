import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required'),
});

export const appointmentSchema = yup.object().shape({
  address: yup.string().required('Address is required'),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^\+380\d{9}$/, 'Phone must be in the format +380XXXXXXXXX'),
  childAge: yup.string().required('Child age is required'),
  time: yup.string().required('Meeting time is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  meetingTime: yup.string(),
  parentName: yup.string().required("Parent's name is required"),
  comment: yup.string().required('Comment is required'),
});


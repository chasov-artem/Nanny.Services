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
  address: yup.string(),
  phone: yup
    .string()
    .matches(/^\+380/, 'Phone must start with +380'),
  childAge: yup.string(),
  time: yup.string(),
  email: yup
    .string()
    .email('Invalid email format'),
  meetingTime: yup.string(),
  parentName: yup.string(),
  comment: yup.string(),
});


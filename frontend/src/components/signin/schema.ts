import * as yup from 'yup';

export const signinSchema = yup.object().shape({
  emailOrUsername: yup.string().required('Email or Username is required'),
  password: yup.string().required('Password is required'),
});

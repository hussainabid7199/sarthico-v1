import * as Yup from 'yup';
import LoginModel from '../models/LoginDataModel';

const LoginSchema: Yup.ObjectSchema<LoginModel> = Yup.object().shape({ 
    username: Yup.string().required("Username is required."),
    password: Yup.string().required("Password is required."),
    rememberMe: Yup.boolean()
});

export default LoginSchema;



import {
    Card,
    Typography,
} from "@material-tailwind/react";
import { useFormik } from 'formik';
import {  useLocation, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { useLoginMutation } from "../../features/api/authSlic";
import { useDispatch } from "react-redux";
import { setCredential } from "../../features/slices/credentialSlice";
import AuthForm from "../../components/AuthForm";

const SigninSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('required'),
    password: Yup.string().min(8, 'The password field must be at least 8 characters.')
})
const Login = () => {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const {search} = useLocation();
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') ?? '/';

    const [login,{isLoading}] = useLoginMutation()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: SigninSchema,
        onSubmit: async (values, { resetForm }) => {
            const res = await login(values);
            dispatch(setCredential(res?.data.info))
            nav(redirect)
        }
    })

    return (
        <div className="w-full h-screen  flex justify-center items-center">
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Sign In
                </Typography>

                <AuthForm formik={formik} title={'Sign In'}/>
            </Card>

        </div>
    )
}

export default Login
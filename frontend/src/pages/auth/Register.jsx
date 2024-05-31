import {
    Card,
    Typography,
} from "@material-tailwind/react";
import { useFormik } from 'formik';
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import {  useRegisterMutation } from "../../features/api/authSlic";
import { useDispatch } from "react-redux";
import { setCredential } from "../../features/slices/credentialSlice";
import AuthForm from "../../components/AuthForm";

const SigninSchema = Yup.object().shape({
    name:Yup.string().required('required'),
    email: Yup.string().email('Invalid email').required('required'),
    password: Yup.string()
        .required("This field is required")
        .min(8, "Pasword must be 8 or more characters"),
    confirmPassword: Yup.string().when("password", (password, field) => {
        if (password) {
            return field.required("The passwords do not match").oneOf([Yup.ref("password")], "The passwords do not match");
        }
    }),
})
const Register = () => {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const { search } = useLocation();
    const sp = new URLSearchParams(search)
    const redirect = sp.get('email') ?? '/';

    const [register, { isLoading }] = useRegisterMutation()
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: SigninSchema,
        onSubmit: async (values, { resetForm }) => {
            const res = await register(values);
            dispatch(setCredential(res?.data.info))
            nav(redirect)
        }
    })

    return (
        <div className="w-full h-screen  flex justify-center items-center">
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Sign Up
                </Typography>
                <AuthForm formik={formik} title={'Sign Up'} />
            </Card>

        </div>
    )
}

export default Register

import {
    Button,
    Input,
    Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const AuthForm = ({formik,title}) => {
  return (
    <form onSubmit={formik.handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        {
                            Object.keys(formik.values)?.map((type)=>(
                                <div key={type}>
                                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                                        {type}
                                    </Typography>
                                    <Input
                                        onChange={formik.handleChange}
                                        value={formik.values[type]}
                                        size="lg"
                                        name={type}
                                        type={type == 'email' ? 'email' : type == 'password' || type == 'confirmPassword' ? 'password' : 'text'}
                                        placeholder={type == 'email' ? "name@mail.com" : type == 'password' ? '.......': 'name'}
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                    />
                                    {formik.errors[type] ?formik.errors[type]: ''}
                                </div>
                            ))
                        }
                    </div>

                    <Button className="mt-6" fullWidth type="submit">
                        {title}
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        create an account?{" "}
                        <Link to="/register" className="font-medium text-gray-900">
                            {title == 'Sign Up' ? title : 'Sign In'}
                        </Link>
                    </Typography>
                </form>
  )
}

export default AuthForm
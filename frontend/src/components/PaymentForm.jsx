import * as Yup from "yup"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { Button, Input, Typography } from "@material-tailwind/react"
import { savePaymentMethod } from "../features/slices/cartSlice"


const PaymentMethodSchema = Yup.object().shape({
    paymentMethod: Yup.string().required('required'),
})
const PaymentForm = () => {
    const dispatch = useDispatch()
    const paymentMethod = useSelector((state)=>state.cart?.paymentMethod)
    const formik = useFormik({
        initialValues: {
            paymentMethod: paymentMethod,
        },
        validationSchema: PaymentMethodSchema,
        onSubmit: async (values) => {
            dispatch(savePaymentMethod(values.paymentMethod))
        }
    })
    return (
        <form onSubmit={formik.handleSubmit} className="my-14 w-1/2 mx-auto">
            {
                Object.keys(formik.values)?.map(type => (
                    <div className="mb-4" key={type}>
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            {type}
                        </Typography>
                        <Input
                            size="sm"
                            onChange={formik.handleChange}
                            value={formik.values[type]}
                            name={type}
                            placeholder={type}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        {formik.errors[type] ? formik.errors[type] : ''}
                    </div>
                ))
            }
            <Button type="submit">Submit</Button>
        </form>
    )
}

export default PaymentForm
import * as Yup from "yup"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { saveShippingAddress } from "../features/slices/cartSlice"
import { Button, Input, Typography } from "@material-tailwind/react"


const ShippingSchema = Yup.object().shape({
    country: Yup.string().min(3, 'Must be 3 or more characters').required('required'),
    city: Yup.string().min(3, 'Must be 3 or more characters').required('required'),
    address: Yup.string().min(3, 'Must be 3 or more characters').required('required'),
    postalCode: Yup.string().min(3, 'Must be 3 or more characters').required('required'),
})
const ShippingForm = () => {
    const dispatch = useDispatch()
    const shipping = useSelector((state)=>state.cart?.shippingAddress)
    const formik = useFormik({
        initialValues: {
            country: shipping?.country,
            city: shipping?.city,
            address: shipping?.address,
            postalCode: shipping?.postalCode
        },
        validationSchema: ShippingSchema,
        onSubmit: async (values) => {
            dispatch(saveShippingAddress(values))
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

export default ShippingForm
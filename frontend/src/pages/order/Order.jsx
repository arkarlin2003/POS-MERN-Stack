import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { useGetOrderDetailQuery } from "../../features/api/orderSlice"
import { Loading } from "../../components/Loading"

const Order = () => {
    const { id: orderId } = useParams()
    const credential = useSelector(state => state.credential)
    const { data: order, isLoading } = useGetOrderDetailQuery({ orderId, credential })
    if(isLoading) return (<Loading/>)
    return (
        <div className="py-7 w-full flex gap-7">
            <div className="w-full">
                <h1 className="text-2xl font-bold text-gray-700">Order {orderId}</h1>
                <div className="my-6 mb-4 ">
                    <h1 className="text-xl my-3 font-semibold text-gray-700">Shipping</h1>
                    <ul className="space-y-2">
                        <li>
                            <span className="text-gray-800 font-semibold text-sm">Name:</span> {order?.user.name}
                        </li>
                        <li>
                            <span className="text-gray-800 font-semibold text-sm">Email:</span> {order?.user.email}
                        </li>
                        <li>
                            <span className="text-gray-800 font-semibold text-sm">Address:</span> {order?.shippingAddress?.address + ',' + order?.shippingAddress?.city + ',' + order?.shippingAddress?.country}
                        </li>
                        {
                            order?.isDelivered ? (
                                <li className="bg-green-100/60 p-3 rounded">
                                    <p className="text-green-500"> Delivered</p>
                                </li>
                            ) : (
                                <li className="bg-red-100/60 p-3 rounded">
                                    <p className="text-red-500">Not Delivered</p>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className="my-6 mb-4 ">
                    <h1 className="text-xl my-3 font-semibold text-gray-700">Payment Method</h1>
                    <ul className="space-y-2">

                        <li>
                            <span className="text-gray-800 font-semibold text-sm">Method:</span> {order?.paymentMethod}
                        </li>

                        {
                            order?.isPaid ? (
                                <li className="bg-green-100/60 p-3 rounded">
                                    <p className="text-green-500"> Delivered</p>
                                </li>
                            ) : (
                                <li className="bg-red-100/60 p-3 rounded">
                                    <p className="text-red-500">Not Paid</p>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className="my-6 mb-4 ">
                    <h1 className="text-xl my-3 font-semibold text-gray-700">Order? Items</h1>
                    {
                        order?.orderItem?.map((cart, i) => (<ul key={i} className="flex space-x-7 border-b-2 pb-3 ">
                            <li>
                                <img src={cart.image} alt="" className="w-32 h-24 rounded-lg" />
                            </li>
                            <li>
                                <Link className=" underline" to={`/products/${cart._id}`}><h1>{cart.name}</h1></Link>
                            </li>
                            <li>
                                <h1>{cart.qty} x ${cart.price} = ${cart.price * cart.qty}</h1>
                            </li>
                        </ul>)
                        )
                    }
                </div>
            </div>
            <div className="border-2 rounded shadow w-[30%] h-full">
                <h1 className="text-2xl p-3 pb-3 ">Order Summary</h1>

                <ul className="mt-4 w-full">
                    <li className="p-3  border-2 w-full">
                        <div className="flex w-full justify-between">
                            <p>Items:</p>
                            <p>${order?.itemsPrice}</p>
                        </div>
                    </li>
                    <li className="p-3  border-2 w-full">
                        <div className="flex w-full justify-between">
                            <p>Shipping:</p>
                            <p>${order?.shippingPrice}</p>
                        </div>
                    </li>
                    <li className="p-3  border-2 w-full">
                        <div className="flex w-full justify-between">
                            <p>Taxs:</p>
                            <p>${order?.taxPrice}</p>
                        </div>
                    </li>
                    <li className="p-3  border-2 w-full">
                        <div className="flex w-full justify-between">
                            <p>Total:</p>
                            <p>${order?.totalPrice}</p>
                        </div>
                    </li>
                </ul>
                
            </div>
        </div>
    )
}

export default Order
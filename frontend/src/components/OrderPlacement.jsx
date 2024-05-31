import { Button } from "@material-tailwind/react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useAddOrderMutation } from "../features/api/orderSlice"
import { clearCart } from "../features/slices/cartSlice"

const OrderPlacement = () => {
  const cart = useSelector(state => state.cart)
  const token = useSelector(state => state.credential?._token)
  const dispatch = useDispatch()

  const nav = useNavigate()
  const [addOrder] = useAddOrderMutation()

  const placeOrderHandler = async () => {
    const res = await addOrder({cart,token})
    if(res?.data){
      dispatch(clearCart(null))
      nav(`/order/${res.data._id}`)
    }
  }
  return (
    <div className='flex gap-5 my-14 w-full mx-auto'>
      <div className="w-full">
        <div className='py-4 border-b-2 space-y-2'>
          <h1 className='text-xl'>Shipping</h1>
          <p><span className='font-bold text-sm'>Address:</span> {cart?.shippingAddress?.address + ',' + cart?.shippingAddress?.city + ',' + cart?.shippingAddress?.country}</p>
        </div>
        <div className='py-4 border-b-2 space-y-2'>
          <h1 className='text-xl'>Payment Method</h1>
          <p><span className='font-bold text-sm'>Method:</span> {cart?.paymentMethod}</p>
        </div>
        <div className='py-4 border-b-2 space-y-2'>
          <h1 className='text-xl'>Order Items</h1>
          {
            cart.cartItems?.map((cart, i) => (<ul key={i} className="flex space-x-7 border-b-2 pb-3 ">
              <li>
                <img src={cart.product.image} alt="" className="w-32 h-24 rounded-lg" />
              </li>
              <li>
                <Link className=" underline" to={`/products/${cart.product._id}`}><h1>{cart.product.name}</h1></Link>
              </li>
              <li>
                <h1>{cart.qty} x ${cart.product.price} = ${cart.product.price * cart.qty}</h1>
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
              <p>${cart?.itemsPrice}</p>
            </div>
          </li>
          <li className="p-3  border-2 w-full">
            <div className="flex w-full justify-between">
              <p>Shipping:</p>
              <p>${cart?.shippingPrice}</p>
            </div>
          </li>
          <li className="p-3  border-2 w-full">
            <div className="flex w-full justify-between">
              <p>Taxs:</p>
              <p>${cart?.taxPrice}</p>
            </div>
          </li>
          <li className="p-3  border-2 w-full">
            <div className="flex w-full justify-between">
              <p>Total:</p>
              <p>${cart?.totalPrice}</p>
            </div>
          </li>
        </ul>
        <div className=" p-3">
          <Button onClick={placeOrderHandler}>Place Order</Button>
        </div>
      </div>

    </div>
  )
}

export default OrderPlacement
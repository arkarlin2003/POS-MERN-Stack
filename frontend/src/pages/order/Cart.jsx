import { Button, Option, Select } from "@material-tailwind/react"
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { addCartToCard, removeCart } from "../../features/slices/cartSlice"

const Cart = () => {
    const carts = useSelector((state) => state.cart)
    const credential = useSelector((state) => state.credential)
    const dispatch = useDispatch()
    const qtyHandler = (product,qty) => {
        dispatch(addCartToCard({product,qty}))
    }
    const deleteCart = (product) => {
        dispatch(removeCart({product}))
    }
    return (
        <div className="w-full">
            <div className="my-7">
                <Button>
                    <Link to='/'>Back</Link>
                </Button>
            </div>
            <div className="w-full flex gap-6">
                <div className="space-y-3 w-full">
                    {
                        !carts.cartItems.length ? (<h1>No Carts</h1>) : ''
                    }
                    {
                        carts.cartItems?.map((cart, i) => (<ul key={i} className="flex space-x-7 border-b-2 pb-3 ">
                            <li>
                                <img src={cart.product.image} alt="" className="w-32 h-24 rounded-lg"/>
                            </li>
                            <li>
                               <Link className=" underline" to={`/products/${cart.product._id}`}><h1>{cart.product.name}</h1></Link>
                            </li>
                            <li>
                                <h1>${cart.product.price}</h1>
                            </li>
                            <li>
                            <Select value={cart.qty}
                                    onChange={(value)=> qtyHandler(cart.product,value)}>
                                        {
                                            [...Array(cart.product?.countInStock).keys()]?.map((stock)=>{
                                                return (<Option key={stock} value={stock+1} >{stock+1}</Option>)
                                            })
                                        }
                                    </Select>
                            </li>
                            <li>
                            <FaTrash className="text-red-500 cursor-pointer" onClick={()=>deleteCart(cart.product)}/>
                            </li>
                        </ul>)
                        )
                    }
                </div>
                <ul className=" border w-[40%] rounded h-full shadow">
                    <li className="border-b p-4">
                        <h5 className="text-2xl">Subtotal ({carts.cartItems?.length}) items</h5>
                        <h3 className="mt-2 ">${carts.totalPrice}</h3>
                    </li>

                    <li className="border-b  p-4 flex justify-center">
                        <Link to={credential ? '/shipping' : '/login?redirect=/shipping'}>
                        <Button >Process to checkout</Button>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Cart
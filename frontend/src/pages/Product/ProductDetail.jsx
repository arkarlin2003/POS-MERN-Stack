import { Button, Option, Select } from "@material-tailwind/react"
import { Link, useParams } from "react-router-dom"
import RatingCard from "../../components/RatingCard"
import { useGetProductQuery } from "../../features/api/productSlice"
import { Loading } from "../../components/Loading"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addCartToCard } from "../../features/slices/cartSlice"

const ProductDetail = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { data: product, isLoading } = useGetProductQuery(id)
    const [qty,setQty] = useState(1)

    const handler = () => {
        dispatch(addCartToCard({product,qty}))
    }
    return (
        <div className="w-full">
            <div className="my-7">
                <Button>
                    <Link to='/'>Back</Link>
                </Button>
            </div>
            {
                isLoading ? (<Loading />) : (
                    <div className="w-full flex gap-6">
                        <div className="flex gap-3 w-full">
                            <div className="w-[50%]">
                                <img src={product?.image} alt="image" className="w-full h-56" />
                            </div>
                            <ul className=" space-y-3 w-full">
                                <li className=" border-b-2 pb-3 ">
                                    <h1 className="text-2xl font-semibold text-gray-700">{product?.name}</h1>
                                </li>
                                <li className=" border-b-2 pb-3 ">
                                    <RatingCard rate={product?.rating} review={product?.review} />
                                </li>
                                <li className=" border-b-2 pb-3 ">
                                    <h4 className="text-gray-600">Price: <span className="font-semibold">${product?.price}</span></h4>
                                </li>
                            </ul>

                        </div>
                        <ul className=" border w-[40%] rounded h-full shadow">
                            <li className="border-b p-4 flex justify-between">
                                <h5>Price: </h5>
                                <h5>${product?.price}</h5>
                            </li>
                            <li className="border-b p-4 flex justify-between">
                                <h5>Status:</h5>
                                <h5>In Stock</h5>
                            </li>
                            <li className="border-b p-4 flex justify-between">
                                <h5>Qty:</h5>
                                <div>
                                    <Select value={qty}
                                    onChange={(value)=> setQty(value)}>
                                        {
                                            [...Array(product?.countInStock).keys()]?.map((stock)=>{
                                                return (<Option key={stock} value={stock+1} >{stock+1}</Option>)
                                            })
                                        }
                                    </Select>
                                </div>
                            </li>
                            <li className="border-b  p-4 flex justify-center">
                                <Button onClick={handler}>Add To Cart</Button>
                            </li>
                        </ul>
                    </div>
                )
            }
        </div>
    )
}

export default ProductDetail
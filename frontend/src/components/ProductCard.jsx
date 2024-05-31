import { Link } from "react-router-dom"
import RatingCard from "./RatingCard"

const ProductCard = ({product}) => {
  return (
    <div className="p-3 border shadow rounded">
        <div>
            <img src={product.image} alt="image" className="w-full h-56" />
        </div>
        <div className="mt-2 space-y-1">
            <h2 className="font-bold">
                <Link to={`/products/${product._id}`}>{product.name}</Link>
            </h2>
            <RatingCard rate={product.rating} review={product.review}/>
            <h3 className="text-xl font-semibold text-gray-700">${product.price}</h3>
        </div>

    </div>
  )
}

export default ProductCard
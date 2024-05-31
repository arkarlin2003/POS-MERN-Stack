import { Loading } from "../../components/Loading";
import ProductCard from "../../components/ProductCard"
import { useGetProductsQuery } from "../../features/api/productSlice"

const Product = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <section className="mt-7 space-y-4 ">
      <h1 className=" text-2xl font-semibold">Latest Products</h1>
      {
        isLoading ? (<Loading />) : (
          <div className="w-full grid grid-cols-6 gap-5">
            {
              products?.map((product) => (<ProductCard product={product} key={product._id} />))
            }
          </div>
        )
      }

    </section>
  )
}

export default Product
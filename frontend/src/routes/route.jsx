import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import App from "../pages/App"
import Product from "../pages/Product/Product"
import ProductDetail from "../pages/Product/ProductDetail"
import Cart from "../pages/order/Cart"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import Shipping from "../pages/shipping/Shipping"
import Authenticate from "../pages/auth/Authenticate"
import Order from "../pages/order/Order"
const route = createBrowserRouter(createRoutesFromElements(<Route>
    <Route path="/" element={<App />}>
        <Route index element={<Product/>}/>
        <Route path="/products/:id" element={<ProductDetail/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route element={<Authenticate/>}>
        <Route path="/shipping" element={<Shipping/>}/>
        <Route path="/order/:id" element={<Order/>}/>
        </Route>
    </Route>
</Route>))


export default route

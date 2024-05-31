import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { useLogoutMutation } from "../../features/api/authSlic";
import { setCredential } from "../../features/slices/credentialSlice";
 
const  Header = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const count = useSelector((state)=>state.cart.cartItems?.length)
  const auth = useSelector((state)=>state.credential)
  const nav = useNavigate()
  const dispatch = useDispatch()
  const [logout] = useLogoutMutation()
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
const logoutHandler = async () => {
  await logout()
  dispatch(setCredential(null))
  nav('/login')
}
  return (
      <Navbar className="sticky top-0 z-[999] h-max max-w-full rounded-none px-4 py-2 bg-white lg:px-8 lg:py-2.5">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-bold"
          >
            MERN APP
          </Typography>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-x-1">
               <div className="mr-4 cursor-pointer">
               <Link to='/cart' className=" relative">
                <FaCartShopping size={20}/>
                <span className=" absolute -top-5 -right-2 text-green-500 text-lg">{count}</span>
                </Link>
               </div>
              <Link to='/login'>
              <Button
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block"
              >
                <span>Sign in</span>
              </Button></Link>
              {
                auth ? (<Menu>
                  <MenuHandler>
                    <Button>Menu</Button>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem>{auth.name}</MenuItem>
                    <MenuItem>
              <button
              onClick={logoutHandler}
                size="sm"
                className="bg-red-500 w-full"
              >
                Logout
              </button>
                    </MenuItem>
                  </MenuList>
                </Menu>) : ''
              }
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="text" size="sm" className="">
              <span>Log In</span>
            </Button>
            <Button fullWidth variant="gradient" size="sm" className="">
              <span>Sign in</span>
            </Button>
          </div>
        </MobileNav>
      </Navbar>
  );
}

export default Header
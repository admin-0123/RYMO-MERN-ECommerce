import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./components/header/Navbar";
import Login from "./pages/auth/login/Login";
import Products from "./pages/products/Products";
import Register from "./pages/auth/register/Register";
import { useEffect, useState } from "react";
import store from "./store";
import { loadUser } from "./actions/userActions";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import NewProduct from "./pages/admin/newProduct/NewProduct";
import ProductsList from "./pages/admin/products/ProductsList";
import ProtectedRoute from "./components/route/ProtectedRoute";
import ProductDetails from "./pages/admin/productDetails/ProductDetails";
import UpdateProduct from "./pages/admin/updateProduct/UpdateProduct";
import SingleProduct from "./pages/singleProduct/SingleProduct";
import Cart from "./pages/cart/Cart";
import Shipping from "./pages/cart/shipping/Shipping";
import ConfirmOrder from "./pages/cart/confirmOrder/ConfirmOrder";
import axios from "axios";

//  payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./pages/cart/payment/Payment";
import Success from "./pages/cart/success/Success";
import Users from "./pages/admin/users/Users";

function App() {
    const [stripeApiKey, setStripeApiKey] = useState("");
    useEffect(() => {
        store.dispatch(loadUser());

        async function getStripApiKey() {
            const { data } = await axios.get("/api/v1/stripeapi");

            setStripeApiKey(data.stripeApiKey);
        }

        getStripApiKey();
    }, []);
    return (
        <div className="app">
            <Router>
                <Navbar />
                <Route path="/" component={Home} exact />
                <Route path="/login" component={Login} exact />
                <Route path="/register" component={Register} exact />
                <Route path="/products" component={Products} exact />
                <Route path="/product/:id" component={SingleProduct} exact />
                <Route path="/cart" component={Cart} exact />

                <ProtectedRoute path="/shipping" component={Shipping} />
                <ProtectedRoute path="/confirm" component={ConfirmOrder} />
                {stripeApiKey && (
                    <Elements stripe={loadStripe(stripeApiKey)}>
                        <ProtectedRoute path="/payment" component={Payment} />
                    </Elements>
                )}
                <ProtectedRoute path="/success" component={Success} />
                <ProtectedRoute
                    path="/admin"
                    isAdmin={true}
                    component={Dashboard}
                    exact
                />
                <ProtectedRoute
                    path="/admin/products/new"
                    isAdmin={true}
                    component={NewProduct}
                    exact
                />
                <ProtectedRoute
                    path="/admin/products"
                    isAdmin={true}
                    component={ProductsList}
                    exact
                />
                <ProtectedRoute
                    path="/admin/product/details/:id"
                    component={ProductDetails}
                    exact
                />
                <ProtectedRoute
                    path="/admin/product/:id"
                    isAdmin={true}
                    component={UpdateProduct}
                    exact
                />
                <ProtectedRoute
                    path="/admin/users"
                    isAdmin={true}
                    component={Users}
                    exact
                />
            </Router>
        </div>
    );
}

export default App;

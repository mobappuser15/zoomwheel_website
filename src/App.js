import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
    Navigate,
    useNavigate,
    useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Homepage from "./Components/Homepage";
import "./Components/responsive.css";
import "./Components/style.css";
import Sellcar from "./Components/Sellcar";
import BuyerCar from "./Components/BuyerCar";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Gallery from "./Components/Gallery";
import DetailsCars from "./Components/DetailsCars";
import Signup from "./Components/Signup";
import AdminDash from "./Pages/AdminDash";
import AddVechil from "./Pages/AddVechil";
import Insurance from "./Components/Insurance";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Dashboard from "./Pages/Dashboard";
import DataUpload from "./Pages/DataUpload";
import DeleveryForm from "./Pages/DeleveryForm";
import Deleverystock from "./Pages/Deleverystock";
import BookingForm from "./Pages/BookingForm";
import BookingStovk from "./Pages/BookingStovk";
import StoreVechileTable from "./Pages/StoreVechileTable";
import FiinalImage from "./Pages/FiinalImage";
import EditForm from "./Pages/EditForm";
import ScrollTop from './Components/ScrollTop';

export default function App({ isLoggedIn }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLoginRoute = () => {
        // Navigate to the login route
        navigate("/login");
    };

    const handleOtherRoutes = () => {
        // Navigate to other routes
        navigate("/");
    };

    const blockContextMenu = (event) => {
        event.preventDefault();}

    return ( 
        <div > 

        <ScrollTop />


        {
            location.pathname !== '/dataupload/finalimage' &&
            location.pathname !== '/deleveryhome' &&
            location.pathname !== '/login' &&
            location.pathname !== '/admin' &&
            location.pathname !== '/stocktable' &&
            location.pathname !== '/editdata' &&
            location.pathname !== '/bookingform' &&
            location.pathname !== '/deleveryform' &&
            location.pathname !== '/dataupload' &&

            location.pathname !== '/bookingstocktable' &&
            location.pathname !== '/Addvechils' && ( 
                <Navbar />
            )
        }
         <Routes >
        <Route path = "/admin"  element = { < AdminDash / > } /> 
        <Route path = "/Addvechils" element = { < AddVechil / > } />

        <
        Route path = "/login"
        element = { < Signup / > }
        /> <
        Route path = "/bookingstocktable"
        element = { < BookingStovk / > }
        /> <
        Route path = "/dataupload"
        element = { < DataUpload / > }
        /> <
        Route path = "/deleveryform"
        element = { < DeleveryForm / > }
        /> <
        Route path = "/bookingform"
        element = { < BookingForm / > }
        /> <
        Route path = "/editdata"
        element = { < EditForm / > }
        /> <
        Route path = "/stocktable"
        element = { < StoreVechileTable / > }
        /> <
        Route path = "/deleveryhome"
        element = { < Deleverystock / > }
        /> <
        Route path = "/dataupload/finalimage"
        element = { < FiinalImage / > }
        /> < /
        Routes > <
        Toaster position = "top-right"
        toastOptions = {
            {
                success: {
                    style: {
                        background: "#05A677",
                        color: "#fff",
                    },
                },
                info: {
                    style: {
                        background: "#0948B3",
                        color: "#fff",
                    },
                },
                error: {
                    style: {
                        background: "#FA5252",
                        color: "#fff",
                    },
                },
            }
        }
        /> < /
        div >
    );
}
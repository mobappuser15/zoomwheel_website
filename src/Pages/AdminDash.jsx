import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Link,
	useLocation,
	Navigate,
} from "react-router-dom";
import Admin from "./Admin";
import AddVechil from "./AddVechil";
import StoreVechileTable from "./StoreVechileTable";
import ScrollTop from "./../Components/ScrollTop";

const AdminDash = () => {
	return (
		<div className='adminpage' style={{ backgroundColor: "red" }}>
			<Admin />
		</div>
	);
};

export default AdminDash;

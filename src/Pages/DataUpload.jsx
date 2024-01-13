import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ImageUploadData from "./ImageUploadData";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Admin from "./Admin";
import Features from "./Features";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const DataUpload = () => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const uniquekey = searchParams.get("uniquekey");
	const vehOdometer = searchParams.get("vehOdometer");
	const searchParamsodo = new URLSearchParams(location.search);
	const selectkmsvalue = searchParamsodo.get("selectkmsvalue");
	return (
		<div classNmae=''>
			<div class=''>
				<Tabs
					defaultActiveKey='profile1'
					transition={false}
					id='noanim-tab-example'
					variant='pills'
					className='adminbtn1 adm2_top tav_top1'>
					<Tab
						eventKey='profile1'
						title='Image Upload'
						style={{ background: "white", marginTop: "40px" }}>
						<ImageUploadData uniquekey={uniquekey} />{" "}
					</Tab>
					<Tab
						eventKey='contact'
						title='Features'
						style={{ background: "white", marginTop: "70px" }}>
						<Features
							uniquekey={uniquekey}
							selectkmsvalue={selectkmsvalue}
							vehOdometer={vehOdometer}
						/>
					</Tab>
				</Tabs>
			</div>
		</div>
	);
};

export default DataUpload;

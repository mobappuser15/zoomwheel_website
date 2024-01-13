import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./admin.css";
import { Link } from "react-router-dom";
import UploadImageData from "./UploadImageData";
import Buyer from "./Buyer";
import VehicleDoc from "./VehicleDoc";
import ProcurementDoc from "./ProcurementDoc";
import ContactDoc from "./ContactDoc";
import EvalutionImage from "./EvalutionImage";
import FiinalImage from "./FiinalImage";
import NewComponent from "./NewComponent";

const ImageUploadData = ({ uniquekey }) => {
	const [activeTab, setActiveTab] = useState(
		localStorage.getItem("activeTab") || "profile"
	);

	useEffect(() => {
		// Save the active tab to localStorage when it changes
		localStorage.setItem("activeTab", activeTab);
	}, [activeTab]);
	return (
		<div class='row' style={{ margingTop: "10px" }}>
			<div className='col-1' style={{ width: "20px", marginTop: "20px" }}>
				<Link className='backtohomearrow' to='/admin'>
					<ArrowBackIcon style={{ marginRight: "41px", fontSize: "30px" }} />{" "}
				</Link>{" "}
			</div>
			<div className='col-11'>
				<Tabs
					defaultActiveKey='contact5'
					style={{ margingTop: "10px" }}
					transition={false}
					id='noanim-tab-example'
					activeKey={activeTab} // Set the active tab based on state
					onSelect={(key) => setActiveTab(key)} // Update active tab state
					variant='pills'
					className='imageipload mnu2'>
					<Tab
						eventKey='profile'
						title='Seller Documents '
						className='tablisdata tb_htt2'>
						<UploadImageData uniquekey={uniquekey} />
					</Tab>
					<Tab eventKey='contact' title='Buyer Documents'>
						<Buyer uniquekey={uniquekey} />
					</Tab>
					<Tab eventKey='contact1' title='Vehicle Documents'>
						<VehicleDoc uniquekey={uniquekey} />
					</Tab>
					<Tab eventKey='contact2' title='Procurement Document'>
						<ProcurementDoc uniquekey={uniquekey} />
					</Tab>
					<Tab eventKey='contact3' title='Contact Document'>
						<ContactDoc uniquekey={uniquekey} />
					</Tab>
					<Tab eventKey='contact4' title='Evaluation Images'>
						<EvalutionImage uniquekey={uniquekey} />
					</Tab>
					<Tab eventKey='contact5' title='Final Images'>
						<FiinalImage uniquekey={uniquekey} />
					</Tab>
				</Tabs>
			</div>
		</div>
	);
};

export default ImageUploadData;

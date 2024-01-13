import React, { useState, useEffect } from "react";
import "./admin.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
// import { Link } from "react-router-dom";

const BookingForm = ({ uploadData, uniquekey }) => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const uniqueSerial = searchParams.get("uniqueSerial");
	const [name, setname] = useState("");
	const [email, setemail] = useState("");
	const [mobile, setmobile] = useState("");
	const [reg, setreg] = useState("");
	const [grosselling, setgrosselling] = useState();
	const [insurencer, setinsurencer] = useState(0);
	const [rto, setrto] = useState(0);
	const [assistence, setassistence] = useState(0);
	const [addservice, setaddservice] = useState(0);
	const [transfer, settransfer] = useState(0);
	const [cost, setcost] = useState(0);
	const [wranty, setwranty] = useState(0);
	const [maitence, setmaitence] = useState(0);
	const [basicelling, setBasicselling] = useState(0);
	const [bokingamount, setbokingamount] = useState(0);
	const [odometer, setodometer] = useState("");
	const [remark, setremark] = useState("");
	const [result, setResult] = useState("");
	const [total, setTotal] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		setTotal(
			grosselling -
				insurencer -
				rto -
				assistence -
				addservice -
				-transfer -
				cost -
				wranty -
				maitence
		);
	}, [
		insurencer,
		rto,
		assistence,
		addservice,
		transfer,
		cost,
		wranty,
		maitence,
	]);

	const handleTextBox1Change = (event) => {
		const value = event.target.value;
		setgrosselling(value);
	};

	const vechilSubmit = (e) => {
		e.preventDefault();

		if (!grosselling) {
			toast.error(" Gross Selling Price is required");
			return;
		}

		const Datasecond = {
			brandCode: "UC",
			countryCode: "IN",
			uniqueSerial: uniqueSerial,
			companyId: "ZOOMWHEEL",
			loginUserId: "MANJEET",

			loginIpAddress: "7C:46:85:53:E2:33",
			uniqueProspectNo: "0",
			closureTpAgency: "",
			bookingAmount: bokingamount,
			ownerTransferCost: transfer,
			insuRenewalAmount: insurencer,
			accessoriesCost: cost,
			rtoTax: rto,
			warrantyCost: wranty,
			rsaCost: assistence,
			maintainenceCost: maitence,
			vasCost: addservice,
			basicSellingPrice: total,
			grossSellingPrice: grosselling,
			bookingComment: remark,
			loginUserDealerId: "",
			xApplication_Mode: "",
		};
		fetch(
			"https://mobile.Orbitsys.com/OrbitsysSmbApiDemo/UsedCar/SaveUsedCarBookingData",
			{
				method: "POST",
				headers: {
					ApplicationMode: "ONLINE",
					EnvironmentType: "DEMO",
					BrandCode: "UC",
					CountryCode: "IN",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(Datasecond),
			}
		)
			.then((response) => response.json())
			.then((data) => {
				toast.success(data.result);
				navigate("/deleveryhome");
				
			})
			.catch((error) => {
				
				toast.error(error);
				
			});
	};

	return (
		<div>
			<div className=' col-xl-12 bg-black' id='header'>
				<div className='row row-cols-md-2 m-2 p-4 row-cols-lg-2 row-cols-xl-2 font-weight-bold'>
					<span className='text-left text-light '>
						<Link style={{ color: "white", marginLeft: "-10px" }} to='/admin'>
							<ArrowBackIcon
								style={{ marginRight: "41px", fontSize: "30px" }}
							/>
						</Link>{" "}
						Booking Stock
					</span>
				</div>
			</div>
			<form
				id='consultation-form2'
				className='feed-form'
				onSubmit={vechilSubmit}>
				<div className='row'></div>
				<br />
				<div className='row'>
					<div className='col-md-3 col-sm-6 col-xs-12'>
						<label className='labeldelevry'>
							<span style={{ color: "red" }}>*</span> Gross Selling Price
						</label>
						<input
							className='admintextbox'
							required=''
							type='number'
							placeholder='Gross Selling Price'
							
							value={grosselling}
							onChange={(e) => setgrosselling(e.target.value)}
						/>
					</div>
					<div className='col-md-3 col-sm-6 col-xs-12'>
						<label className='labeldelevry'>Insurance Renewal Cost</label>
						<input
							className='admintextbox'
							required=''
							type='number'
							value={insurencer}
							// name='insurencer'
							onChange={(e) => setinsurencer(e.target.value)}
							placeholder='Insurance Renewal Cost'
						/>
					</div>
					<div className='col-md-3 col-sm-6 col-xs-12'>
						<label className='labeldelevry'>RTO Road Tax</label>
						<input
							className='admintextbox'
							required=''
							type='number'
							value={rto}
							onChange={(e) => setrto(e.target.value)}
							placeholder='RTO Road Tax'
						/>
					</div>
					<div className='col-md-3 col-sm-6 col-xs-12'>
						<label className='labeldelevry'>Road Side Assistance Cost</label>
						<input
							className='admintextbox'
							required=''
							type='number'
							value={assistence}
							onChange={(e) => setassistence(e.target.value)}
							placeholder='Road Side Assistance Cost'
						/>
					</div>
				</div>
				<br />

				<div className='row'>
					<div className='col-md-3 col-sm-6 col-xs-12'>
						<label className='labeldelevry'>Value Added Service</label>
						<input
							className='admintextbox'
							required=''
							type='number'
							value={addservice}
							onChange={(e) => setaddservice(e.target.value)}
							placeholder='Value Added Service'
						/>
					</div>

					<div className='col-md-3 col-sm-6 col-xs-12'>
						<label className='labeldelevry'>Owner Transfer Cost</label>
						<input
							className='admintextbox'
							required=''
							type='number'
							value={transfer}
							onChange={(e) => settransfer(e.target.value)}
							placeholder='Owner Transfer Cost'
						/>
					</div>

					<div className='col-md-3 col-sm-6 col-xs-12'>
						<label className='labeldelevry'>Accessories Cost</label>
						<input
							className='admintextbox'
							required=''
							type='number'
							value={cost}
							onChange={(e) => setcost(e.target.value)}
							placeholder='Accessories Cost'
						/>
					</div>

					<div className='col-md-3 col-sm-6 col-xs-12'>
						<label className='labeldelevry'>Warranty Cost</label>
						<input
							className='admintextbox'
							required=''
							type='number'
							value={wranty}
							onChange={(e) => setwranty(e.target.value)}
							placeholder='Warranty Cost'
						/>
					</div>
				</div>
				<br />

				<div className='row'>
					<div className='col-md-3 col-sm-6 col-xs-12'>
						<label className='labeldelevry'>Maintenance Package</label>
						<input
							className='admintextbox'
							required=''
							type='number'
							value={maitence}
							onChange={(e) => setmaitence(e.target.value)}
							placeholder='Maintenance Package'
						/>
					</div>
					<div className='col-md-3 col-sm-6 col-xs-12'>
						<label className='labeldelevry'>Booking Amount</label>
						<input
							className='admintextbox'
							required=''
							type='number'
							name='bokingamount'
							onChange={(e) => setbokingamount(e.target.value)}
							placeholder='Booking Amount'
						/>{" "}
					</div>

					<div className='col-md-3 col-sm-6 col-xs-12'>
						<label className='labeldelevry'>Basic Selling Price</label>
						<input
							className='admintextbox'
							required=''
							type='number'
							// name='basicelling'
							// onChange={(e) => setBasicselling(e.target.value)}
							placeholder='Basic Selling Price'
							value={total || ""}
							readOnly
						/>
					</div>
				</div>

				<br />
				<div className='row'>
					<div className='col-md-3 col-sm-6 col-xs-12'>
						{" "}
						<textarea
							className='admintextbox'
							required=''
							width='70'
							name='remark'
							onChange={(e) => setremark(e.target.value)}
							placeholder='Remarks'
						/>
					</div>
				</div>
				<br />

				<div className='col-md-3 col-sm-6 col-xs-12'>
					{" "}
					<div className=''>
						<button class='admin_submit'>Submit</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default BookingForm;

<div className='row'></div>;

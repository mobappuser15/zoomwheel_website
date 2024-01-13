import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Socalmedial from "./Socalmedial";
import PageScrolltop from "./PageScrolltop";
 
const Insurance = () => {
	const [mobileError, setMobileError] = useState("");
	const [data, setData] = useState([]);
	const [selectedItem, setSelectedItem] = useState("");
	const [codemodel, setcodemodel] = useState("");
	const [model, setModel] = useState([]);
	const [selectmodel, setSelectmodel] = useState("");
	const [codemake, setcodemake] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [mobile, setMobile] = useState("");
	const [comment, setComment] = useState("");
	// make list
	useEffect(() => {
		const url =
			"https://mobile.Orbitsys.com/OrbitsysSmbApiDemo/UsedCar/GetGeneralMaster";
		const headers = {
			ApplicationMode: "ONLINE",
			EnvironmentType: "DEMO",
			BrandCode: "UC",
			CountryCode: "IN",
			"Content-Type": "application/json",
		};
		const data = {
			brandCode: "UC",
			countryCode: "IN",
			companyId: "ZOOMWHEEL",
			calledBy: "MAKE",
			loginUserId: "MANJEET",
			loginIpAddress: "180.151.78.50",
		};
 
		fetch(url, {
			method: "POST",
			headers: headers,
			body: JSON.stringify(data),
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error(
						`Request failed with status code: ${response.status}`
					);
				}
			})
			.then((jsonData) => {
				const generalList = jsonData?.generalMasterList[0].generalList;
				setData(generalList);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);
	// model list
 
	useEffect(() => {
		const url =
			"https://mobile.Orbitsys.com/OrbitsysSmbApiDemo/UsedCar/GetGeneralMaster";
		const headers = {
			ApplicationMode: "ONLINE",
			EnvironmentType: "DEMO",
			BrandCode: "UC",
			CountryCode: "IN",
			"Content-Type": "application/json",
		};
		const data = {
			brandCode: "UC",
			countryCode: "IN",
			companyId: "ZOOMWHEEL",
			calledBy: "MODEL",
			vehMake: codemodel,
 
			loginUserId: "MANJEET",
			loginIpAddress: "180.151.78.50",
		};
 
		fetch(url, {
			method: "POST",
			headers: headers,
			body: JSON.stringify(data),
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error(
						`Request failed with status code: ${response.status}`
					);
				}
			})
			.then((jsonData) => {
				const generalList = jsonData?.generalMasterList[0].generalList;
				setModel(generalList);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [codemodel]);
 
	const handleSelectChange = (event) => {
		setSelectedItem(event.target.value);
		setcodemodel(event.target.value);
	};
	const handleSelectChange3 = (event) => {
		setSelectmodel(event.target.value);
		setcodemake(event.target.value);
	};
 
	const navigate = useNavigate();
	const handleSaveInsurance = (e) => {
		e.preventDefault();
		
 
		const Datasecond = {
			brandCode: "UC",
			countryCode: "IN",
			companyId: "ZOOMWHEEL",
			branchCode: "DEL01",
			custMobile: mobile,
			custEmail: email,
			custName: name,
			brand: selectedItem,
			model: selectmodel,
			remarks: comment,
			loginCompanyID: "ZOOMWHEEL",
			loginUserId: "MANJEET",
			CalledBy: "",
			loginIpAddress: "180.151.78.50",
		};
 
		fetch(
			" https://mobile.orbitsys.com/OrbitsysSmbApiDemo/UsedCar/SaveInsuLead",
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
				navigate("/");
			})
			.catch((error) => {
				// Handle any errors
				toast(error);
				console.error("Error:", error);
			});
	};
 
	// const handleSaveInsurance = (e) => {
	// 	e.preventDefault();
	// 	let formIsValid = true;
	// 	// Validate mobile number
	// 	if (mobile.length !== 10) {
	// 	  setMobileError("Please Enter 10 Digit Phone Number");
	// 	  formIsValid = true;
	// 	} else {
	// 	  setMobileError("");
	// 	}
	// 	// Additional validations for other form fields can be added here
	// 	// Proceed with API call only if the form is valid
	// 	if (formIsValid) {
	// 		const Datasecond = {
	// 			brandCode: "UC",
	// 			countryCode: "IN",
	// 			companyId: "zoomwheel",
				
	// 			branchCode: "DEL01",
	// 			custName: name,
	// 			custMobile: mobile,
	// 			custEmail: email,
				
	// 			brand: selectedItem,
	// 			model: selectmodel,
	// 			remarks: comment,
	// 			loginCompanyID: "zoomwheel",
	// 			loginUserId: "manjeet",
			
	// 			loginIpAddress: "192.168.10.32",
	// 		};
	// 	  fetch(
	// 		"https://mobile.orbitsys.com/OrbitsysSmbApiDemo/UsedCar/SaveInsuLead",
	// 		{
	// 		  method: "POST",
	// 		  headers: {
	// 			ApplicationMode: "ONLINE",
	// 			EnvironmentType: "DEMO",
	// 			BrandCode: "UC",
	// 			CountryCode: "IN",
	// 			"Content-Type": "application/json",
	// 		  },
	// 		  body: JSON.stringify(Datasecond),
	// 		}
	// 	  )
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 		  console.log(data, "response");
	// 		  toast.success(data.result);
	// 		  navigate("/");
	// 		})
	// 		.catch((error) => {
	// 		  // Handle any errors
	// 		  toast.error("An error occurred");
	// 		  console.error("Error:", error);
	// 		});
	// 	} else {
	// 	  // Form is not valid, you can display an error message or take other actions
	// 	  console.log("Form is not valid. Please check the input.");
	// 	}
	//   };

 
	const handleSubmit = () => {
		let formIsValid = true;

		if (!selectedItem) {
			toast.error("Brand is required");
			return;
		}

		if (!selectmodel) {
			toast.error("Model is required");
			return;
		}

		if (mobile.length !== 10) {
			setMobileError(toast.error("Mobile number must be exactly 10 digits"));
			formIsValid = false;
		} else {
			setMobileError("");
		}
	};





	const handleInputChange = (event) => {
		const newValue = event.target.value;
		const numericValue = newValue.replace(/[^0-9]/g, "");
 
		if (numericValue.length <= 10) {
			setMobile(numericValue);
			setMobileError("");
		}
	};
 
 
	
 
	return (
<div>
<PageScrolltop />
<Socalmedial />
<section class='about_top'>
<div class='container'>
<div class='row'>
<h1>Insurance</h1>
</div>
</div>
</section>
 
			<div class='form-bg'>
<div class='container'>
<div class='row'>
<h2></h2>
 
						<div class='col-md-offset-1 col-md-10 col-xs-12'>
<form class='form-horizontal'>
<div class='header'>
Please fill the form and we will get back to you shortly.
</div>
<div class='form-content'>
<div class='row'>
<div class='col-md-6 col-sm-6 col-xs-12 fom_spnn1 '>
<span>Make</span><span style={{ color: "red" }}>*</span>
<select
												id='state'
												value={selectedItem}
												onChange={handleSelectChange}
												class='dropdown dru_dn'>
<option>Select Make</option>
 
												{data.map((item, index) => (
<option key={index} value={item.code}>
														{item.description}
</option>
												))}
</select>
</div>
 
										<div class='col-md-6 col-sm-6 col-xs-12 fom_spnn1 '>
<span>Model </span><span style={{ color: "red" }}>*</span>
 
											<select
												value={selectmodel}
												onChange={handleSelectChange3}
												class='dropdown dru_dn'
												name='user_state'>
<option>Select Model</option>
 
												{model.map((item, index) => (
<option key={index} value={item.code}>
														{item.description}
</option>
												))}
</select>
</div>
<div class='col-md-6 col-sm-6 col-xs-12 fom_spnn1 '>
<span>Name</span>
<input
												class='form-control name dru_dn2'
												id='exampleInputName2'
												placeholder='Please Enter Name'
												type='text'
												name='name'
												onChange={(e) => setName(e.target.value)}
												fdprocessedid='aklfo'></input>
</div>
 
										<div class='col-md-6 col-sm-6 col-xs-12 fom_spnn1 '>
<span>Email</span>
<input
												class='form-control name dru_dn2'
												id='exampleInputName2'
												placeholder=' Please Enter Email'
												type='text'
												name='email'
												onChange={(e) => setEmail(e.target.value)}
												fdprocessedid='aklfo'></input>
</div>
 
										<div class='col-md-6 col-sm-6 col-xs-12 fom_spnn1 '>
<span>Phone No</span><span style={{ color: "red" }}>*</span>
<input
												class='form-control name dru_dn2'
												id='exampleInputName2'
												placeholder=' Please Enter Phone No'
												type='text'
												name='mobile'
												value={mobile}
												onChange={handleInputChange}
></input>
 
												
</div>
 
 
										{/* <div class='col-md-6 col-sm-6 col-xs-12 fom_spnn1 '>
<div class='robo_captcha'>
<div class='captcha_r_text'>
<div class='rot_text'>IA3ST</div>
</div>
<div class='captha_input'>
<input
                                                        class='form-control name dru_dn2'
                                                        type='text'
                                                        name='captcha'
                                                        placeholder='Enter Code'
                                                        value=''
                                                        required=''></input>
<input
                                                        type='hidden'
                                                        name='re_captcha'
                                                        value='IA3ST'></input>
</div>
</div>
</div> */}
 
										<div class='col-md-6 col-sm-6 col-xs-12 fom_spnn1 '>
<span>Remark</span>
<textarea
												class='form-control mes_tx_ara'
												placeholder='Please Enter Remarks...'
												// class='form-control  '
												id='exampleInputName2 w3review'
												// id='w3review'
												name='comment'
												onChange={(e) => setComment(e.target.value)}
												rows='9'
												cols='70'></textarea>
</div>
</div>
</div>
<div class='footer clearfix'>
<button
data-toggle='modal'
													href='#ignismyModal'
										type='button'
										onClick={handleSubmit}
										class='btn btn-default'
										fdprocessedid='3b426l'>
										Request Quote
</button>


{!mobileError && (
													<>
														<div className=''>
															<div className='row'>
																<div
																	className='modal fade'
																	id='ignismyModal'
																	role='dialog'>
																	<div
																		className='modal-dialog mdl_top'
																		style={{ margingTop: "90px" }}>
																		<div className='modal-content'>
																			<div className='modal-header modl_hit'>
																				<button
																					type='button'
																					className='close cls_btn'
																					data-dismiss='modal'
																					aria-label=''>
																					<span>×</span>
																				</button>
																				<hr />
																			</div>

																			<div className='modal-body'>
																				<div className='thank-you-pop'>
																					<img
																						className=''
																						src='http://goactionstations.co.uk/wp-content/uploads/2017/03/Green-Round-Tick.png'
																						alt=''
																					/>

																					<h4
																						className=''
																						style={{
																							marginTop: "10px",
																						}}>
																						Are you sure to raise enquiry?
																					</h4>

																					<p></p>
																					<div className='d-flex flx_mn_btn'>
																						<button
																							onClick={handleSaveInsurance}
																							style={{
																								backgroundColor: "green",

																								color: "white",
																								fontSize: "15px",
																								margin: "5px",
																							}}
																							type='submit'
																							className='btn bt1'
																							data-dismiss='modal'>
																							Yes
																						</button>

																						<button
																							style={{
																								backgroundColor: "#c1272d",

																								color: "white",
																								fontSize: "15px",
																								margin: "5px",
																							}}
																							type='button'
																							className='close bt2'
																							data-dismiss='modal'
																							aria-label=''>
																							No
																						</button>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</>
												)}
</div>



</form>
</div>
</div>
</div>
</div>
 
			<div className='insorence_logo'>
<div class='container'>
<div class='row'>
<div class='insorence_pic'>
<h2>BUYING CAR INSURANCE</h2>
 
							<ul>
<li>
<img class='menu_icon' src='images/car_image/tata.png'></img>
</li>
<li>
<img
										class='menu_icon'
										src='images/car_image/bharti.png'></img>
</li>
<li>
<img class='menu_icon' src='images/car_image/bajaj.png'></img>
</li>
<li>
<img class='menu_icon' src='images/car_image/hdfc.png'></img>
</li>
<li>
<img class='menu_icon' src='images/car_image/iffco.png'></img>
</li>
</ul>
</div>
</div>
</div>
</div>
 
			<Footer />
</div>
	);
};
 
export default Insurance;
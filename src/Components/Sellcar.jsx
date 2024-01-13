import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import "./style.css";
import Footer from "./Footer";
import toast from "react-hot-toast";
import Socalmedial from "./Socalmedial";
import PageScrolltop from "./PageScrolltop";

function Sellcar({ detailspage, setDetailspage }) {
	const [num1, setNum1] = useState(1);
	const [num2, setNum2] = useState(3);
	const [captcha, setCaptcha] = useState("");
	const [result, setResult] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [makedatarequest, setMake] = useState([]);
	const [inputvalue, setInputvalue] = useState("");
	const [selectedValue, setSelectedValue] = useState(null);
	const [searchResults, setSearchResults] = useState([]);
	const [data, setData] = useState([]);
	const [mobile, setmobile] = useState("");
	const [model, setModel] = useState([]);
	const [source, setSource] = useState([]);
	const [typedata, setDatatype] = useState([]);
	const [varient, setVarient] = useState([]);
	const [vyear, setVechileYear] = useState([]);
	const [vmonth, setVechileMonth] = useState([]);
	const [extirecolor, setExtirearColor] = useState([]);
	const [fueldata, setFuelData] = useState([]);
	const [transmission, setTransmission] = useState([]);
	const [name, setname] = useState("");
	const [selectedItem, setSelectedItem] = useState("");
	const [resourcedata, setResoucedata] = useState("");
	const [selecttype, setSelecttype] = useState("");
	const [selectmodel, setSelectmodel] = useState("");
	const [selectfuel, setSelectFuel] = useState("");
	const [selecttransmission, setSelecttransmission] = useState("");
	const [selectextirecolor, setSelectextirecolor] = useState("");
	const [selectmfy, setSelectmfy] = useState("");
	const [selectmfm, setSelectmfm] = useState("");
	const [selectverient, setSelectverient] = useState("");
	const [codemodel, setcodemodel] = useState("");
	const [codemake, setcodemake] = useState("");
	const [odometr, setodometr] = useState("");
	const [regno, setregno] = useState("");
	const [codevarient, setvarientdata] = useState([]);
	const [textInput2, setTextInput2] = useState("");
	const [textInput4, setTextInput4] = useState("");
	const [registration, setregistration] = useState("");
	const [userAnswer, setUserAnswer] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [mobileError, setMobileError] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [captchaError, setCaptchaError] = useState("");
	const [captchaValid, setCaptchaValid] = useState(false);
	const [errors, setErrors] = useState({
		selectedItem: false,
		selectverient: false,
		selectmfy: false,
		selectfuel: false,
		selecttransmission: false,
		selectmodel: false,
		selectextirecolor: false,
		selecttype: false,
		selectmfm: false,
	});

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
	// Lead Type list
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
			calledBy: "LEAD_TYPE",
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
				setDatatype(generalList);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);
	// varient list
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

			calledBy: "VARIANT",
			vehMake: codemodel,
			vehModel: codemake,

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
				setVarient(generalList);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [codemake, codemodel]);
	// year list
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
			calledBy: "MF_YEAR",
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
				setVechileYear(generalList);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);
	// month list
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
			calledBy: "MONTH",
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
				setVechileMonth(generalList);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);
	// fuel list
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
			calledBy: "FUEL",
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
				setFuelData(generalList);
			})
			.catch((error) => {
				toast.error(error);
			});
	}, []);
	//  TRANSMISSION list
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
			calledBy: "TRANSMISSION",
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
				setTransmission(generalList);
			})
			.catch((error) => {
				toast.error(error);
			});
	}, []);
	// extier color list

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
			calledBy: "EXT_COLOR",

			vehMake: codemodel,
			vehModel: codemake,
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
				setExtirearColor(generalList);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [codemodel, codemake]);

	const handleSelectChange = (event) => {
		setSelectedItem(event.target.value);
		setcodemodel(event.target.value);
	};
	const handleSelectChange2 = (event) => {
		setSelecttype(event.target.value);
	};
	const handleSelectChange3 = (event) => {
		setSelectmodel(event.target.value);
		setcodemake(event.target.value);
	};
	const handleSelectChange4 = (event) => {
		setSelectFuel(event.target.value);
	};
	const handleSelectChange5 = (event) => {
		setSelecttransmission(event.target.value);
	};
	const handleSelectChange6 = (event) => {
		setSelectextirecolor(event.target.value);
	};
	const handleSelectChange7 = (event) => {
		setSelectmfy(event.target.value);
	};
	const handleSelectChange8 = (event) => {
		setSelectmfm(event.target.value);
	};
	const handleSelectChange9 = (event) => {
		setSelectverient(event.target.value);
	};
	const navigate = useNavigate();

	

	const handleSaveData = (e) => {
		e.preventDefault();

		// const isFormValid = () => {
		// 	const isValid =
		// 		selectedItem.trim() !== "" &&
		// 		selectverient.trim() !== "" &&
		// 		selectmfy.trim() !== "" &&
		// 		selectmodel.trim() !== "" &&
		// 		selectextirecolor.trim() !== "" &&
		// 		setErrors({
		// 			selectedItem: selectedItem.trim() === "",
		// 			selectverient: selectverient.trim() === "",
		// 			selectmfy: selectmfy.trim() === "",
		// 			selectmodel: selectmodel.trim() === "",
		// 			selectextirecolor: selectextirecolor.trim() === "",
		// 		});

		// 	return isValid;
		// };

		// const isValid = isFormValid();

		// if (isValid) {
		const Datasecond = {
			brandCode: "UC",
			countryCode: "IN",
			companyId: "ZOOMWHEEL",
			branchCode: "DEL01",
			uniqueSerial: "0",
			mobile: mobile,
			email: "",
			mfdMonth: "",
			firstName: name,
			source: "26",
			brand: selectedItem,
			model: selectmodel,
			exteriorColor: selectextirecolor,
			variantCode: selectverient,
			regnFormat: "",
			regnPart1: "",
			regnPart2: "",
			regnPart3: "",
			regnPart4: "",
			vehicleRegnNo: "",
			mfdYear: selectmfy,
			fuel: "",
			regnState: "",
			regnCity: "",
			regn1: registration,
			Kms: odometr,
			loginCompanyID: "ZOOMWHEEL",
			loginUserId: "MANJEET",
			CalledBy: "",
			NOCTYPELIST: [
				{
					ID: "0",
					TYPE: "",
					VALIDUPTO: "",
				},
			],
			loginIpAddress: "180.151.78.50",
		};

		fetch(
			"https://mobile.Orbitsys.com/OrbitsysSmbApiDemo/UsedCar/UpdateBasicInfo",
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
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				toast.success(data.result);
				navigate("/");
			})
			.catch((error) => {
				// Handle API request error
				toast.error("Error in API request. Please try again.");
				
			});
	};

	const handleHomeClick = () => {
		setDetailspage(false);
	};

	const handleInputChangeReg = (event) => {
		let inputValue = event.target.value;

		if (inputValue.length <= 6) {
			setregistration(inputValue.toUpperCase());
		}
	};

	const handleInputChange = (event) => {
		const newValue = event.target.value;
		const numericValue = newValue.replace(/[^0-9]/g, "");

		if (numericValue.length <= 10) {
			setmobile(numericValue);
		}
	};


	const handleInputChangereg = (event) => {
		let inputValue = event.target.value;

		inputValue = inputValue.replace(/\D/g, "");

		if (inputValue.length <= 4) {
			setTextInput4(inputValue);
		}
	};


	

	const handleSubmit = () => {
		let formIsValid = true;

		if (mobile.length !== 10) {
			setMobileError(toast.error("Mobile number must be exactly 10 digits"));
			formIsValid = false;
		} else {
			setMobileError("");
		}
	};

	return (
		<>
			<PageScrolltop />
			<Socalmedial />
			<section class='about_top'>
				<div class='container'>
					<div class='row'>
						<h1>Sell Your Vehicle</h1>
					</div>
				</div>
			</section>

			<div class='submit_mn'>
				<div class='container'>
					<div class='row'>
						{/* <div class='col-md-12'>

						
						<div class='sell_car_tx'>

						<div class='submit_tx'>
								
								<h1>TRULY VALUES YOUR CAR</h1>

								<p>
									Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
									Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
									natoque penatibus et magnis.
								</p>
							</div>

						<img src='images/sell_car_bg.png'></img>

						
						</div>
						</div> */}

						{/* <div class='col-md-7 cp_fm_pic'>
							<img src='images/fm_cr.jpg'></img>
						</div> */}


					
						<div class='form-bg'>
							<div class='container'>
								<div class='row'>
									<div class='col-md-offset-1 col-md-10 col-xs-12'>
										<form class='form-horizontal'>
											<div class='header'>Add Your Vehicle Details</div>
											<div class='form-content'>
												<div class='row'>
													<div class='col-md-6 col-sm-6 col-xs-12 fom_spnn1 '>
														<span>Brand</span>
														
														<select
															id='state'
															value={selectedItem}
															onChange={handleSelectChange}
															class='dropdown dru_dn'>
															<option>Select Brand</option>

															{data.map((item, index) => (
																<option key={index} value={item.code}>
																	{item.description}
																</option>
															))}
														</select>

														{errors.selectedItem && (
															<span style={{ color: "red" }}>
																Please Select Brand
															</span>
														)}
													</div>

													<div class='col-md-6 col-sm-6 col-xs-12 fom_spnn1 '>
														<span>Model </span>
														

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

														{errors.selectmodel && (
															<span style={{ color: "red" }}>
																Please Select Model
															</span>
														)}
													</div>

													<div class='col-md-6 col-sm-6 col-xs-12 fom_spnn1 '>
														<span>Variant </span>
														

														<select
															value={selectverient}
															onChange={handleSelectChange9}
															class='dropdown dru_dn'
															name='user_state'>
															<option>Select Variant</option>

															{varient.map((item, index) => (
																<option key={index} value={item.code}>
																	{item.description}
																</option>
															))}
														</select>

														{errors.selectverient && (
															<span style={{ color: "red" }}>
																Please Select Variant
															</span>
														)}
													</div>

													{/* <div class='col-md-6 col-sm-6 col-xs-12 fom_spnn1 '>
														<span>Exterior Color </span>
														<span style={{ color: "red", fontSize: "20px" }}>
															*
														</span>

														<select
															value={selectextirecolor}
															onChange={handleSelectChange6}
															class='dropdown dru_dn'
															name='user_state'>
															<option>Select Exterior Color</option>

															{extirecolor.map((item, index) => (
																<option key={index} value={item.code}>
																	{item.description}
																</option>
															))}
														</select>

														{errors.selectextirecolor && (
															<span style={{ color: "red" }}>
																Please Select Exterior Color
															</span>
														)}
													</div> */}

													<div class='col-md-6 col-sm-6 col-xs-12 fom_spnn1 '>
														<span>Year </span>
														{/* <span style={{ color: "red", fontSize: "20px" }}>
															*
														</span> */}

														<select
															value={selectmfy}
															onChange={handleSelectChange7}
															class='dropdown dru_dn'>
															<option>Select Year</option>

															{vyear.map((item, index) => (
																<option key={index} value={item.code}>
																	{item.description}
																</option>
															))}
														</select>

														{errors.selectmfy && (
															<span style={{ color: "red" }}>
																Please Select Year
															</span>
														)}
													</div>

													<div class='col-md-6 col-sm-6 col-xs-12 fom_spnn1 '>
														<span>KMs Driven</span>
														{/* <span style={{ color: "red", fontSize: "20px" }}>
															*
														</span> */}
														<input
															class='form-control name dru_dn2'
															id='exampleInputName2'
															placeholder='KMs Driven'
															type='text'
															name='odometr'
															onChange={(e) => setodometr(e.target.value)}
															fdprocessedid='aklfo'></input>
													</div>

													<div class='col-md-6 col-sm-6 col-xs-12 fom_spnn1 '>
														<span>Customer Name</span>
														<input
															class='form-control name dru_dn2'
															id='exampleInputName2'
															placeholder='Customer Name'
															type='text'
															name='name'
															onChange={(e) => setname(e.target.value)}
															fdprocessedid='aklfo'></input>
													</div>

													<div class='col-md-6 col-sm-6 col-xs-12 fom_spnn1 '>
														<span>Contact No.</span>
														<span style={{ color: "red", fontSize: "20px" }}>
															*
														</span>
														<input
															class='form-control name dru_dn2'
															placeholder='Contact No.'
															type='text'
															value={mobile}
															name='mobile'
															onChange={handleInputChange}></input>
														
													</div>

													<div class='col-md-6 col-sm-6 col-xs-12 fom_spnn1 '>
														<span>Registration No </span>
														
														
														<input
															class='form-control name dru_dn2'
															id='exampleInputName2'
															placeholder='Registration No'
															type='text'
															value={registration}
															onChange={handleInputChangeReg}
															fdprocessedid='aklfo'></input>
													</div>

												</div>
											</div>
											<div class='footer clearfix'>
												<button
													type='button'
													data-toggle='modal'
													href='#ignismyModal'
													onClick={handleSubmit}
													class='btn btn-default'
													fdprocessedid='3b426l'>
													Send
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
																							onClick={handleSaveData}
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
					</div>
				</div>
			</div>

			<div class='customer_mn2'>
				<div class='container'>
					<div class='row'>
						<div class='col-md-3 col-sm-6'>
							
								<div class='serviceBox2'>
									<div class='service-icon'>
										<img className='sel_car_icon' src='/images/sl1.png'></img>
									</div>
									<h3 class='title'>
										BEST PRICE <br></br>GUARANTEE
									</h3>
								</div>
							
						</div>

						<div class='col-md-3 col-sm-6'>
							
								<div class='serviceBox2'>
									<div class='service-icon'>
										<img className='sel_car_icon' src='/images/sl2.png'></img>
									</div>
									<h3 class='title'>
										INSTANT <br></br>PAYMENT
									</h3>
								</div>
							
						</div>

						<div class='col-md-3 col-sm-6'>
							
								<div class='serviceBox2'>
									<div class='service-icon'>
										<img className='sel_car_icon' src='/images/rental-car.png'></img>
									</div>
									<h3 class='title'>
										SELL CAR IN A <br></br>SINGLE VISIT
									</h3>
								</div>
							
						</div>

						<div class='col-md-3 col-sm-6'>
							
								<div class='serviceBox2'>
									<div class='service-icon'>
										<img className='sel_car_icon' src='/images/sl4.png'></img>
									</div>
									<h3 class='title'>
										FREE RC <br></br>TRANSFER
									</h3>
								</div>
							
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
}

export default Sellcar;

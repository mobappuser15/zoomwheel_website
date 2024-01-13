import React, { useEffect, useState } from "react";

import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Socalmedial from "./Socalmedial";
import PageScrolltop from "./PageScrolltop";

const AutoLoan = () => {

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
			custEmail: "",
			custName: name,
			brand: "KIA",
			model: "Carens",
			leadType:"FINANCE",
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
 


 
	const handleSubmit = () => {
		let formIsValid = true;

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
      <section class="about_top"><div class="container"><div class="row"><h1>Easy Car Finance</h1></div></div></section>



      <div className='insorence_logo'>
				<div class='container'>
					<div class='row'>

					<div class='view_btn2 example-2'>
					<Link to='/Calculatoremi'> EMI Calculator</Link>
									</div>
				

	



<div class='lon_tex'>
<h2>Contact us for</h2>

<ul>
	<li><span class="fa fa-circle"></span> Auto Loan for <b className='spn_clr'>Used Car </b></li>
	
	<li><span class="fa fa-circle"></span> <b className='spn_clr'> Refinance</b> on existing Auto Loan</li>
</ul>

</div>



<div class='form-bg'>
<div class='container'>
<div class='row'>

 
						<div class='col-md-offset-1 col-md-10 col-xs-12'>
<form class='form-horizontal'>
<div class='header'>
Please fill the form and we will get back to you shortly.
</div>
<div class='form-content'>
<div class='row'>

 
									
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
<span>Phone No</span><span style={{ color: "red", fontSize: "20px" }}>
															*
														</span>
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
 
 
 
										<div class='col-md-6 col-sm-6 col-xs-12 fom_spnn1 '>
<span>State/City</span>
<textarea
												class='form-control mes_tx_ara'
												placeholder='State/City'
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
													</>)}
												
</div>



</form>
</div>
</div>
</div>
</div>





						<div class='insorence_pic'>
							<h2>WITH THE RESPECTIVE BANKS</h2>

							<ul>
								<li>
									<img class='menu_icon' src='images/car_image/hdfc-loan.png'></img>
								</li>
								<li>
									<img
										class='menu_icon'
										src='images/car_image/icici.png'></img>
								</li>
								<li>
									<img class='menu_icon' src='images/car_image/bajaj-finance.png'></img>
								</li>
								<li>
									<img class='menu_icon' src='images/car_image/citi-bank.png'></img>
								</li>
								<li>
									<img class='menu_icon' src='images/car_image/kotak.png'></img>
								</li>
                                <li>
									<img class='menu_icon' src='images/car_image/bob.png'></img>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<Footer />

    </div>
  )
}

export default AutoLoan

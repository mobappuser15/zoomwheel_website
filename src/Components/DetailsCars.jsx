import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Carousel from "react-elastic-carousel";
import toast from "react-hot-toast";
import Footer from "./Footer";
import Socalmedial from "./Socalmedial";
import PageScrolltop from "./PageScrolltop";
const breakPoints = [
	{ width: 1, itemsToShow: 1 },
	{ width: 550, itemsToShow: 1, itemsToScroll: 2 },
	{ width: 768, itemsToShow: 1 },
	{ width: 1200, itemsToShow: 1 },
];
 
const breakPoint12 = [
	{ width: 1, itemsToShow: 1 },
	{ width: 550, itemsToShow: 2, itemsToScroll: 2 },
	{ width: 768, itemsToShow: 5 },
	{ width: 1200, itemsToShow: 5 },
];
 
const breakPointss = [
	{ width: 768, itemsToShow: 2 },
	{ width: 1200, itemsToShow: 2 },
];
 
const DetailsCars = () => {
	const { uniquekey, vehOdometer } = useParams();
	// console.log(JSON.stringify(product), "useParams");
	const [statelist, setStateList] = useState([]);
	const [selectedstate, setSelectedstate] = useState("");
 
	const [selectedImageIndex, setSelectedImageIndex] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [stockdata, setStockdata] = useState([]);
	const [email, setemail] = useState("");
	const [mobile, setmobile] = useState("");
	const [contactName, setcontactName] = useState("");
	const [pincode, setpincode] = useState("");
	const [selectedImage, setSelectedImage] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [num1, setNum1] = useState(Math.floor(Math.random() * 10));
	const [num2, setNum2] = useState(Math.floor(Math.random() * 10));
	const [userAnswer, setUserAnswer] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [changeimage, setchangeimage] = useState();
	const [zoom, setZoom] = useState(0);
	const [mobileError, setMobileError] = useState("");
	const [pincodeError, setPincodeError] = useState("");
	const [captchaError, setCaptchaError] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [captchaValid, setCaptchaValid] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [fomshow, setformshow] = useState(false);
	console.log(captchaError,"error");
 
	const showform = () => {
		setformshow(!fomshow);
	};
 
 
	// state list api
 
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
			companyId: "CARZ",
			calledBy: "STATE",
 
			loginUserId: "MANISH",
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
				const generalList = jsonData.generalMasterList[0].generalList;
				setStateList(generalList);
			})
			.catch((error) => {});
	}, []);
 
	const handleSelectChange11 = (event) => {
		setSelectedstate(event.target.value);
	};
 
	useEffect(() => {
		const fetchData = async () => {
			const url =
				"https://mobile.orbitsys.com/OrbitsysSmbApiDemo/UsedCar/GetUsedCarVehStockDetail";
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
				budgetFrom: 0,
				budgetTo: 0,
				vehBrandCode: "",
				vehModelCode: "",
				vehFuel: "",
				loginCompanyID: "ORBIT",
				loginUserId: "MANJEET",
				loginIpAddress: "192.168.10.32",
			};
 
			try {
				const response = await fetch(url, {
					method: "POST",
					headers: headers,
					body: JSON.stringify(data),
				});
 
				if (response.ok) {
					const responseData = await response.json();
					console.log(responseData, "responseData");
					responseData.UsedCarVehStockDetail.map((item) => {
						item.uniqueSerial == uniquekey && setStockdata(item);
					});
				} else {
					throw new Error(
						`Request failed with status code: ${response.status}`()
					);
				}
			} catch (error) {
				console.error("Error:", error);
			}
		};
 
		fetchData();
	}, []);
	// console.log(stockdata.modelImages, "stockdatakkk [0]");
 
	const generateNumbers = () => {
		setNum1(Math.floor(Math.random() * 10));
		setNum2(Math.floor(Math.random() * 10));
	};
 
	const resetCaptcha = () => {
		setNum1(Math.floor(Math.random() * 10));
		setNum2(Math.floor(Math.random() * 10));
		setUserAnswer("");
		setCaptchaValid(false); // Clear captcha validation
	};
 
	const handleSubmit = (e) => {
		e.preventDefault();
		let formIsValid = true;

		if (parseInt(userAnswer) !== num1 + num2) {
			setCaptchaError(toast.error("Captcha answer is incorrect"));
			formIsValid = false;
		} else {
			setCaptchaError("");
			setCaptchaValid(true);
		}
 
		if (mobile.length !== 10) {
			setMobileError(toast.error("Please Enter 10 Digit Phone Number"));
			formIsValid = false;
		} else {
			setMobileError("");
		}
		
 
		if (formIsValid && captchaValid) {
			setModalOpen(true);
		}
	};
 
	const handleImageClick = (image) => {
		setIsModalOpen(image);
	};
 
	const closeModal = () => {
		setSelectedImage(null);
		setModalOpen(false);
	};
 
	const navigate = useNavigate();
 
	const reloadPage = () => {
		window.location.reload();
	};
 
	const HandleDataSave = (e) => {
		e.preventDefault();
 
		const Datasecond = {
			brandCode: "UC",
			countryCode: "IN",
			companyId: "ZOOMWHEEL",
			branchCode: "DEL01",
			prospectLocation: "DEL01",
			title: "",
			entity: "I",
			firstName: contactName,
			middleName: "",
			LastName: "",
			suffix: "",
			regnState: selectedstate,
			regnCity: "",
			pincode: pincode,
			email: email,
			contactName: contactName,
			mobile: mobile,
			assembly: "CKD",
			edition: "STD",
			source: "",
			usage: "02",
			refFrom: "10",
			firstAction: "",
			actionDate: "2020-11-10",
			actionComment: "Test",
			campaign: 0,
			dealerCompanyDocket: "0",
			corporateFlag: "N",
			dealType: "OEM_SELECT",
			approveFlag: "N",
			corporateComment: "",
			salesperson: "E10001", //API - create method to be implemented
			projectedClosureDate: "2020-11-15",
			hour: "2020-11-10T14:57:54.853Z",
			demoVehModel: stockdata.vehModelCode,
			demoVehVariant: stockdata.vehVariantCode,
			demoVehChassisNo: "",
			make: stockdata.vehBrandCode, //stock API make 1  ------   make
			subModel: stockdata.vehVariantCode, //stock API submodel 2  ----- varient
			model: stockdata.vehModelCode, //stock API mode 3     ---- model
			qty: 1,
			color: stockdata.exteriorColor, //stock API make exterior color 4
			interiorColor: "STD",
			style: "STD",
			my: stockdata.vehManufactureYear,
			vy: stockdata.vehManufactureYear,
			ActiveRate: "HOT",
			userId: "MANJEET",
			slotMins: "2020-11-10T14:30:00.853Z",
			slotCount: 1,
			valueString:
				"CUST_JOB_TYPE,SALARIED;PUR_INTENTION,LESS_THAN_2W;COMP_MODELS,AUDIA3;",
			testDriveZone: "GGN",
			teamCode: "A",
			createIP: "7C:46:85:53:E2:33",
		};
 
		fetch(
			"https://mobile.orbitsys.com/OrbitsysSmbApiDemo/Prospect/SaveNewProspect",
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
			.catch((error) => {});
		closeModal();
	};
 
	const handleInputChange = (event) => {
		const newValue = event.target.value;
		const numericValue = newValue.replace(/[^0-9]/g, "");
 
		if (numericValue.length <= 10) {
			setmobile(numericValue);
			setMobileError("");
		}
	};
 
	const handleInputChange1 = (event) => {
		const newValue1 = event.target.value;
		const numericValue1 = newValue1.replace(/[^0-9]/g, "");
 
		if (numericValue1.length <= 6) {
			setpincode(numericValue1);
			setMobileError("");
			setPincodeError("");
		}
	};
 
	// const Props = localStorage.getItem("homepagedata");
	// const PropsData = JSON.parse(Props);
 
	// const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
	// 	`Hi ZOOMWHEEL Gallery, I want to know more about  ${window.location.href}`
	// )}`;
 
	// const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
	// 	`Hi ZOOMWHEEL Gallery, I want to know more about the ${PropsData.year} ${PropsData.brand} ${PropsData.model}. Check it out: ${window.location.href}`
	// )}`;
 
	const isMobile =
		/iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		);
 
	let whatsappLink;
	if (isMobile) {
		// Mobile device
		whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
			`Hi Zoomwheels, I am interested in your listing for Brand: ${stockdata.vehBrandCode} Model: ${stockdata.vehModelCode} Fuel: ${stockdata.vehFuelCode} Registration No: ${stockdata.VehRegn1}- ${stockdata.VehRegn2
			}  Kms Driven : ${stockdata.vehOdometer}    
			
			${window.location.href}`
	)}`;
	} else {
		// Desktop
		whatsappLink = `https://web.whatsapp.com/send?text=${encodeURIComponent(
			`Hi Zoomwheels, I am interested in your listing for  Brand: ${stockdata.vehBrandCode} Model: ${stockdata.vehModelCode} Fuel: ${stockdata.vehFuelCode} Registration No: ${stockdata.VehRegn1
			}- ${stockdata.VehRegn2
			} Kms Driven : ${stockdata.vehOdometer}    ${window.location.href}`
	)}`;
	}
 
	return (
<div>
<PageScrolltop />
<Socalmedial />
 
			<section class='about_top'>
<div class='container'>
<div class='row'>
<h1>Details</h1>
</div>
</div>
</section>
 
			<div class='slider_lar_mn'>
<div class='container'>
<div class='row'>
<div
							class='col-md-8 col-sm-12 col-xs-12'
							style={{ marginTop: "30px" }}>
<div className='carousel-wrapper cor_mn'>
								{/* top Slider */}
								<Carousel breakPoints={breakPoints}>
  {stockdata.modelImages && stockdata.modelImages.length > 0 ? (
    stockdata.modelImages.map((item, index) => (
      <div key={item.uniqueSerial}>
        <a
          id='slider_img'
          className='' // Use className instead of class
          data-toggle='modal'
          data-title={item.uri}
          data-target='#image-gallery'
        >
          <img
            className='card slid_larg'
            src={item.uri !== 0 ? item.uri : 'images/logo/defaultimag.png'}
            onClick={(e) => {
              setZoom(index);
            }}
            alt='Another alt text'
            style={{
              aspectRatio: '4/4',
              height: '539px',
              width: '644px',
            }}
          />
        </a>
      </div>
    ))
  ) : (
	<>



	
    <img
            className='card slid_larg'
            src= 'images/logo/defaulimag.png'
            
            alt='Another alt text'
            style={{
              aspectRatio: '4/4',
              height: '539px',
              width: '644px',
            }}
          />
		  </> 
  )}
</Carousel>

 
								<div class='row'>
<div
										class='modal fade bac_bg_clr '
										id='image-gallery'
										tabindex='-1'
										role='dialog'
										aria-labelledby='myModalLabel'
										aria-hidden='true'>
<div class='modal-dialog modal-lg mdl_wd'>
<div class='modal-content bdl_cl_non'>
<div class='modal-header hd_pd2'>
<h4 class='modal-title' id='image-gallery-title'></h4>
<button
														type='button'
														class='close cls_btn'
														data-dismiss='modal'>
<span aria-hidden='true'>×</span>
<span class='sr-only'>Close</span>
</button>
</div>
 
												<section className='b-slider'>
<div
														id='carouselExampleFade'
														class='carousel slide carousel-fade'
														data-bs-ride='carousel'>
<Carousel breakPointss={breakPointss}>
															{stockdata.modelImages &&
																stockdata.modelImages.map((item, i) => (
<div
																		className={"carousel-item md_pic active"}
																		key={item.uniqueSerial}>
																		{zoom != 0 ? (
<>
<img
																					src={[zoom].uri}
																					alt='...'
																					className=''
																				/>
<>{setZoom(0)}</>
</>
																		) : (
<>
<img
																					src={item.uri}
																					alt='...'
																					className=''
																				/>
</>
																		)}
</div>
																))}
</Carousel>
</div>
</section>
</div>
</div>
</div>
</div>
								{/* bottom Slider */}
								
</div>{" "}
<div class=''></div>{" "}
							
</div>
 
						<div class='col-md-4 col-sm-12 col-xs-12'>
							
 
							<form class='form-horizontal hd_tx_mn'>
<div class='header hd_tx_fm'>INQUIRE ABOUT THIS VEHICLE</div>
<div class='form-content fm_ftr_pdg'>
<div class='row'>
<div class='col-md-12 col-xs-12 fom_spnn1 '>
<span>Name</span>
<input
												class='form-control name dru_dn3'
												id='exampleInputName1'
												name='contactName'
												onChange={(e) => setcontactName(e.target.value)}
												placeholder='Please Enter Name'
												type='text'
												fdprocessedid='aklfo'></input>
</div>
 
										
 
										<div class='col-md-12 col-xs-12 fom_spnn1 '>
<span>Phone No.</span><span style={{ color: "red", fontSize: "20px" }}>
											*
</span>
<input
												class='form-control name dru_dn3'
												id='exampleInputName4'
												type='text'
												placeholder='Please Enter Phone No.'
												name='mobile'
												value={mobile}
												onChange={handleInputChange}
												fdprocessedid='aklfo'></input>
												
</div>
 
										
 
										
										<div class='col-md-12 col-sm-12 col-xs-12 fom_spnn1 '>
<span>State </span>

 
														<select
														value={selectedstate}
														onChange={handleSelectChange11}
															class='dropdown dru_dn'>
<option>State </option>
 
															{statelist.map((item, index) => (
<option key={index} value={item.code}>
																{item.description}
</option>
																))}
</select>
 
													
</div>
 
 
										
 
										
<div class='col-md-12 col-xs-12 fom_spnn1 '>
<form>
<span
													className=''
													style={{
														fontWeight: "600",
														marginTop: "0",
														height: "15px",
														color: "green",
													}}>
<span
														style={{
															fontSize: "25px",
															marginLeft: "5px",
															marginTop: "0px",
															color: "red",
															fontWeight: "800px ",
														}}>
														{num1} + {num2} = ?
</span>
<i
														style={{
															marginLeft: "15px",
															marginTop: "0px",
															fontSize: "19px",
														}}
														onClick={resetCaptcha}
														class='fa fa-refresh fa-2x'
														aria-hidden='true'></i>
</span>
 
												<label
													style={{
														color: "black",
														marginTop: "10px",
													}}></label>
<div className='' style={{ marginTop: "0px" }}>
<span>Captcha </span>
<input
														className='form-control name'
														placeholder='Please Enter Captcha'
													type="text"
														value={userAnswer}
														onChange={(event) =>
															setUserAnswer(event.target.value)
														}></input>
</div>
</form>
</div>

 
										{/* popup message */}
										{!mobileError && captchaValid && (
<div className=''>
<div className='row'>
<div style={{ marginTop: "160px" }}
														className='modal fade'
														id='ignismyModal'
														role='dialog'>
<div
															className='modal-dialog mod_top_spc'
															style={{ marginTop: "90px" }}>
<div className='modal-content'>
<div className='modal-header mdl_hd'>
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
																			style={{
																				width: "50px",
																			}}
																			src='http://goactionstations.co.uk/wp-content/uploads/2017/03/Green-Round-Tick.png'
																			alt=''
																		/>
<h4
																			style={{
																				marginTop: "10px",
																			}}>
																			Are you sure to raise enquiry?
</h4>
<p></p>
<div className='d-flex flx_mn_btn '>
<button
																				onClick={HandleDataSave}
																				style={{
																					backgroundColor: "green",
																					width: "60px",
																					color: "white",
																					fontSize: "15px",
																					margin: "5px",
																				}}
																				type='submit'
																				className='btn'
																				data-dismiss='modal'>
																				Yes
</button>
 
																			<button
																				style={{
																					backgroundColor: "#c1272d",
 
																					width: "60px",
																					color: "white",
																					fontSize: "15px",
																					margin: "5px",
																				}}
																				type='button'
																				className='close no_btn'
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
										)}
</div>
</div>
 
								<button
									type='submit'
									// onClick={HandleDataSave}
 
									data-toggle='modal'
																onClick={handleSubmit}
																href='#ignismyModal'
									class='btn btn-default btn_dtl'
									fdprocessedid='3b426l'>
									Raise Enquiry
</button>
</form>
</div>
</div>
</div>
 
				<div class='container'>
<div class='detl_mn'>
<a href={whatsappLink} target='_blank'>
<i id='whatsup_icon' class='fa fa-whatsapp fa-2x'>
								{" "}
</i>
</a>
 
						<h3>DESCRIPTION </h3>
 
						<ul>
<li>
<img class='dt_icn' src='images/car_image/i1.png'></img>
<h4 class='b-detail__main-aside-desc-title'>Make</h4>
 
								<p class='b-detail__main-aside-desc-value'>
									{stockdata.vehBrandCode}
</p>
</li>
 
							<li>
<img class='dt_icn' src='images/car_image/calendar.png'></img>
<h4 class='b-detail__main-aside-desc-title'>Model</h4>
<p class='b-detail__main-aside-desc-value'>
									{stockdata.vehModelCode}
</p>
</li>
 
							<li>
<img
									class='dt_icn'
									src='images/car_image/gasoline-pump.png'></img>
<h4 class='b-detail__main-aside-desc-title'>Fuel </h4>
<p class='b-detail__main-aside-desc-value'>
									{stockdata.vehFuelCode}
</p>
</li>
 
							<li>
<img
									class='dt_icn2'
									src='images/car_image/classification.png'></img>
<h4 class='b-detail__main-aside-desc-title'>Variant </h4>
<p class='b-detail__main-aside-desc-value'>
									{stockdata.vehVariantCode}
</p>
</li>
 
						
 
							<li className="prs_mn4">
<img class='dt_icn' src='images/car_image/rupee.png'></img>
<h4 class='b-detail__main-aside-desc-title'>Price </h4>
<p class='b-detail__main-aside-desc-value'>
									{stockdata.vehSellPriceRecommended}
</p>
</li>
 
							<li>
<img class='dt_icn' src='images/car_image/gearbox.png'></img>
<h4 class='b-detail__main-aside-desc-title'>Transmission</h4>
<p class='b-detail__main-aside-desc-value'>
									{stockdata.transmissionDesc}
</p>
</li>
 
							<li>
<img class='dt_icn' src='images/car_image/km.png'></img>
<h4 class='b-detail__main-aside-desc-title'>KMs Driven</h4>
<p class='b-detail__main-aside-desc-value'>
									{stockdata.vehOdometer} KM
</p>
</li>
 
							<li>
<img class='dt_icn' src='images/car_image/calendar1.png'></img>
<h4 class='b-detail__main-aside-desc-title'>
									 Year
</h4>
<p class='b-detail__main-aside-desc-value'>
									{stockdata.vehManufactureYear}
</p>
</li>
 
							<li>
<img
									class='dt_icn'
									src='images/car_image/registration.png'></img>
<h4 class='b-detail__main-aside-desc-title'>
									Registration
</h4>
<p class='b-detail__main-aside-desc-value'>
									{stockdata.VehRegn1}
</p>
</li>
 
 
							<li>
<img
									class='dt_icn'
									src='images/car_image/deal.png'></img>
<h4 class='b-detail__main-aside-desc-title'>
								Ownership
</h4>
<p class='b-detail__main-aside-desc-value'>
									{stockdata.vehOwnerSerial}
</p>
</li>
 
						</ul>
</div>
</div>


<div className="container">
	<div className="detl_mn4">
	




<div className="lis_ver">
<h3>Features</h3>
<ul>
{stockdata.modelImages &&
																stockdata.vehFeatures.map((item, i) => (
																	
																	<li>

<i class="fa fa-fw" ></i> 
{item.description}
								
</li>
																))}
	






</ul>
</div>					




	
	<div className="lis_ver">
	<h3>Remarks</h3>
	<ul>
<li>

 {stockdata.comment}
								
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
 
export default DetailsCars;
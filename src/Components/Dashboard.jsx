import React, { useState, useEffect, useRef } from "react";
// import Slider from "react-slider";
// import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import Slider from "@mui/material/Slider";
import "./responsive.css";
import "./style.css";
import MultiRangeSlider from "multi-range-slider-react";
import ReactLoading from "react-loading";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Carousel from "react-elastic-carousel";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Socalmedial from "./Socalmedial";

const MIN = 50000;
const MAX = 6000000;
const minDistance = 10;

const breakPoints = [
	{ width: 1, itemsToShow: 1 },
	{ width: 550, itemsToShow: 2, itemsToScroll: 2 },
	{ width: 768, itemsToShow: 3 },
	{ width: 1200, itemsToShow: 3 },
];

const Dashboard = () => {
	const minValue = 50000;
	const maxValue = 6000000;
	const [min, setMin] = useState(minValue);
	const [max, setMax] = useState(maxValue);
	const [value, setValue] = useState([minValue, maxValue]);
	const [stockdata, setStockdata] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [searchResults, setSearchResults] = useState([]);
	const [demo, setDemo] = useState([]);
	const [data, setData] = useState([]);
	const [selectedItem, setSelectedItem] = useState("");
	const [minRange, setMinRange] = useState("");
	const [maxRange, setMaxRange] = useState("");
	const [showdata, setShowdata] = useState(false);
	const [inputvalue, setInputvalue] = useState("");
	const [methu, setMethu] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const [prizevalue, setprizevalue] = useState([MIN, MAX]);
	const [currentpage, setCurrentPage] = useState(1);
	const [exculsive, setExculsive] = useState([]);
	var [homepage, setHomepage] = useState(false);
	// const [minValue, setminValue] = useState(0);
	// const [maxValue, setmaxValue] = useState(6000000);
	const [sliderValue, setSliderValue] = useState([130, 250]);
	const itemsperpage = 15;
	const totalItems = demo.length;

	const totalPage = Math.ceil(totalItems / itemsperpage);
	const handleSliderChange = (value) => {
		setSliderValue(value);
	};
	const onPageChange = (page) => {
		setCurrentPage(page);
	};

	const Startindex = (currentpage - 1) * itemsperpage;
	const EndIndex = Startindex + itemsperpage;
	var currentData = stockdata.slice(Startindex, EndIndex);
	const vidRef = useRef();

	// useEffect(() => {
	// 	vidRef.current.play();
	// }, []);

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
	// All Stock Show
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

					setStockdata(responseData?.UsedCarVehStockDetail);
					setDemo(responseData?.UsedCarVehStockDetail);
					setExculsive(responseData?.UsedCarVehStockDetail);
					setMethu(responseData?.UsedCarVehStockDetail);

					setSearchResults(responseData?.UsedCarVehStockDetail);
				} else {
					throw new Error(
						`Request failed with status code: ${response.status}`
					);
				}
			} catch (error) {
				console.error("Error:", error);
			}
		};

		fetchData();
	}, []);
	
	const navigate = useNavigate();

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
			budgetFrom: min,
			budgetTo: max,
			vehBrandCode: "",
			vehModelCode: "",
			vehVariantDesc: "",
			vehFuel: "",
			loginCompanyID: "ORBIT",
			loginUserId: "",
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
				setSearchResults(responseData?.UsedCarVehStockDetail);
				setStockdata(responseData?.UsedCarVehStockDetail);
				setDemo(responseData?.UsedCarVehStockDetail);
				setShowdata(responseData?.UsedCarVehStockDetail);
			} else {
				throw new Error(`Request failed with status code: ${response.status}`);
			}
		} catch (error) {
			console.error("Data not found", error);
		}
	};

	const handleSaveData = (e) => {
		e.preventDefault();
		fetchData();
		searchResults.map((item) => console.log("uniqueserial"));
	};

	const reloadPage = () => {
		window.location.reload(false);
	};

	const reset = (currentData) => {
		setShowdata(true);
		setSelectedItem("");
		// setSelectmodel("");

		setStockdata(methu);
	};

	const handleHomeClick = () => {
		// setDetailspage(false);
	};

	const singleProducthandle = (uniqueSerial, vehOdometer) => {
		const product = stockdata.find(
			(item) => item.uniqueSerial === uniqueSerial,
			(item) => item.vehOdometer === vehOdometer
		);

		localStorage.setItem("cardetails", JSON.stringify(product));

		setSelectedProduct(product);
		navigate(`/carsdetails/${product.uniqueSerial}/${product.vehOdometer}`);

		// setDetailspage((prevDetailspage) => !prevDetailspage);
	};

	const handleChange = (event, newValue, activeThumb) => {
		if (!Array.isArray(newValue)) {
			return;
		}

		if (newValue[1] - newValue[0] < minDistance) {
			if (activeThumb === 0) {
				const clamped = Math.min(newValue[0], maxValue - minDistance);
				setValue([clamped, clamped + minDistance]);
			} else {
				const clamped = Math.max(newValue[1], minValue + minDistance);
				setValue([clamped - minDistance, clamped]);
			}
		} else {
			setValue(newValue);
		}

		setMin(newValue[0]);
		setMax(newValue[1]);
	};

	const fetchData1 = async () => {
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
			budgetFrom: "",
			budgetTo: "",
			vehBrandCode: "HYUNDAI",
			vehModelCode: "",
			vehFuel: "",
			loginCompanyID: "ZOOMWHEEL",
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
				setSearchResults(responseData?.UsedCarVehStockDetail);
				setStockdata(responseData?.UsedCarVehStockDetail);
				setDemo(responseData?.UsedCarVehStockDetail);
				setShowdata(responseData?.UsedCarVehStockDetail);

				setShowdata(responseData?.UsedCarVehStockDetail);
			} else {
				throw new Error(`Request failed with status code: ${response.status}`);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};
	const fetchData2 = async () => {
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
			budgetFrom: "",
			budgetTo: "",
			vehBrandCode: "MARUTI",

			vehModelCode: "",
			vehFuel: "",
			loginCompanyID: "ZOOMWHEEL",
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
				setSearchResults(responseData?.UsedCarVehStockDetail);
				setDemo(responseData?.UsedCarVehStockDetail);

				setShowdata(responseData?.UsedCarVehStockDetail);
			} else {
				throw new Error(`Request failed with status code: ${response.status}`);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};
	
	const filterDataCars1 = (e) => {
		e.preventDefault();
		fetchData1();
		navigate("/");

		searchResults.map((item) => console.log(item.uniqueSerial, "uniqueserial"));
	};

	const filterDataCars2 = (e) => {
		e.preventDefault();
		fetchData2();

		searchResults.map((item) => console.log(item.uniqueSerial, "uniqueserial"));
	};
	return (
		<>
			<div>
				<Socalmedial />

				<section class="jk-slider">
    <div id="carousel-example" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carousel-example" data-slide-to="0" class="active"></li>
    <li data-target="#carousel-example" data-slide-to="1"></li>
    <li data-target="#carousel-example" data-slide-to="2"></li>
  </ol>

  <div class="carousel-inner">
    <div class="item active">
      <a href="#"><img className="sl_wd1" src="images/slider3.jpg" /></a>
      	<div class="hero">
       
        
      </div>
    </div>
    <div class="item">
	<a href="#"><img className="sl_wd1" src="images/slider2.jpg" /></a>
      <div class="hero">
        {/* <hgroup>
            <h1>Search for</h1>        
            <h3>the books you need and save ! </h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</p>
        </hgroup> */}
        
      </div>
    </div>
    <div class="item">
	<a href="#"><img className="sl_wd1" src="images/slider1.jpeg" /></a>
      <div class="hero">
        {/* <hgroup>
            <h1>Search for</h1>        
            <h3>the books you need and save ! </h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</p>
        </hgroup> */}
        
      </div>
    </div>
  </div>

  <a class="left carousel-control" href="#carousel-example" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left"></span>
  </a>
  <a class="right carousel-control" href="#carousel-example" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right"></span>
  </a>
</div>
	
</section>
			
				{/* <div className='box_mn_price'>
					<div className='col-md-12'>
						<div className='reng'>
							<h1>PRICE RANGE</h1>

							<div style={{ marginTop: "24px" }} onClick={handleSaveData}>
								<Slider
									getAriaLabel={() => "Price Range"}
									value={value}
									onChange={handleChange}
									valueLabelDisplay='auto'
									barInnerColor='red'
									thumbLeftColor='red'
									min={minValue}
									max={maxValue}
									step={1000}
								/>

								<div className='prizetext'>
									<div className='textprize' style={{ color: "#fff" }}>
										<span className='pr_l'>
											<i class='fa fa-fw'></i>
											{min}{" "}
										</span>

										<span className='pr_r'>
											<i class='fa fa-fw'></i> {max}
										</span>
									</div>
								</div>

								<div className='search_btn1'>
									<ul>
										<li>
											<button
												type='submit'
												onClick={handleSaveData}
												id='searcgbtn'
												class='  btn btn-lg sr1'>
												<span>Search</span>
											</button>
										</li>
										<li>
											<button
												type='reset'
												onClick={reloadPage}
												id='searcgbtn'
												class='  btn btn-lg sr2'>
												<span>Reset</span>
											</button>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div> */}

				<div className='box_mn1'>
					<h1>DISCOVER THE PERFECT CAR</h1>

					<div className='sel_btn2_mn'>

					<div class='view_btn2 example-1 by_btn_hd'>
					<Link to='/buyercars'> Buy Car <i class="fa fa-fw" ></i></Link>
									</div>

					<div class='view_btn2 example-1 sell_hid'>
					<Link to='/sellcars'> Sell car <i class="fa fa-fw" ></i></Link>
									</div>

									
					
					<div class='view_btn2 example-1 viw_hd'>
					<Link to='/buyercars'> View All <i class="fa fa-fw" ></i></Link>
									</div>

								

</div>

					{currentData.length === 0 ? (
						<div
							className='loader'
							style={{ marginLeft: "100px", marginTop: "90px" }}>
							{/* <ReactLoading
								type='spin'
								color='#1976d2'
								height={200}
								width={100}
							/> */}

							<div id='page'>
								<div id='container'>
									<div id='ring'></div>
									<div id='ring'></div>
									<div id='ring'></div>
									<div id='ring'></div>
									<div id='h3' style={{ fontSize: "20px" }}>
										.......
									</div>
								</div>
							</div>
						</div>
					) : (
						<>
							{currentData
								?.filter(
									(item) => item.programCode === "SHORT_LIST_WEBSITE_HOME_PAGE"
								)

								.map((item) => (
									<div
										class='col-md-4 col-sm-6 col-xs-12'
										key={item.uniqueSerial}>
										<div class='crane_container'>
										<p class="newtext2"><i class="fa fa-check-circle ver_icn"></i> Certified</p>
											<div class='carbox '>
												{item?.bookingFlag === "Y" ? (
													<>
														<div className='bokd_pic'>
															<img className='' src='images/booked.png' />
														</div>
													</>
												) : (
													""
												)}
												<a
													class='img-carbox '
													onClick={() => {
														singleProducthandle(item.uniqueSerial);
														setHomepage(true);
													}}>
													{item?.modelImages.length === 0 ? (
														<>
															<img
																className=' '
																src='images/logo/defaulimag.png'
																style={{
																	aspectRatio: "2/2",
																	width: "100%",
																}}
															/>
														</>
													) : (
														<>
															{item?.modelImages.some(
																(image) => image.imageName === "Front"
															) && (
																<img
																	src={
																		item?.modelImages.find(
																			(image) => image.imageName === "Front"
																		)?.uri
																	}
																	alt='Front View'
																/>
															)}
														</>
													)}
												</a>
												<div class='carbox-content'>
													<h4 class='carbox-title'>
														<a>
															{" "}
															{item.vehBrandCode} {item.vehModelCode}
														</a>
													</h4>
													<div className='list1'>
														<ul>
															<li>
																{" "}
																<img src='images/car_image/car.png'></img>{" "}
																{item.vehManufactureYear}
															</li>
															<li>
																<img src='images/car_image/petrol.png'></img>{" "}
																{item.vehFuelCode}
															</li>
															<li>
																<img src='images/car_image/meter.png'></img>{" "}
																{item.vehOdometer}
															</li>
														</ul>
													</div>
												</div>
												<div class='abe_p_bot_btn'>
													<ul>
														<li class='pleft'>
															<i class='fa fa-inr'></i>{" "}
															{item.vehSellPriceRecommended}
														</li>
														<li class='p-right'>
															<a
																onClick={() => {
																	singleProducthandle(item.uniqueSerial);
																	setHomepage(true);
																}}>
																See Detail{" "}
															</a>
														</li>
													</ul>
												</div>{" "}
											</div>
										</div>
									</div>
								))}
						</>
					)}
				</div>
				<div class='customer_mn'>
					<div class='container'>
						<div class='row'>
							<div class='col-md-4 col-sm-6 col-xs-12'>
								<Link to='/Calculatoremi'>
									<div class='serviceBox'>
										<div class='service-icon'>
											<img src='/images/ic2.png'></img>
										</div>
										<h3 class='title'>EMI Calculator</h3>
										<p class='description'>
											Know your EMI as per your requirement.
										</p>
									</div>
								</Link>
							</div>
							<div class='col-md-4 col-sm-6 col-xs-12'>
							<Link to='/insuranceform'>
									<div class='serviceBox'>
										<div class='service-icon'>
											<img src='/images/ic3.png'></img>
										</div>
										<h3 class='title'>Insurance</h3>
										<p class='description'>
											Safety comes first, get unparalleled automobile insurance
											quotes.
										</p>
									</div>
								</Link>
							</div>
							<div class='col-md-4 col-sm-6 col-xs-12'>
								<Link to='/autoloan'>
									<div class='serviceBox'>
										<div class='service-icon'>
											<img src='/images/ic4.png'></img>
										</div>
										<h3 class='title'>Finance</h3>
										<p class='description'>
											Know what documents you need to finance your dream car.
										</p>
									</div>
								</ 	Link>
							</div>
						</div>
					</div>
				</div>
				<div className='popular_listings_mn'>
					<h2
						className='s-title tx_clr cr_clr1'
						// '0.9s'
						style={{ fontFamily: "Segoe UI" }}>
						Popular Listings
					</h2>

					<div className='carousel-wrapper'>
						<Carousel breakPoints={breakPoints}>
							{exculsive
								?.filter(
									(item) =>
										item.programCode === "SHORT_LIST_WEBSITE_EXCLUSIVE_OFFERS"
								)
								.map((item, index) => (
									<div key={index}>
										<a id='slider_img'>
											<div class=' '>
												<div class='crane_container'>
													<div class='carbox '>
														<a
															class='img-carbox '
															onClick={() => {
																singleProducthandle(item.uniqueSerial);
															}}>
															{item?.bookingFlag === "Y" ? (
																<>
																	<div className='bokd_pic'>
																		<img className='' src='images/booked.png' />
																	</div>
																</>
															) : (
																""
															)}

															{item?.modelImages.length === 0 ? (
																<>
																	<img
																		className=' '
																		src='images/logo/defaulimag.png '
																		style={{
																			aspectRatio: "2/2",
																			width: "100%",
																		}}
																	/>
																</>
															) : (
																<>
																	{item?.modelImages.some(
																		(image) => image.imageName === "Front"
																	) && (
																		<img
																			src={
																				item?.modelImages.find(
																					(image) => image.imageName === "Front"
																				)?.uri
																			}
																			alt='Front View'
																		/>
																	)}
																</>
															)}
														</a>
														<div class='carbox-content'>
															<h4 class='carbox-title'>
																<a href='#'>
																	{" "}
																	{item.vehBrandCode} {item.vehModelCode}
																</a>
															</h4>
															<div className='list1'>
																<ul>
																	<li>
																		{" "}
																		<img src='images/car_image/car.png'></img>{" "}
																		{item.vehManufactureYear}
																	</li>
																	<li>
																		<img src='images/car_image/petrol.png'></img>{" "}
																		{item.vehFuelCode}
																	</li>
																	<li>
																		<img src='images/car_image/meter.png'></img>{" "}
																		{item.vehOdometer} Kms
																	</li>
																</ul>
															</div>
														</div>
														<div class='abe_p_bot_btn'>
															<ul>
																<li class='pleft'>
																	<i class='fa fa-inr'></i>{" "}
																	{item.vehSellPriceRecommended}
																</li>
																<li class='p-right'>
																	<a
																		onClick={() => {
																			singleProducthandle(item.uniqueSerial);
																		}}>
																		See Detail{" "}
																	</a>
																</li>
															</ul>
														</div>{" "}
													</div>
												</div>
											</div>
										</a>
									</div>
								))}
						</Carousel>
					</div>
				</div>
				<section class='cont_number'>
					<div class='container'>
						<div class='row row-50 row-lg-80 justify-content-center align-items-center align-items-lg-start text-start'>
							<div class='col-md-5 text-center coun_mng'>
								{/* <img className='sli_pic2' src='images/auto.png' /> */}

								<div class='text-width-extra-small wow fadeInUp'>
									<h3 class='title-decoration-lines-left'>
										10+ Years of Experience
									</h3>
									<p class='text-gray-500 text-down'>
										With more than 10+ years of experience, our team offers
										quality pre owend car services
									</p>
									<div class='view_btn'>
									<Link to='/buyercars'>Find a car</Link>
									</div>
								</div>
							</div>
							<div class='col-md-7 text-center'>
								<div class='row justify-content-center border-2-column'>
									<div class='col-9 col-sm-6'>
										<div class='counter-amy'>
											<div class='counter-amy-number'>
												<span class='counter animated'>
													<span class='fa fa-car icn_sz2'></span> 100+
												</span>
											</div>
											<h6 class='counter-amy-title'>VEHICLES IN STOCK</h6>
										</div>
									</div>
									<div class='col-9 col-sm-6'>
										<div class='counter-amy'>
											<div class='counter-amy-number'>
												<span class='counter animated'>
													<span class='fa fa-users icn_sz2'></span> 5000+
												</span>
											</div>
											<h6 class='counter-amy-title'>HAPPY CUSTOMER REVIEWS</h6>
										</div>
									</div>
									{/* <div class='col-9 col-sm-6'>
										<div class='counter-amy'>
											<div class='counter-amy-number'>
												<span class='counter animated'>
													<span class='fa fa-building-o icn_sz2'></span> 2
												</span>
											</div>
											<h6 class='counter-amy-title'>DEALER BRANCHES</h6>
										</div>
									</div> */}
									{/* <div class='col-9 col-sm-6'>
										<div class='counter-amy'>
											<div class='counter-amy-number'>
												<span class='counter animated'>16</span>
											</div>
											<h6 class='counter-amy-title'>BRANDS</h6>
										</div>
									</div> */}
								</div>
							</div>

							<div class='col-lg-6 col-xl-12 align-self-center'>
								<div class='row row-30 justify-content-center'>
									<div class='col-sm-6 col-md-5 col-lg-6 col-xl-3 wow fadeInLeft'></div>
									<div
										class='col-sm-6 col-md-5 col-lg-6 col-xl-3 wow fadeInLeft'
										data-wow-delay='.1s'></div>
									<div
										class='col-sm-6 col-md-5 col-lg-6 col-xl-3 wow fadeInLeft'
										data-wow-delay='.2s'></div>
									<div
										class='col-sm-6 col-md-5 col-lg-6 col-xl-3 wow fadeInLeft'
										data-wow-delay='.3s'></div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<div class='testimonials_sec'>
                    <div class='container'>
                        <h2>WHAT OUR CLIENTS SAY</h2>
 
                        <div class='row'>
                            <div class='col-md-1'></div>
                            <div class='col-md-10'>
                                <div
                                    id='carousel-example-generic'
                                    class='carousel slide'
                                    data-ride='carousel'>
                                    <div class='carousel-inner'>
                                        <div class='item active'>
                                            <div class='row'>
                                                <div class=''>
                                                    <div class='col-md-2'>
                                                        <div class='ts_mn'>
                                                            <img
                                                                src='/images/team/jaytika_Chhabra.png'
                                                                class='img-responsive'></img>
                                                        </div>
                                                    </div>
                                                    <div class='col-sm-9 tex_tx'>
                                                        <p>
                                                            <strong>
                                                            Zoom wheels are the best in dealing best prices, nice staff
                                                            good in behavior specially Manjit ji. All time supportive in services or
                                                             any queries or issues. Highly appreciated.
                                                             I Recommend zoom wheels  for best cars
                                                            </strong>
                                                        </p>
                                                        <p class='testimonial_subtitle'>
                                                            <span>Mrs. Jaytika Chhabra</span>
                                                            <br></br>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class='item'>
                                            <div class=''>
                                                <div class='row'>
                                                    <div class=''>
                                                        <div class='col-md-2'>
                                                            <div class='ts_mn'>
                                                                <img
                                                                    src='/images/team/t2.jpg'
                                                                    class='img-responsive'></img>
                                                            </div>
                                                        </div>
                                                        <div class='col-sm-9 tex_tx'>
                                                            <p>
                                                                <strong>
                                                                I'd want to express my gratitude to the Zoom Wheels Team. They have an incredible crew with golden hearts.
                                                                They are extremely courteous and helpful. Mr. Manjeet is one of Zoom Wheel's best employee.
                                                                 He assisted me in selecting the ideal vehicle for me, which I received within 48 hours.
                                                                </strong>
                                                            </p>
                                                            <p class='testimonial_subtitle'>
                                                                <span>Mr. Manjeet Sir</span>
                                                                <br></br>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
 
                                        <div class='item'>
                                            <div class=''>
                                                <div class='row'>
                                                    <div class=''>
                                                        <div class='col-md-2'>
                                                            <div class='ts_mn'>
                                                                <img
                                                                    src='/images/team/t3.png'
                                                                    class='img-responsive'></img>
                                                            </div>
                                                        </div>
                                                        <div class='col-sm-9 tex_tx'>
                                                            <p>
                                                                <strong>
                                                                Awesome Car, Great Customer Handling, Transparency in Deal,
                                                                 Smooth Paperwork & Grand Delivery... ZOOMWHEELS is a Complete Blockbuster !
                                                                </strong>
                                                            </p>
                                                            <p class='testimonial_subtitle'>
                                                                <span>Mr. PRASHANT </span>
                                                                <br></br>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
 
                                        <div class='item'>
                                            <div class=''>
                                                <div class='row'>
                                                    <div class=''>
                                                        <div class='col-md-2'>
                                                            <div class='ts_mn'>
                                                                <img
                                                                    src='/images/team/t4.png'
                                                                    class='img-responsive'></img>
                                                            </div>
                                                        </div>
                                                        <div class='col-sm-9 tex_tx'>
                                                            <p>
                                                                <strong>
                                                                Great experience, Found exactly same condition of the car as explained
                                                                by the staff.
                        Great collection of cars.Special thanks to Manjeet Singh ji and Paresh Ji for their hospitality and cooperation.
                                                                </strong>
                                                            </p>
                                                            <p class='testimonial_subtitle'>
                                                                <span>Mr. Verchasvi Sidhar </span>
                                                                <br></br>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
 
                                        <div class='item'>
                                            <div class=''>
                                                <div class='row'>
                                                    <div class=''>
                                                        <div class='col-md-2'>
                                                            <div class='ts_mn'>
                                                                <img
                                                                    src='/images/team/t5.png'
                                                                    class='img-responsive'></img>
                                                            </div>
                                                        </div>
                                                        <div class='col-sm-9 tex_tx'>
                                                            <p>
                                                                <strong>
                                                                Zoomwheels is tha best in class second hand cars and roopsingh is
                                                                very friendly and cooperative with as thank you roopsingh ji
                                                                </strong>
                                                            </p>
                                                            <p class='testimonial_subtitle'>
                                                                <span>Mr. Ravi Shakya </span>
                                                                <br></br>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
 
                                        <div class='item'>
                                            <div class=''>
                                                <div class='row'>
                                                    <div class=''>
                                                        <div class='col-md-2'>
                                                            <div class='ts_mn'>
                                                                <img
                                                                    src='/images/team/t6.png'
                                                                    class='img-responsive'></img>
                                                            </div>
                                                        </div>
                                                        <div class='col-sm-9 tex_tx'>
                                                            <p>
                                                                <strong>
                                                                Good behavior person Mr.Roop Singh
                                                                Quality cars in zoomwheel.
                                                                I have got very good mileage with my KUV100.Mahindra
                                                                Nice car.
                                                                </strong>
                                                            </p>
                                                            <p class='testimonial_subtitle'>
                                                                <span>Mr. Surya kant</span>
                                                                <br></br>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
 
                                        <div class='item'>
                                            <div class=''>
                                                <div class='row'>
                                                    <div class=''>
                                                        <div class='col-md-2'>
                                                            <div class='ts_mn'>
                                                                <img
                                                                    src='/images/team/t7.png'
                                                                    class='img-responsive'></img>
                                                            </div>
                                                        </div>
                                                        <div class='col-sm-9 tex_tx'>
                                                            <p>
                                                                <strong>
                                                                I have purchased VW Ameo 2019 from zoom wheels condition of
                                                                card as good as new Mr. Manjeet provide a great deal with great quality
                                                                </strong>
                                                            </p>
                                                            <p class='testimonial_subtitle'>
                                                                <span>Mr. Sp singh</span>
                                                                <br></br>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
 
                                        <div class='item'>
                                            <div class=''>
                                                <div class='row'>
                                                    <div class=''>
                                                        <div class='col-md-2'>
                                                            <div class='ts_mn'>
                                                                <img
                                                                    src='/images/team/t8.png'
                                                                    class='img-responsive'></img>
                                                            </div>
                                                        </div>
                                                        <div class='col-sm-9 tex_tx'>
                                                            <p>
                                                                <strong>
                                                                Value for money car❤️ I've got from zoomwheels . Special thanks
                                                                to brother Rudransh Mehtaa for giving this best deal for us . Thank you Zoomwheels ❤️
                                                                </strong>
                                                            </p>
                                                            <p class='testimonial_subtitle'>
                                                                <span>Mr. Bhanu Singh</span>
                                                                <br></br>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
 
                                        <div class='item'>
                                            <div class=''>
                                                <div class='row'>
                                                    <div class=''>
                                                        <div class='col-md-2'>
                                                            <div class='ts_mn'>
                                                                <img
                                                                    src='/images/team/t9.png'
                                                                    class='img-responsive'></img>
                                                            </div>
                                                        </div>
                                                        <div class='col-sm-9 tex_tx'>
                                                            <p>
                                                                <strong>
                                                                Great experience with Zoomwheels, I got my german car
                                                                 VW Vento with brand new condition and quality superb done by zoom wheels 👍
                                                                </strong>
                                                            </p>
                                                            <p class='testimonial_subtitle'>
                                                                <span>Mr. Dheeraj Kumar</span>
                                                                <br></br>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
 
                                    </div>
                                </div>
                                <div class='controls testimonial_control pull-right'>
                                    <a
                                        class='left fa fa-chevron-left btn btn-default testimonial_btn'
                                        href='#carousel-example-generic'
                                        data-slide='prev'></a>
 
                                    <a
                                        class='right fa fa-chevron-right btn btn-default testimonial_btn'
                                        href='#carousel-example-generic'
                                        data-slide='next'></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
			</div>
			<Footer />
		</>
	);
};
export default Dashboard;

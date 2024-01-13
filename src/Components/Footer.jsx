import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Footer = (props) => {
	const {onClickFooterItem } = props
	const [demo, setDemo] = useState([]);
	const [showdata, setShowdata] = useState(false);
	var [homepage, setHomepage] = useState(false);
	const [data, setData] = useState([]);
	const [stockdata, setStockdata] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
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

	const navigate = useNavigate();

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
				setDemo(responseData?.UsedCarVehStockDetail);
				navigate("/");

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

		searchResults.map((item) => console.log(item.uniqueSerial, "uniqueserial"));
	};

	const filterDataCars2 = (e) => {
		e.preventDefault();
		fetchData2();

		searchResults.map((item) => console.log(item.uniqueSerial, "uniqueserial"));
	};

	const singleProducthandle = (item) => {
		// const product = stockdata.find(
		// 	(item) => item.uniqueSerial === uniqueSerial,
		// 	(item) => item.vehOdometer === vehOdometer
		// );

		localStorage.setItem("clickbrand", JSON.stringify(item));

	
		navigate("/buyercars");

		// setDetailspage((prevDetailspage) => !prevDetailspage);
	};

	
	return (
		<div>
			<footer class='footer area-bg'>
				<div class='area-bg__inner'>
					<div class='footer__main'>
						<div class='container'>
							<div class='row'>
								<div class='footer_pdg1'>
									<div class='col-md-3 col-sm-6 col-xs-12'>
										<div class='footer-section'>
											<a class='footer__logo' href='/Dashboard'>
												<img class='logo_siz4' src='images/logo.svg'></img>
											</a>
											<div class='footer__info'>
											With over a decade of experience in the used car industry, our company has established itself as 
											one of the leading dealers in the Delhi NCR region.
											</div>
											<div className='socil_icon2'>
												<ul>
													<li>
														<a
															href='https://api.whatsapp.com/send/?phone=8926152152&text= Hello Zoomwheels +Team%2C+I+would+like+to+know+more&type=phone_number&app_absent=0'
															target='_blank'>
															<img src='images/whatsapp_icon.png'></img>
														</a>
													</li>
													<li>
														<a
															href='https://Www.facebook.com/ZoomWheels'
															target='_blank'>
															<img src='images/fb.png'></img>
														</a>
													</li>
													<li>
														<a
															href='https://www.instagram.com/Zoomwheels_usedcars'
															target='_blank'>
															<img src='images/instra.png'></img>
														</a>
													</li>
													<li>
														<a
															href='https://www.youtube.com/@ZoomwheelsUsedCars'
															target='_blank'>
															<img src='images/ytb.png'></img>
														</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
									<div class='col-md-4 col-sm-6 col-xs-12'>
										<section class='footer-section footer-section_list-columns'>
											<h3 class='footer-section__title ui-title-inner'>
												Top Brands
											</h3>
											<ul class='footer-list footer-list_columns list-unstyled'>
												{data
													?.filter((item) => item.code === "HYUNDAI")
													.map((item) => (
														<li
															class='footer-list__item'
															
															onClick={() => {
																singleProducthandle(item);
																
																
															}}
															key={item}>
															<a class='footer-list__link'>
																{item.description}
															</a>
															
														</li>
													))}

												{data
													?.filter((item) => item.code === "HONDA")
													.map((item) => (
														<li class='footer-list__item' onClick={() => {
															singleProducthandle(item);
															
															
														}} key={item}>
															<a class='footer-list__link' >
																{item.description}
															</a>
														</li>
													))}

												

												{data
													?.filter((item) => item.code === "KIA")
													.map((item) => (
														<li class='footer-list__item' onClick={() => {
															singleProducthandle(item);
															
															
														}} key={item}>
															<a class='footer-list__link' >
																{item.description}
															</a>
														</li>
													))}

												{data
													?.filter((item) => item.code === "MAHINDRA")
													.map((item) => (
														<li class='footer-list__item' onClick={() => {
															singleProducthandle(item);
															
															
														}} key={item}>
															<a class='footer-list__link' >
																{item.description}
															</a>
														</li>
													))}

												{data
													?.filter((item) => item.code === "TATA")
													.map((item) => (
														<li class='footer-list__item' onClick={() => {
															singleProducthandle(item);
															
															
														}} key={item}>
															<a class='footer-list__link' >
																{item.description}
															</a>
														</li>
													))}

												

												

												{data
													?.filter((item) => item.code === "MARUTI")
													.map((item) => (
														<li
															class='footer-list__item'
															onClick={() => {
																singleProducthandle(item);
																
																
															}}
															key={item}>
															<a class='footer-list__link' >
																{item.description}
															</a>
														</li>
													))}

												{data
													?.filter((item) => item.code === "SKODA")
													.map((item) => (
														<li class='footer-list__item' onClick={() => {
															singleProducthandle(item);
															
															
														}} key={item}>
															<a class='footer-list__link' >
																{item.description}
															</a>
														</li>
													))}
											</ul>
										</section>
									</div>
									<div class='col-md-2 col-sm-12 col-xs-12'>
										<section class='footer-section footer-section_list-one'>
											<h3 class='footer-section__title ui-title-inner'>Menu</h3>
											<ul class='footer-list list-unstyled'>
												<li class='footer-list__item'>
													<Link class='footer-list__link' to='/'>
														Home
													</Link>
												</li>
												<li class='footer-list__item'>
													<Link class='footer-list__link' to='/buyercars'>
														Buy Car
													</Link>
												</li>

												<li class='footer-list__item'>
													<Link class='footer-list__link' to='/sellcars'>
														Sell Car
													</Link>
												</li>
												

												<li class='footer-list__item'>
													<Link class='footer-list__link' to='/imagegallery'>
														Gallery
													</Link>
												</li>
												<li class='footer-list__item'>
													<Link class='footer-list__link' to='/insuranceform'>
														Insurance
													</Link>
												</li>
												<li class='footer-list__item'>
													<Link class='footer-list__link' to='/about'>
														About Us
													</Link>
												</li>
												<li class='footer-list__item'>
													<Link class='footer-list__link' to='/contact'>
														Contact Us
													</Link>
												</li>
											</ul>
										</section>
									</div>
									<div class='col-md-3 col-sm-6 col-xs-12'>
										<section class='footer-section'>
											<h3 class='footer-section__title ui-title-inner'>
												Address Information
											</h3>
											<div class='footer-contact footer-contact_lg'>
												Call us{" "}
												<span class='text-primary'>
													<a href='tel: +91 8926152152'> +91 8926152152</a>
												</span>
											</div>
											<div class='footer-contact'>
												<i class='icon icon-xs fa fa-envelope-o'></i>
												<a
													className='fte_ml_tx'
													href='mailto:zoomwheels9@gmail.com'>
													{" "}
													zoomwheels9@gmail.com{" "}
												</a>
											</div>
											<div class='footer-contact'>
												<i class='icon icon-lg fa fa-map-marker'></i>G-8 & 11,
												NDM - 1, Netaji Subhash Place, New Delhi, Delhi 110034
											</div>
											<div class='footer-contact'>
												<i class='icon fa fa-clock-o'></i>Mon - Fri : 10:00am -
												7:00pm
											</div>
										</section>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Footer;

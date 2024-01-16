import React, { useState, useEffect } from "react";
// import Slider from "react-slider";
import "./responsive.css";
import "./style.css";
import Slider from "@mui/material/Slider";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { ReactLoading } from "react-loading";
import Socalmedial from "./Socalmedial";
import PageScrolltop from "./PageScrolltop";

const MIN = 50000;
const MAX = 9000000;
const minDistance = 10;

const BuyerCar = () => {
	const minValue = 50000;
	const maxValue = 9000000;
	const [selecttransmission, setSelecttransmission] = useState("");
	const [selectfuel, setSelectFuel] = useState("");
	const [min, setMin] = useState(minValue);
	const [max, setMax] = useState(maxValue);
	const [value, setValue] = useState([minValue, maxValue]);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [demo, setDemo] = useState([]);
	const [showdata, setShowdata] = useState(false);
	const [minRange, setMinRange] = useState("");
	const [maxRange, setMaxRange] = useState("");
	const [data, setData] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [methu, setMethu] = useState([]);
	const [stockdata, setStockdata] = useState([]);
	const [fueldata, setFuelData] = useState([]);
	const [transmission, setTransmission] = useState([]);
	const [brandData, setBrandData] = useState("")
	const [segment, setSegment] = useState([]);
	const [prizevalue, setprizevalue] = useState([MIN, MAX]);
	const [selectsegment, setSelectsegment] = useState("")
	const [selectBrand, setSelectBrand] = useState("");
	const [clickedBrand, setClickedBrand] = useState()
	const [footerClickedBrand, setFooterClickedBrand] = useState()
	const [colorChange,setcolorChange] = useState("bg-dark");


	
	var [homepage, setHomepage] = useState(false);
	const [currentpage, setCurrentPage] = useState(1);
	const itemsperpage = 15;
	const totalItems = demo.length;
	const totalPage = Math.ceil(totalItems / itemsperpage);
	const onPageChange = (page) => {
		setCurrentPage(page);
	};
	const Startindex = (currentpage - 1) * itemsperpage;
	const EndIndex = Startindex + itemsperpage;
	useEffect(() => {
		const footerClikItem1 = localStorage.getItem("clickbrand", null)
		const footerClikItem = JSON.parse(footerClikItem1);
	
		
		if(!(footerClikItem === null || footerClikItem === undefined)){
			setFooterClickedBrand(footerClikItem)
			setClickedBrand(footerClikItem)
			fetchData14()
		}
		// null
		//  : setClickedBrand(footerClikItem?.description)
		// (footerClikItem === null || footerClikItem === undefined) ? 
		// null
		//  :fetchData14 
	}, [footerClickedBrand]);
	var currentData = stockdata.slice(Startindex, EndIndex);
	// stock api
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
				VehTransmission: "",
				vehFuel: "",
				vehSegmentCode: "",
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
					setMethu(responseData?.UsedCarVehStockDetail);
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
	// brand api
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
	// Segment data api
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
			calledBy: "segment",
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
				setSegment(generalList);
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
				console.error(error);
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
				console.error(error);
			});
	}, []);
	// fuel select function 
	const handleSelectChange4 = (event) => {
		setSelectFuel(event.target.value);
	};
	// Select brand function 

	const handleSelectChange6 = (event) => {
		setSelectBrand(event.target.value);
		setClickedBrand(event.target.value)


	};
	// transmision select function
	const handleSelectChange5 = (event) => {
		setSelecttransmission(event.target.value);
	};
	
	// select segment function
	const handleSelectSegment = (event) => {
		setSelectsegment(event.target.value);
	};
	const navigate = useNavigate();
	// filter api data for segment , fuel and  price

	

	const fetchData14 = async () => {
		

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
			// some chenge in now this time clickedBrand?.code
			vehBrandCode: clickedBrand === undefined ? "" : typeof clickedBrand === "string"? clickedBrand : clickedBrand?.code,
			vehModelCode: "",
			budgetFrom: min,
			budgetTo: max,
			VehTransmission: selecttransmission,
			vehFuel: selectfuel,
			vehSegmentCode: selectsegment,
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

				// Verify the structure of responseData before accessing properties
				const usedCarVehStockDetail = responseData?.UsedCarVehStockDetail;

				if (usedCarVehStockDetail) {
					setSearchResults(usedCarVehStockDetail);
					setDemo(usedCarVehStockDetail);
					setShowdata(usedCarVehStockDetail);
				} else {
					console.error("Invalid response data structure:", responseData);
				}
			} else {
				throw new Error(`Request failed with status code: ${response.status}`);
			}
		} catch (error) {
			console.error("Error:", error.message);
			// Handle the error, show a user-friendly message, etc.
		}
	};


	const fetchData13 = async () => {
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
			vehBrandCode: clickedBrand?.code,
			vehModelCode: "",
			budgetFrom: min,
			budgetTo: max,
			VehTransmission: selecttransmission,
			vehFuel: selectfuel,
			vehSegmentCode: selectsegment,
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

				// Verify the structure of responseData before accessing properties
				const usedCarVehStockDetail = responseData?.UsedCarVehStockDetail;

				if (usedCarVehStockDetail) {
					setSearchResults(usedCarVehStockDetail);
					setDemo(usedCarVehStockDetail);
					setShowdata(usedCarVehStockDetail);
				} else {
					console.error("Invalid response data structure:", responseData);
				}
			} else {
				throw new Error(`Request failed with status code: ${response.status}`);
			}
		} catch (error) {
			console.error("Error:", error.message);
			// Handle the error, show a user-friendly message, etc.
		}
	};

	const handleSaveData = (e) => {
		e.preventDefault();

		fetchData14();
		// fetchData13();
		searchResults.map((item) => console.log("uniqueserial"));
	};
	const reloadPage = () => {
		window.location.reload(false);
		localStorage.clear();
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

			vehBrandCode: "HYUNDAI",
			vehModelCode: "",
			budgetFrom: min,
			budgetTo: max,
			VehTransmission: selecttransmission,
			vehFuel: selectfuel,
			vehSegmentCode: selectsegment,
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

			vehBrandCode: "MARUTI",

			vehModelCode: "",
			budgetFrom: min,
			budgetTo: max,
			VehTransmission: selecttransmission,
			vehFuel: selectfuel,
			vehSegmentCode: selectsegment,
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

	const fetchData3 = async () => {
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

			vehBrandCode: "HONDA",
			vehModelCode: "",
			budgetFrom: min,
			budgetTo: max,
			VehTransmission: selecttransmission,
			vehFuel: selectfuel,
			vehSegmentCode: selectsegment,
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

	const fetchData4 = async () => {
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

			vehBrandCode: "TATA",
			vehModelCode: "",
			budgetFrom: min,
			budgetTo: max,
			VehTransmission: selecttransmission,
			vehFuel: selectfuel,
			vehSegmentCode: selectsegment,
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

	const fetchData5 = async () => {
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

			vehBrandCode: "MAHINDRA",
			vehModelCode: "",
			budgetFrom: min,
			budgetTo: max,
			VehTransmission: selecttransmission,
			vehFuel: selectfuel,
			vehSegmentCode: selectsegment,
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

	const fetchData6 = async () => {
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

			vehBrandCode: "RENAULT",
			vehModelCode: "",
			budgetFrom: min,
			budgetTo: max,
			VehTransmission: selecttransmission,
			vehFuel: selectfuel,
			vehSegmentCode: selectsegment,
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

	const fetchData7 = async () => {
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

			vehBrandCode: "TOYOTA",
			vehModelCode: "",
			budgetFrom: min,
			budgetTo: max,
			VehTransmission: selecttransmission,
			vehFuel: selectfuel,
			vehSegmentCode: selectsegment,
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
	
	const fetchData8 = async () => {
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

			vehBrandCode: "FORD",
			vehModelCode: "",
			budgetFrom: min,
			budgetTo: max,
			VehTransmission: selecttransmission,
			vehFuel: selectfuel,
			vehSegmentCode: selectsegment,
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

	const fetchData9 = async () => {
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

			vehBrandCode: "KIA",
			vehModelCode: "",
			budgetFrom: min,
			budgetTo: max,
			VehTransmission: selecttransmission,
			vehFuel: selectfuel,
			vehSegmentCode: selectsegment,
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

	const fetchData10 = async () => {
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

			vehBrandCode: "NISSAN",
			vehModelCode: "",
			budgetFrom: min,
			budgetTo: max,
			VehTransmission: selecttransmission,
			vehFuel: selectfuel,
			vehSegmentCode: selectsegment,
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

	const fetchData11 = async () => {
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

			vehBrandCode: "MG",
			vehModelCode: "",
			budgetFrom: min,
			budgetTo: max,
			VehTransmission: selecttransmission,
			vehFuel: selectfuel,
			vehSegmentCode: selectsegment,
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

	const fetchData12 = async () => {
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

			vehBrandCode: "MERC",
			vehModelCode: "",
			budgetFrom: min,
			budgetTo: max,
			VehTransmission: selecttransmission,
			vehFuel: selectfuel,
			vehSegmentCode: selectsegment,
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
	const fetchData134 = async () => {
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

			vehBrandCode: "AUDI",
			vehModelCode: "",
			budgetFrom: min,
			budgetTo: max,
			VehTransmission: selecttransmission,
			vehFuel: selectfuel,
			vehSegmentCode: selectsegment,
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

	const fetchData15 = async () => {
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

			vehBrandCode: "VOLVO",
			vehModelCode: "",
			budgetFrom: min,
			budgetTo: max,
			VehTransmission: selecttransmission,
			vehFuel: selectfuel,
			vehSegmentCode: selectsegment,
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

	const fetchData18 = async () => {
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

			vehBrandCode: "VW",
			vehModelCode: "",
			budgetFrom: min,
			budgetTo: max,
			VehTransmission: selecttransmission,
			vehFuel: selectfuel,
			vehSegmentCode: selectsegment,
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



	const fetchData25 = async () => {
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

			vehBrandCode: "SKODA",
			vehModelCode: "",
			budgetFrom: min,
			budgetTo: max,
			VehTransmission: selecttransmission,
			vehFuel: selectfuel,
			vehSegmentCode: selectsegment,
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



	const fetchDataSeg1 = async () => {
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

			vehBrandCode: "",
			vehModelCode: "",
			budgetFrom: min,
			budgetTo: max,
			VehTransmission: selecttransmission,
			vehFuel: selectfuel,
			vehSegmentCode: selectsegment,


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

	const fetchDataSeg2 = async () => {
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

			vehBrandCode: "",
			vehModelCode: "",
			budgetFrom: min,
			budgetTo: max,
			VehTransmission: selecttransmission,
			vehFuel: selectfuel,
			vehSegmentCode: selectsegment,


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

	const fetchDataSeg3 = async () => {
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

			vehBrandCode: "",
			vehModelCode: "",
			budgetFrom: min,
			budgetTo: max,
			VehTransmission: selecttransmission,
			vehFuel: selectfuel,
			vehSegmentCode: selectsegment,
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

	const fetchDataSeg4 = async () => {
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

			vehBrandCode: "",
			vehModelCode: "",
			budgetFrom: min,
			budgetTo: max,
			VehTransmission: selecttransmission,
			vehFuel: selectfuel,
			vehSegmentCode: selectsegment,
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

	const filterDataSegment1 = (e) => {
		e.preventDefault();
		fetchDataSeg1();

		searchResults.map((item) => console.log(item.uniqueSerial, "uniqueserial"));
	};

	const filterDataSegment2 = (e) => {
		e.preventDefault();
		fetchDataSeg2();

		searchResults.map((item) => console.log(item.uniqueSerial, "uniqueserial"));
	};

	const filterDataSegment3 = (e) => {
		e.preventDefault();
		fetchDataSeg3();

		searchResults.map((item) => console.log(item.uniqueSerial, "uniqueserial"));
	};

	const filterDataSegment4 = (e) => {
		e.preventDefault();
		fetchDataSeg4();

		searchResults.map((item) => console.log(item.uniqueSerial, "uniqueserial"));
	};

	const filterDataCars18 = (e) => {
		e.preventDefault();
		fetchData18();

		searchResults.map((item) => console.log(item.uniqueSerial, "uniqueserial"));
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
	const filterDataCars3 = (e) => {
		e.preventDefault();
		fetchData3();

		searchResults.map((item) => console.log(item.uniqueSerial, "uniqueserial"));
	};
	const filterDataCars4 = (e) => {
		e.preventDefault();
		fetchData4();

		searchResults.map((item) => console.log(item.uniqueSerial, "uniqueserial"));
	};
	const filterDataCars5 = (e) => {
		e.preventDefault();
		fetchData5();

		searchResults.map((item) => console.log(item.uniqueSerial, "uniqueserial"));
	};
	const filterDataCars6 = (e) => {
		e.preventDefault();
		fetchData6();

		searchResults.map((item) => console.log(item.uniqueSerial, "uniqueserial"));
	};
	const filterDataCars7 = (e) => {
		e.preventDefault();
		fetchData7();

		searchResults.map((item) => console.log(item.uniqueSerial, "uniqueserial"));
	};

	const filterDataCars8 = (e) => {
		e.preventDefault();
		fetchData8();

		searchResults.map((item) => console.log(item.uniqueSerial, "uniqueserial"));
	};

	const filterDataCars9 = (e) => {
		e.preventDefault();
		fetchData9();

		searchResults.map((item) => console.log(item.uniqueSerial, "uniqueserial"));
	};

	const filterDataCars10 = (e) => {
		e.preventDefault();
		fetchData10();

		searchResults.map((item) => console.log(item.uniqueSerial, "uniqueserial"));
	};


	const filterDataCars76 = (e) => {
		e.preventDefault();
		fetchData25();

		searchResults.map((item) => console.log(item.uniqueSerial, "uniqueserial"));
	};

	const filterDataCars11 = (e) => {
		e.preventDefault();
		fetchData11();

		searchResults.map((item) => console.log(item.uniqueSerial, "uniqueserial"));
	};

	const filterDataCars12 = (e) => {
		e.preventDefault();
		fetchData12();

		searchResults.map((item) => console.log(item.uniqueSerial, "uniqueserial"));
	};

	const filterDataCars13 = (e) => {
		e.preventDefault();
		fetchData13();

		searchResults.map((item) => console.log(item.uniqueSerial, "uniqueserial"));
	};

	const filterDataCars14 = (e) => {
		e.preventDefault();
		fetchData14();

		searchResults.map((item) => console.log(item.uniqueSerial, "uniqueserial"));
	};


	const filterDataCars15 = (e) => {
		e.preventDefault();
		fetchData15();

		searchResults.map((item) => console.log(item.uniqueSerial, "uniqueserial"));
	};

	const fetchData16 = async () => {
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
			budgetFrom: minRange,
			budgetTo: maxRange,
			vehBrandCode: "VW",
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

	const filterDataCars16 = (e) => {
		e.preventDefault();
		fetchData16();

		searchResults.map((item) => console.log(item.uniqueSerial, "uniqueserial"));
	};


	const brandlistClick = (code
	) => {
		const product = data.find(
			(item) => item.code === code,);

		setBrandData(product)
		setClickedBrand(product)

	}

	return (
		<div>
			<PageScrolltop />
			<Socalmedial />
			<section class='about_top'>
				<div class='container'>

					<div class='row'>

					<div class='buy_car_list'>						
<ul>
	<li><span class="fa fa-circle"></span> Certified Cars </li>
	<li><span class="fa fa-circle"></span> Non Accidental</li>
	<li><span class="fa fa-circle"></span> With Warranty </li>
	<li><span class="fa fa-circle"></span> No Commission</li>
</ul>

</div>

					</div>
				</div>
			</section>{" "}

			<div class='car_styl_tx'>
				<div class='col-md-12 ml-auto col-xl-6 mr-auto'>
					<h1>Find Your Dream Car <p className='tot_number '>Available stock: {stockdata.length}   </p></h1>


					<div class=''>


						<div class='card-body'>
							<div class='tab-content text-center'>
								<div class='tab-pane active' id='home' role='tabpanel'>


									<div class='bx_sdo1'>

										<div className='reng2'>


											<div className='prizetext'>
												<h1>PRICE RANGE</h1>
												<div className='textprize' style={{ color: "black" }}>
													<span className="pr_l"><i class="fa fa-fw"></i>{min.toLocaleString("en-IN")}</span>
													<span className='rsarr'>
														<i class='fa-solid fa-indian-rupee-sign'></i>{" "}
													</span>{" "}
													<span className="pr_r"><i class="fa fa-fw"></i>{max.toLocaleString("en-IN")}</span>
													<span className='rsarr'>
														<i class='fa-solid fa-indian-rupee-sign'></i>{" "}
													</span>
												</div>
											</div>

											<div onClick={handleSaveData}>
												<Slider
													getAriaLabel={() => "Price Range"}
													value={value}
													onChange={handleChange}
													valueLabelDisplay='auto'
													barInnerColor='red'
													min={minValue}
													max={maxValue}
													step={1000}
												/>


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
															type='submit'
															onClick={reloadPage}
															id='searcgbtn'
															class='  btn btn-lg sr2'>
															<span>Reset</span>
														</button>
													</li>
												</ul>
											</div>

										</div>





										<div class='brand_mn'>
											<div class='container'>

												<div class='log_slid'>
													

													<ul>
														{data
															?.filter((item) => item.code === "HYUNDAI")
															.map((item, index) => (
																<li key={index} 
																	onClick={(e) => {
																		brandlistClick(item.code);
																		// setcolorChange('data')
																		setcolorChange((prevColor) => (prevColor === 'bg-dark' ? 'bg-light' : 'bg-dark'));
																		filterDataCars1(e)
																	}}

																

												
																>
																	
																	<a
																		href=''
																		class='PopularBrands__brand styles__forGTM'
																		data-category='popular_brands'
																		data-label='hyundai'
																		data-index='50+'>
																		<div class='PopularBrands__content'>
																			<img
																				className="brandlist"
																				src='images/logo/3.jpg'
																			/>
																			<p>{item.description}</p>
																		</div>
																	</a>
																</li>
															))}
														{data
															?.filter((item) => item.code === "MARUTI")
															.map((item, index) => (
																<a href=''>
																	{" "}
																	<li

																		onClick={(e) => {
																			brandlistClick(item.code);
																			filterDataCars2(e)
																		}}
																	>
																		<a
																			class='PopularBrands__brand styles__forGTM'
																			data-category='popular_brands'
																			data-label='hyundai'
																			data-index='50+'>
																			<div class='PopularBrands__content'>
																				<img
																					className=''
																					src='images/logo/4.jpg'
																				/>
																				<p>{item.description}</p>
																			</div>
																		</a>
																	</li>
																</a>
															))}

														{data
															?.filter((item) => item.code === "HONDA")
															.map((item, index) => (
																<a href=''>
																	{" "}
																	<li

																		onClick={(e) => {
																			brandlistClick(item.code);
																			filterDataCars3(e)
																		}}
																	>
																		<a
																			class='PopularBrands__brand styles__forGTM'
																			data-category='popular_brands'
																			data-label='hyundai'
																			data-index='50+'>
																			<div class='PopularBrands__content'>
																				<img
																					className=''
																					src='images/logo/5.jpg'
																				/>
																				<p>{item.description}</p>
																			</div>
																		</a>
																	</li>
																</a>
															))}
														{data
															?.filter((item) => item.code === "TATA")
															.map((item, index) => (
																<a href=''>
																	{" "}
																	<li onClick={(e) => {
																		brandlistClick(item.code);
																		filterDataCars4(e)
																	}}
																	>
																		<a
																			class='PopularBrands__brand styles__forGTM'
																			data-category='popular_brands'
																			data-label='hyundai'
																			data-index='50+'>
																			<div class='PopularBrands__content'>
																				<img
																					className=''
																					src='images/logo/6.jpg'
																				/>
																				<p>{item.description}</p>
																			</div>
																		</a>
																	</li>
																</a>
															))}

														{data
															?.filter((item) => item.code === "MAHINDRA")
															.map((item, index) => (
																<a href=''>
																	{" "}
																	<li

																		onClick={(e) => {
																			brandlistClick(item.code);
																			filterDataCars5(e)
																		}}
																	>
																		<a
																			class='PopularBrands__brand styles__forGTM'
																			data-category='popular_brands'
																			data-label='hyundai'
																			data-index='50+'>
																			<div class='PopularBrands__content'>
																				<img
																					className=''
																					src='images/logo/7.jpg'
																				/>
																				<p>{item.description}</p>
																			</div>
																		</a>
																	</li>
																</a>
															))}
														{data
															?.filter((item) => item.code === "SKODA")
															.map((item, index) => (
																<a href=''>
																	{" "}
																	<li onClick={(e) => {
																		brandlistClick(item.code);
																		filterDataCars76(e)
																	}}>
																		<a
																			class='PopularBrands__brand styles__forGTM'
																			data-category='popular_brands'
																			data-label='hyundai'
																			data-index='50+'>
																			<div class='PopularBrands__content'>
																				<img
																					className=''
																					src='images/logo/17.png'
																				/>
																				<p>{item.description}</p>
																			</div>
																		</a>
																	</li>
																</a>
															))}

														{data
															?.filter((item) => item.code === "RENAULT")
															.map((item, index) => (
																<a href=''>
																	{" "}
																	<li onClick={(e) => {
																		brandlistClick(item.code);
																		filterDataCars6(e)
																	}}>
																		<a
																			class='PopularBrands__brand styles__forGTM'
																			data-category='popular_brands'
																			data-label='hyundai'
																			data-index='50+'>
																			<div class='PopularBrands__content'>
																				<img
																					className=''
																					src='images/logo/8.jpg'
																				/>
																				<p>{item.description}</p>
																			</div>
																		</a>
																	</li>
																</a>
															))}

														{data
															?.filter((item) => item.code === "TOYOTA")
															.map((item, index) => (
																<a href=''>
																	{" "}
																	<li onClick={(e) => {
																		brandlistClick(item.code);
																		filterDataCars7(e)
																	}}>
																		<a
																			class='PopularBrands__brand styles__forGTM'
																			data-category='popular_brands'
																			data-label='hyundai'
																			data-index='50+'>
																			<div class='PopularBrands__content'>
																				<img
																					className=''
																					src='images/logo/9.jpg'
																				/>
																				<p>{item.description}</p>
																			</div>
																		</a>
																	</li>
																</a>
															))}

														{data
															?.filter((item) => item.code === "FORD")
															.map((item, index) => (
																<a href=''>
																	{" "}
																	<li


																		onClick={(e) => {
																			brandlistClick(item.code);
																			filterDataCars8(e)
																		}}
																	>
																		<a
																			class='PopularBrands__brand styles__forGTM'
																			data-category='popular_brands'
																			data-label='hyundai'
																			data-index='50+'>
																			<div class='PopularBrands__content'>
																				<img
																					className=''
																					src='images/logo/10.jpg'
																				/>
																				<p>{item.description}</p>
																			</div>
																		</a>
																	</li>
																</a>
															))}

														{data
															?.filter((item) => item.code === "KIA")
															.map((item, index) => (
																<a href=''>
																	{" "}
																	<li

																		onClick={(e) => {
																			brandlistClick(item.code);
																			filterDataCars9(e)
																		}}


																	>
																		<a
																			class='PopularBrands__brand styles__forGTM'
																			data-category='popular_brands'
																			data-label='hyundai'
																			data-index='50+'>
																			<div class='PopularBrands__content'>
																				<img
																					className=''
																					src='images/logo/11.jpg'
																				/>
																				<p>{item.description}</p>
																			</div>
																		</a>
																	</li>
																</a>
															))}
														{data
															?.filter((item) => item.code === "NISSAN")
															.map((item, index) => (
																<a href=''>
																	{" "}
																	<li
																		onClick={(e) => {
																			brandlistClick(item.code);
																			filterDataCars10(e)
																		}}

																	>
																		<a
																			class='PopularBrands__brand styles__forGTM'
																			data-category='popular_brands'
																			data-label='hyundai'
																			data-index='50+'>
																			<div class='PopularBrands__content'>
																				<img
																					className=''
																					src='images/logo/12.jpg'
																				/>
																				<p>{item.description}</p>
																			</div>
																		</a>
																	</li>
																</a>
															))}
														{data
															?.filter((item) => item.code === "VW")
															.map((item, index) => (
																<a href=''>
																	{" "}
																	<li
																		onClick={(e) => {
																			brandlistClick(item.code);
																			filterDataCars16(e)
																		}}


																	>
																		<a
																			class='PopularBrands__brand styles__forGTM'
																			data-category='popular_brands'
																			data-label='hyundai'
																			data-index='50+'>
																			<div class='PopularBrands__content'>
																				<img
																					className=''
																					src='images/logo/13.jpg'
																				/>
																				<p>Volkswagen</p>
																			</div>
																		</a>
																	</li>
																</a>
															))}
														{data
															?.filter((item) => item.code === "MG")
															.map((item, index) => (
																<a href=''>
																	{" "}
																	<li
																		onClick={(e) => {
																			brandlistClick(item.code);
																			filterDataCars11(e)
																		}}

																	>
																		<a
																			class='PopularBrands__brand styles__forGTM'
																			data-category='popular_brands'
																			data-label='hyundai'
																			data-index='50+'>
																			<div class='PopularBrands__content'>
																				<img
																					className=''
																					src='images/logo/14.jpg'
																				/>
																				<p>{item.description} Motors</p>
																			</div>
																		</a>
																	</li>
																</a>
															))}
														{data
															?.filter((item) => item.code === "MERC")
															.map((item, index) => (
																<a href=''>
																	{" "}
																	<li
																		onClick={(e) => {
																			brandlistClick(item.code);
																			filterDataCars12(e)
																		}}

																	>
																		<a
																			class='PopularBrands__brand styles__forGTM'
																			data-category='popular_brands'
																			data-label='hyundai'
																			data-index='50+'>
																			<div class='PopularBrands__content'>
																				<img
																					className=''
																					src='images/logo/15.jpg'
																				/>
																				<p>{item.description}</p>
																			</div>
																		</a>
																	</li>
																</a>
															))}

														{data
															?.filter((item) => item.code === "AUDI")
															.map((item, index) => (
																<a href=''>
																	{" "}
																	<li

																		onClick={(e) => {
																			brandlistClick(item.code);
																			filterDataCars13(e)
																		}}
																	>
																		<a
																			class='PopularBrands__brand styles__forGTM'
																			data-category='popular_brands'
																			data-label='hyundai'
																			data-index='50+'>
																			<div class='PopularBrands__content'>
																				<img
																					className=''
																					src='images/logo/2.jpg'
																				/>
																				<p>{item.description}</p>
																			</div>
																		</a>
																	</li>
																</a>
															))}
														{data
															?.filter((item) => item.code === "BMW")
															.map((item, index) => (
																<a href=''>
																	{" "}
																	<li
																		onClick={(e) => {
																			brandlistClick(item.code);
																			filterDataCars14(e)
																		}}

																	>
																		<a
																			class='PopularBrands__brand styles__forGTM'
																			data-category='popular_brands'
																			data-label='hyundai'
																			data-index='50+'>
																			<div class='PopularBrands__content'>
																				<img
																					className=''
																					src='images/logo/1.jpg'
																				/>
																				<p>{item.description}</p>
																			</div>
																		</a>
																	</li>
																</a>
															))}
														{data
															?.filter((item) => item.code === "VOLVO")
															.map((item, index) => (
																<a href=''>
																	{" "}
																	<li
																		onClick={(e) => {
																			brandlistClick(item.code);
																			filterDataCars15(e)
																		}}

																	>
																		<a
																			class='PopularBrands__brand styles__forGTM'
																			data-category='popular_brands'
																			data-label='hyundai'
																			data-index='50+'>
																			<div class='PopularBrands__content'>
																				<img
																					className=''
																					src='images/logo/16.jpg'
																				/>
																				<p>{item.description}</p>
																			</div>
																		</a>
																	</li>
																</a>
															))}
													</ul>

												</div>


											</div>
										</div>

								

										<div className="drup_sid1 ">

											<ul>

												<li>
													<div class="">
														<div class=''>
															<select
																id='selectdata'
																class='dropdown dru_dn4 '
																onClick={handleSaveData}

																// onClick={(e) => {
																// 	brandlistClick(item.code);
																// 	filterDataCars1(e)
																// }}
																value={clickedBrand?.code}
																onChange={handleSelectChange6}>
																<option value=''> Brand</option>
																{data.map((item, index) => (
																	<option key={index} value={item.code}>
																		{item.description}
																	</option>
																))}
															</select>

														</div>
													</div>
												</li>
												<li>
													<div class="">
														<div class='s-relative'>
														
															<select
																id='selectdata'
																class='dropdown dru_dn4'
																onClick={handleSaveData}
																value={selectfuel}
																onChange={ handleSelectChange4
																	
																}>
																<option value=''> Fuel Type</option>
																{fueldata.map((item, index) => (
																	<option   key={index} value={item.code}>
																		{item.description}
																	</option>
																))}
															</select>

														</div>
													</div>
												</li>

												<li>
													<div class="">
														<div class=''>
															<select
																id='selectdata'
																class='dropdown dru_dn4 '
																onClick={(e) => {
																	handleSaveData(e)
																}}
																value={selectsegment}
																onChange={handleSelectSegment}>
																<option value=''> Car Style</option>
																{segment.map((item, index) => (
																	<option key={index} value={item.code}>
																		{item.description}
																	</option>
																))}
															</select>

														</div>
													</div>
												</li>

												<li>
													<div class="">
														<div class='s-relative'>
															<select
																className='dropdown dru_dn4 '
																onClick={handleSaveData}
																value={selecttransmission}
																onChange={handleSelectChange5}
																displayEmpty>
																<option className='selectoption' value=''>
																	Transmission{" "}
																</option>
																{transmission.map((item, index) => (
																	<option
																		className='selectoption'
																		key={index}
																		value={item.code}>
																		{item.description}
																	</option>
																))}
															</select>


														</div>
													</div>
												</li>


											</ul>

										</div>

									</div>







									{showdata === false ? (
										<>
											<div className='box_mn1 box_by_cr'>
												{stockdata.map((item) => (
													<div
														class='col-md-4 col-sm-6 col-xs-12 by_pdg'
														key={item.uniqueSerial}>
														<div class='crane_container'>
														<p class="newtext2"><i class="fa fa-check-circle ver_icn"></i> Certified</p>
															<div class='carbox '>
																{item?.bookingFlag === "Y" ? (
																	<>
																		<div className='bokd_pic'>
																			<img
																				className=''
																				src='images/booked.png'
																			/>
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
																				(image) =>
																					image.imageName === "Front"
																			) && (
																					<img
																						src={
																							item?.modelImages.find(
																								(image) =>
																									image.imageName === "Front"
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
																			{item.vehBrandCode}{" "}
																			{item.vehModelCode}
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
																					singleProducthandle(
																						item.uniqueSerial
																					);
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
											</div>
										</>
									) : (
										<>
											<div className='box_mn1 box_by_cr'>
												{demo.length === 0 ? (
													<p
														style={{
															fontSize: "30px",
															color: "palevioletred",
															/* width: 708px; */
															/* background-color: gray; */
															fontSize: "32px",
															fontStyle: "revert",
														}}>
														Stock Not Available
													</p>
												) : (
													<>
														{demo.map((item) => (
															<div
																class='col-md-4 col-sm-6 col-xs-12 by_pdg'
																key={item.uniqueSerial}>
																<div class='crane_container by_pdg'>
																<p class="newtext2"><i class="fa fa-check-circle ver_icn"></i> Certified</p>
																	<div class='carbox '>
																		{item?.bookingFlag === "Y" ? (
																			<>
																				<div className='bokd_pic'>
																					<img
																						className=''
																						src='images/booked.png'
																					/>
																				</div>
																			</>
																		) : (
																			""
																		)}
																		<a
																			class='img-carbox '
																			onClick={() => {
																				singleProducthandle(
																					item.uniqueSerial
																				);
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
																			) :
																				(
																					<>
																						{item?.modelImages.some(
																							(image) =>
																								image.imageName === "Front"
																						) && (
																								<img
																									src={
																										item?.modelImages.find(
																											(image) =>
																												image.imageName ===
																												"Front"
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
																					{item.vehBrandCode}{" "}
																					{item.vehModelCode}
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
																							singleProducthandle(
																								item.uniqueSerial
																							);
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
										</>
									)}
								</div>





							</div>
						</div>
					</div>
				</div>

			</div>

			<Footer />
		</div>
	);
};

export default BuyerCar;

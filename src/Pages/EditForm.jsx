import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";

const EditForm = () => {
	const Props = localStorage.getItem("cardetails");
	const PropsData = JSON.parse(Props);
	const {
		vehOwnerName,
		vehOdometer,
		insuranceType,
		setTextInput4,
		textInput2,
		insuranceCompany,
		insuranceDatetime,
		lastname,
		vehOwnerMobile,
		vehOwnerEmail,
		vehOwnerSerial,
		vehBrand,
		vehFuel,
		vehModel,
		insurDate,
		vehRegn1,
		vehRegn2,
		vehExteriorColor,
		vehVariant,
		vehRegnNo,
		vehManufactureYear,
		transmissionCode,
		sellingPrice,
		Regno1,
		Regno2,
	} = PropsData;
	const formatDate = (inputDate) => {
		const monthNames = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];

		const date = new Date(inputDate);
		const day = date.getDate();
		const monthIndex = date.getMonth();
		const year = date.getFullYear().toString().slice(-2);

		const formattedDay = day < 10 ? `0${day}` : day;

		const formattedMonth = monthNames[monthIndex];

		return `${formattedDay}-${formattedMonth}-${year}`;
	};
	const [openprice, setOpenprice] = useState(false);
	const [openyear, setOpenyear] = useState(false);
	const [opendriven, setOpendriven] = useState(false);
	const [openmanuf, setOpenmanuf] = useState(false);
	const [openbodytype, setOpenbodytype] = useState(false);
	const [openfueltype, setOpenfueltype] = useState(false);
	const [openTransmission, setOpenTransmission] = useState(false);
	const [stockdata, setStockdata] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [selectedValue, setSelectedValue] = useState(null);
	const [searchResults, setSearchResults] = useState([]);
	const [demo, setDemo] = useState([]);
	const [data, setData] = useState([]);
	const [model, setModel] = useState([]);
	const [source, setSource] = useState([]);
	const [varient, setVarient] = useState([]);
	const [vyear, setVechileYear] = useState([]);
	const [fueldata, setFuelData] = useState([]);
	const [transmission, setTransmission] = useState([]);
	const [selectbodytype, setselectbodytype] = useState(vehOwnerSerial);
	const [kmsDriven, setkmsDriven] = useState("SELF");
	const [selectfuel, setSelectFuel] = useState(
		vehFuel ? vehFuel?.description : "NA"
	);
	const [resourcedata, setResoucedata] = useState("");
	const [selecttype, setSelecttype] = useState("");
	const [selecttransmission, setSelecttransmission] =
		useState(transmissionCode);
	const [selectextirecolor, setSelectextirecolor] = useState(
		vehExteriorColor ? vehExteriorColor?.description : "NA"
	);
	const [selectmfy, setSelectmfy] = useState(
		vehManufactureYear ? vehManufactureYear?.description : "NA"
	);

	//CAR DETAILS
	const [carBrand, setCarBrand] = useState(vehBrand?.description);
	const [carModal, setCarModal] = useState(vehModel?.code);
	const [carVariant, setCarVariant] = useState(
		vehVariant ? vehVariant?.code : "NA"
	);

	const [selectedMake, setSelectedMake] = useState([]);
	const [selectedModel, setSelectedModel] = useState();
	const [selectedVariant, setSelectedVariant] = useState("");
	const [showdata, setShowdata] = useState(false);
	const [result, setResult] = useState("");
	const [makedatarequest, setMake] = useState([]);
	const [inputvalue, setInputvalue] = useState("");
	const [typedata, setDatatype] = useState([]);
	const [vmonth, setVechileMonth] = useState([]);
	const [extirecolor, setExtirearColor] = useState([]);
	const [selectmfm, setSelectmfm] = useState("");
	const [vehchileCate, setVehchileCate] = useState([0]);
	const [sellingPrices, setSellingPrice] = useState(sellingPrice);
	const [ownerSerialno, setownerSerialno] = useState([]);
	const [name, setname] = useState(vehOwnerName);
	const [ownerLastname, setlastname] = useState(lastname);
	const [mobile, setmobile] = useState(vehOwnerMobile);
	const [email, setemail] = useState(vehOwnerEmail);
	const [insurencecompany, setinsurencecompany] = useState([]);
	const [insurenceType, setinsurenceType] = useState([]);
	const [insurencevalid, setinsurencevalid] = useState([]);
	const [insurence, setInsurence] = useState([]);
	const [selectinsurencecompany, setselectinsurencecompany] = useState("");
	const [selectinsurenceType, setselectinsurenceType] = useState("");
	const [selectinsurencevalid, setselectinsurencevalid] = useState("");
	const [selectbranch, setselectbranch] = useState("DEL01");
	const [selectsellinp, setselectsellinp] = useState("");
	const [odometer, setodometer] = useState(vehOdometer);
	const [regno, setregno] = useState("");
	const [selectedItem1, setSelectedItem1] = useState("");
	const [selectedItem2, setSelectedItem2] = useState("");
	const [selectedItem3, setSelectedItem3] = useState(
		insuranceDatetime && formatDate(insuranceDatetime)
	);
	const [selectedValues, setSelectedValues] = useState([]);
	const [textInput, setTextInput] = useState("");
	const [selectCategory, setselectCategory] = useState(
		"SHORT_LIST_WEBSITE_HOME_PAGE"
	);
	const [registrationNumber1, setRegistrationNumber1] = useState(vehRegn1);
	const [registrationNumber2, setRegistrationNumber2] = useState(vehRegn2);
	const [renderedText, setRenderedText] = useState("");
	const [apidata, setapidata] = useState([]);

	const handleInputChange = (event) => {
		let inputValue = event.target.value;

		if (inputValue.length <= 6) {
			setRegistrationNumber1(inputValue.toUpperCase());
		}
	};

	const handleInputChangereg = (event) => {
		let inputValue = event.target.value;

		inputValue = inputValue.replace(/\D/g, "");

		if (inputValue.length <= 4) {
			setRegistrationNumber2(inputValue);
		}
	};

	const onChangeMobile = (event) => {
		let inputmobile = event.target.value;
		inputmobile = inputmobile.replace(/\D/g, "");

		if (inputmobile.length <= 10) {
			setmobile(inputmobile);
		}
	};

	const handleSubmit1 = (event) => {
		event.preventDefault();
		const combinedData = [registrationNumber1, registrationNumber2];
		setRenderedText(combinedData);
	};

	const handleDropdownChange = (event, dropdownNumber) => {
		const selectedValue = event.target.value;

		if (dropdownNumber === 1) {
			setSelectedItem1(selectedValue);
			setTextInput([...textInput, selectedItem1]);
		} else if (dropdownNumber === 2) {
			setSelectedItem2(selectedValue);
			setTextInput([...textInput, selectedItem2]);
		} else if (dropdownNumber === 3) {
			setSelectedItem3(selectedValue);
			setTextInput([...textInput, selectedItem3]);
		}
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
				// budgetFrom: 0,
				// budgetTo: 2000000,
				vehBrandCode: "ALL",
				vehModelCode: "ALL",
				vehFuel: "ALL",
				loginCompanyID: "ZOOMWHEEL",
				loginUserId: "MANJEET",
				loginIpAddress: "7C:46:85:53:E2:33",
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
				} else {
					throw new Error(
						`Request failed with status code: ${response.status}`
					);
				}
			} catch (error) {}
		};

		fetchData();
	}, []);

	const singleProducthandle = (uniqueSerial) => {
		const product = stockdata.find(
			(item) => item.uniqueSerial === uniqueSerial
		);

		setSelectedProduct(product);
		// navigate("/details");
	};

	const BranchList = [
		{
			id: "DEL01",
			discription: "DELHI",
		},
	];

	const kmsmeter = [
		{
			id: "SELF",
			discription: "SELF",
		},
	];

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
			calledBy: "OWNER_SERIAL",
			loginUserId: "MANJEET",
			loginIpAddress: "7C:46:85:53:E2:33",
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
				setownerSerialno(generalList);
			})
			.catch((error) => {});
	}, []);

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
			calledBy: "VEH_CATEGORY",
			loginUserId: "MANJEET",
			loginIpAddress: "7C:46:85:53:E2:33",
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
				setVehchileCate(generalList);
			})
			.catch((error) => {});
	}, []);
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
			loginIpAddress: "7C:46:85:53:E2:33",
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
			vehMake: carBrand,

			loginUserId: "MANJEET",
			loginIpAddress: "7C:46:85:53:E2:33",
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
				// console.log(generalList, "MODELLIST");
			})
			.catch((error) => {
				console.error(error);
			});
	}, [carBrand]);

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
			loginIpAddress: "7C:46:85:53:E2:33",
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
			vehMake: carBrand,
			vehModel: carModal,

			loginUserId: "MANJEET",
			loginIpAddress: "7C:46:85:53:E2:33",
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
	}, [carModal, carBrand]);

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
			loginIpAddress: "7C:46:85:53:E2:33",
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
			loginIpAddress: "7C:46:85:53:E2:33",
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
			loginIpAddress: "7C:46:85:53:E2:33",
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
			loginIpAddress: "7C:46:85:53:E2:33",
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

			vehMake: carBrand,
			vehModel: carModal,
			loginUserId: "MANJEET",
			loginIpAddress: "7C:46:85:53:E2:33",
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
	}, [carBrand, carModal]);
	useEffect(() => {
		const url =
			"https://mobile.Orbitsys.com/OrbitsysSmbApiDemo/UsedCar/GetUsedCarInsuInfo";
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
			uniqueSerial: "30",
			loginUserId: "EVALUATOR",
			loginIpAddress: "7C:46:85:53:E2:33",
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
				const generalList = jsonData?.insuranceType.dataPointCollections;
				const generalList1 = jsonData?.insuranceCompany.dataPointCollections;
				const generalList2 = jsonData?.insuranceValidUpto;

				setinsurenceType(generalList);
				setinsurencecompany(generalList1);
				setinsurencevalid(generalList2);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const handleSelectbranch = (event) => {
		setselectbranch(event.target.value);
	};

	const handleSelectCategory = (event) => {
		setselectCategory(event.target.value);
	};

	const handleCarBrandChange = (event) => {
		if (event != null) {
			setCarBrand(event.target.value);
			setCarBrand(event.target.value);
		} else {
			setCarBrand(carBrand);
			setCarBrand(carBrand);
			setSelectedModel(carModal);
		}
	};

	const handleSelectChange2 = (event) => {
		setSelecttype(event.target.value);
	};

	const handleCarModalChange = (event) => {
		if (event != null) {
			setCarModal(carModal);
			setCarModal(event.target.value);
		}
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
	const handleCarVariantChange = (event) => {
		setCarVariant(event.target.value);
	};

	const handleSelectBodyType = (event) => {
		setselectbodytype(event.target.value);
	};

	const handleSelectKmsType = (event) => {
		setkmsDriven(event.target.value);
	};

	const handleSelectsellprize = (event) => {
		setselectsellinp(event.target.value);
	};

	const selectcompanydata = (event) => {
		setselectinsurencecompany(event.target.value);
	};
	const selectInsurence1 = (event) => {
		setselectinsurenceType(event.target.value);
	};

	const saveInsurenceDetail = (e) => {
		e.preventDefault();
		const AllData1 = {
			selectinsurencevalid: selectinsurencevalid,
			selectinsurenceType: selectinsurenceType,
			selectinsurencecompany: selectinsurencecompany,
		};

		setInsurence(AllData1);
	};

	const navigate = useNavigate();

	const vechilSubmit = async (e) => {
		// if (!selectedItem3) {
		// 	toast.error("Please enter the Insurance Date.");
		// 	return;
		// }
		try {
			e.preventDefault();
			const Datasecondapi = {
				brandCode: "UC",
				countryCode: "IN",
				companyId: "ZOOMWHEEL",
				branchCode: "DEL01",
				uniqueSerial: PropsData.uniqueSerial,
				mobile: mobile,
				email: email,
				firstName: name,
				source: "26",
				brand: carBrand,
				model: carModal,
				exteriorColor: selectextirecolor,
				variantCode: carVariant,
				ownerSerial: selectbodytype,
				transmissionCode: selecttransmission,
				regnFormat: "MT",
				regnPart4: "",
				vehicleRegnNo: [registrationNumber1, registrationNumber2]
					.filter(Boolean)
					.join("-"),
				mfdYear: selectmfy,
				fuel: selectfuel,
				sellingPrice: sellingPrices,
				regn1: registrationNumber1,
				regn2: registrationNumber2,
				Kms: odometer,
				loginCompanyID: "ZOOMWHEEL",
				loginUserId: "MANJEET",
				CALLEDBY: "STOCK_MANUAL_UPLOAD",
				loginIpAddress: "7C:46:85:53:E2:33",
				NOCTYPELIST: [
					{
						ID: "0",
						TYPE: "",
						VALIDUPTO: "",
					},
				],
			};

			const saveAddvehicle = await fetch(
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
					body: JSON.stringify(Datasecondapi),
				}
			);

			const featuresDataResult = await saveAddvehicle.json();
			toast.success(featuresDataResult.result);
			navigate("/admin");

			const insureceSaving = {
				brandCode: "UC",
				countryCode: "IN",
				companyId: "ZOOMWHEEL",
				uniqueSerial: PropsData.uniqueSerial,
				insuranceType: selectedItem1,
				insuranceCompany: selectedItem2,
				insuranceValidUpto: selectedItem3,
				loginUserId: "MANJEET",
				loginIpAddress: "7C:46:85:53:E2:33",
			};

			const insureceApiSate = await fetch(
				"https://mobile.Orbitsys.com/OrbitsysSmbApiDemo/UsedCar/SaveInsuInfo",
				{
					method: "POST",
					headers: {
						ApplicationMode: "ONLINE",
						EnvironmentType: "DEMO",
						BrandCode: "UC",
						CountryCode: "IN",
						"Content-Type": "application/json",
					},
					body: JSON.stringify(insureceSaving),
				}
			);

			const priceDataResult = await insureceApiSate.json();
		} catch (error) {
			toast.error("An error occurred. Please try again later.");
			console.error("Error:", error);
		}
	};

	return (
		<div className=''>
			<div className=' col-xl-12 bg-black' id='header'>
				<div className='row row-cols-md-2 m-2 p-4 row-cols-lg-2 row-cols-xl-2 font-weight-bold'>
					<span className='text-left text-light '>
						<Link style={{ color: "white", marginLeft: "-10px" }} to='/admin'>
							<ArrowBackIcon
								style={{ marginRight: "41px", fontSize: "30px" }}
							/>
						</Link>{" "}
						Edit Stock
					</span>
				</div>
			</div>
			<section className='' style={{ marginLeft: "-24px" }}>
				<form
					id='consultation-form'
					className='feed-form'
					onSubmit={vechilSubmit}>
					<div className='row'>
						<div className='col-md-3 col-sm-6 col-xs-12'>
							Name
							<input
								required=''
								className='admintextbox'
								placeholder='Name'
								type='text'
								value={name}
								name='name'
								onChange={(e) => setname(e.target.value)}
							/>
						</div>
						<div className='col-md-3 col-sm-6 col-xs-12'>
							Last Name{" "}
							<input
								className='admintextbox'
								name='lastname'
								required=''
								placeholder='Last Name'
								type='text'
								value={ownerLastname}
								onChange={(e) => setlastname(e.target.value)}
							/>
						</div>

						<div className='col-md-3 col-sm-6 col-xs-12'>
							{" "}
							E-Mail
							<input
								className='admintextbox'
								name='email'
								required=''
								placeholder='E-Mail'
								type='email'
								value={email}
								onChange={(e) => setemail(e.target.value)}
							/>
						</div>

						<div className='col-md-3 col-sm-6 col-xs-12'>
							Phone Number{" "}
							<input
								className='admintextbox'
								required=''
								name='mobile'
								value={mobile}
								onChange={onChangeMobile}
								placeholder='Phone Number'
							/>
						</div>
					</div>

					<div className='row'>
						<div className='col-md-3 col-sm-6 col-xs-12'>
							<div class=''>
								Branch
								<select
									placeholder='heloo'
									id=''
									disabled
									className='admintextbox'
									value={selectbranch}
									onChange={handleSelectbranch}>
									<option value='' placeholder='heloo'>
										Branch
									</option>

									{BranchList.map((item, id) => (
										<option key={id} value={item.id}>
											{item.discription}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className='col-md-3 col-sm-6 col-xs-12'>
							<div class=''>
								Aggregator
								<select
									id=''
									className='admintextbox'
									value={kmsDriven}
									onChange={handleSelectKmsType}>
									<option value=''>Aggregator </option>

									{kmsmeter.map((item, id) => (
										<option key={id} value={item.id}>
											{item.discription}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className='col-md-3 col-sm-6 col-xs-12'>
							<div class=''>
								Brand
								<select
									id=''
									class=''
									className='admintextbox'
									value={carBrand}
									onChange={handleCarBrandChange}>
									<option value=''>Brand </option>

									{data.map((item, index) => (
										<option key={index} value={item.code}>
											{item.description}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className='col-md-3 col-sm-6 col-xs-12'>
							<div class=''>
								Model
								<select
									id=''
									className='admintextbox'
									value={carModal}
									onChange={handleCarModalChange}>
									<option value=''>Model </option>

									{model.map((item, index) => (
										<option key={index} value={item.code}>
											{item.description}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>

					<div className='row'>
						<div className='col-md-3 col-sm-6 col-xs-12'>
							<div class=''>
								Fuel
								<select
									id=''
									className='admintextbox'
									value={selectfuel}
									onChange={handleSelectChange4}>
									<option value=''>Fuel</option>

									{fueldata.map((item, index) => (
										<option key={index} value={item.code}>
											{item.description}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className='col-md-3 col-sm-6 col-xs-12'>
							<div class=''>
								Variant
								<select
									id=''
									className='admintextbox'
									value={carVariant}
									defaultValue={carVariant}
									onChange={handleCarVariantChange}>
									<option value=''>Variant </option>

									{varient.map((item, index) => (
										<option key={index} value={item.code}>
											{item.description}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className='col-md-3 col-sm-6 col-xs-12'>
							Ext.Color
							<div class=''>
								<select
									id=''
									className='admintextbox'
									value={selectextirecolor}
									onChange={handleSelectChange6}>
									<option value=''>Ext.Color </option>

									{extirecolor.map((item, index) => (
										<option key={index} value={item.code}>
											{item.description}
										</option>
									))}
								</select>
							</div>
						</div>

						<div class='col-md-3 col-sm-6 col-xs-12'>
							Transmission
							<select
								id=''
								className='admintextbox'
								value={selecttransmission}
								onChange={handleSelectChange5}>
								<option value=''>Transmission </option>

								{transmission.map((item, index) => (
									<option key={index} value={item.code}>
										{item.description}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className='row'>
						<div class='col-md-3 col-sm-6 col-xs-12'>
							Mfg. Year
							<select
								id=''
								className='admintextbox'
								value={selectmfy}
								onChange={handleSelectChange7}>
								<option value=''>Mfg. Year</option>

								{vyear.map((item, index) => (
									<option key={index} value={item.code}>
										{item.description}
									</option>
								))}
							</select>
						</div>

						<div class='col-md-3 col-sm-6 col-xs-12'>
							Owner Serial No.
							<select
								id=''
								className='admintextbox'
								value={selectbodytype}
								onChange={handleSelectBodyType}>
								<option value=''>Owner Serial No.</option>

								{ownerSerialno.map((item, index) => (
									<option key={index} value={item.code}>
										{item.description}
									</option>
								))}
							</select>
						</div>

						<div class='col-md-3 col-sm-6 col-xs-12'>
							Odometer
							<input
								name='odometer'
								value={odometer}
								onChange={(e) => setodometer(e.target.value)}
								required=''
								placeholder='Odometer'
								type='text'
								className='admintextbox'
							/>
						</div>

						<div class='col-md-3 col-sm-6 col-xs-12'>
							Registration No.
							<input
								id='uppercase'
								required=''
								placeholder='Registration No.'
								type='text'
								value={[registrationNumber1, registrationNumber2]
									.filter(Boolean)
									.join("-")}
								readOnly
								className='admintextbox'
								data-toggle='modal'
								data-target='#staticBackdrop'
							/>
						</div>

						<div
							class='modal fade'
							id='staticBackdrop'
							data-backdrop='static'
							tabindex='-1'
							role='dialog'
							aria-labelledby='staticBackdropLabel'
							aria-hidden='true'>
							<div class='modal-dialog' role='document'>
								<div class='modal-content'>
									<div class='modal-header'>
										<h4 class='modal-title' id='staticBackdropLabel'>
											Add Registration Number
										</h4>
										<button
											type='button'
											class='close'
											data-dismiss='modal'
											aria-label='Close'>
											<span aria-hidden='true'>&times;</span>
										</button>
									</div>
									<div class='modal-body'>
										<input
											id='regnumberinput1'
											required=''
											placeholder='Registration No. 1'
											type='text'
											value={registrationNumber1}
											onChange={handleInputChange}
											className='admintextbox'
										/>

										<input
											id='regnumberinput'
											style={{ margingTop: "20px" }}
											required=''
											placeholder='Registration No. 2'
											type='number'
											value={registrationNumber2}
											onChange={handleInputChangereg}
											className='admintextbox'
										/>
									</div>
									<div class='modal-footer'>
										<button
											style={{
												borderRadius: "7px",
												height: "40px",
												width: "88px",
												backgroundColor: "#1976d2",
												color: "white",
											}}
											type='btn'
											class='close'
											data-dismiss='modal'
											aria-label='Close'>
											<span aria-hidden='true'>Done</span>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='row'>
						<div class='col-md-3 col-sm-6 col-md-12'>
							{/* Insurance Date
							<input
								placeholder='Insurance'
								type='text'
								className='admintextbox'
								value={selectedItem3}
								name='insurence'
								onChange={(e) => handleDropdownChange(e, 3)}
								data-toggle='modal'
								data-target='#staticBackdrop1'
							/> */}
							Insurance Date
							<input
								placeholder='Insurance Date'
								value={selectedItem3}
								onChange={(e) => handleDropdownChange(e, 3)}
								className='admintextbox'
							/>
						</div>

						{/* <div
							class='modal fade'
							id='staticBackdrop1'
							data-backdrop='static'
							tabindex='-1'
							role='dialog'
							aria-labelledby='staticBackdropLabel'
							aria-hidden='true'>
							<div class='modal-dialog' role='document'>
								<div class='modal-content'>
									<div class='modal-header'>
										<h4 class='modal-title' id='staticBackdropLabel'>
											Insurance Info
										</h4>
										<button
											type='button'
											class='close'
											data-dismiss='modal'
											aria-label='Close'>
											<span aria-hidden='true'>&times;</span>
										</button>
									</div>
									<div class='modal-body'>
										<select
											className='admintextbox'
											value={selectedItem1}
											onChange={(e) => handleDropdownChange(e, 1)}>
											<option value=''>Insurance Type</option>

											{insurenceType.map((item, index) => (
												<option key={index} value={item.code}>
													{item.dataDescription}
												</option>
											))}
										</select>
										<select
											className='admintextbox'
											value={selectedItem2}
											onChange={(e) => handleDropdownChange(e, 2)}>
											<option value=''>Company Name</option>

											{insurencecompany.map((item, index) => (
												<option key={index} value={item.dataCode}>
													{item.dataDescription}
												</option>
											))}
										</select>
										
									</div>
									<div class='modal-footer'>
										<button
											style={{
												borderRadius: "5px",
												width: "83px",
												height: "49px",
												backgroundColor: "red",
												color: "white",
											}}
											type='btn '
											class='close'
											data-dismiss='modal'
											aria-label='Close'>
											<span aria-hidden='true'>Done</span>
										</button>
									</div>
								</div>
							</div>
						</div> */}

						<div class='col-md-3 col-sm-6 col-md-12'>
							Selling Price
							<input
								required=''
								placeholder='Selling Price'
								type='text'
								value={sellingPrices}
								className='admintextbox'
								name='sellingPrices'
								onChange={(e) => setSellingPrice(e.target.value)}
							/>
						</div>

						<div className='col-md-3 col-sm-6 col-md-12'>
						Category
							<div class=''>
								<select
									id=''
									className='admintextbox'
									value={selectCategory}
									onChange={handleSelectCategory}>
									<option value=''>Vehicle Category</option>

									{vehchileCate.map((item, index) => (
										<option key={index} value={item.code}>
											{item.description}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>

					<div className='col-md-3 col-sm-6 col-xs-12 d-flex'>
						{" "}
						<button class='admin_submit'>Submit</button>
						<button
							class='admin_submit'
							type='reset'
							style={{ marginLeft: "10px" }}>
							Reset
						</button>
					</div>
				</form>
			</section>
		</div>
	);
};

export default EditForm;

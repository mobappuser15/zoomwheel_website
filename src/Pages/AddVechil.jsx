import React, { useState, useEffect } from "react";
import "./admin.css";
import StoreVechileTable from "./StoreVechileTable";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AddVechil = ({ uniquekey }) => {
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
	const [selectbodytype, setselectbodytype] = useState("");
	const [kmsDriven, setkmsDriven] = useState("SELF");
	const [selectedItem, setSelectedItem] = useState("");
	const [resourcedata, setResoucedata] = useState("");
	const [selecttype, setSelecttype] = useState("");
	const [selectmodel, setSelectmodel] = useState("");
	const [selectfuel, setSelectFuel] = useState("");
	const [selecttransmission, setSelecttransmission] = useState("");
	const [selectextirecolor, setSelectextirecolor] = useState("");
	const [selectmfy, setSelectmfy] = useState("");
	const [selectverient, setSelectverient] = useState("");
	const [codemodel, setcodemodel] = useState("");
	const [codemake, setcodemake] = useState("");
	const [codevarient, setvarientdata] = useState([]);
	const [minRange, setMinRange] = useState("");
	const [maxRange, setMaxRange] = useState("");
	const [selectedMake, setSelectedMake] = useState([]);
	const [selectedModel, setSelectedModel] = useState("");
	const [selectedVariant, setSelectedVariant] = useState("");
	const [showdata, setShowdata] = useState(false);
	const [selectedItems, setSelectedItems] = useState([]);
	const [result, setResult] = useState("");
	const [makedatarequest, setMake] = useState([]);
	const [inputvalue, setInputvalue] = useState("");
	const [typedata, setDatatype] = useState([]);
	const [vmonth, setVechileMonth] = useState([]);
	const [extirecolor, setExtirearColor] = useState([]);
	const [selectmfm, setSelectmfm] = useState("");
	const [vehchileCate, setVehchileCate] = useState([0]);
	const [sellingPrice, setSellingPrice] = useState("");
	const [ownerSerialno, setownerSerialno] = useState([]);
	const [name, setname] = useState("");
	const [lastname, setlastname] = useState("");
	const [mobile, setmobile] = useState("");
	const [email, setemail] = useState("");
	const [insurencecompany, setinsurencecompany] = useState([]);
	const [insurenceType, setinsurenceType] = useState([]);
	const [insurencevalid, setinsurencevalid] = useState([]);
	const [insurence, setInsurence] = useState([]);
	const [selectinsurencecompany, setselectinsurencecompany] = useState("");
	const [selectinsurenceType, setselectinsurenceType] = useState("");
	const [selectinsurencevalid, setselectinsurencevalid] = useState("");
	const [selectbranch, setselectbranch] = useState("DEL01");
	const [selectsellinp, setselectsellinp] = useState("");
	const [odometer, setodometer] = useState("");
	const [regno, setregno] = useState("");
	const [selectedItem1, setSelectedItem1] = useState("");
	const [selectedItem2, setSelectedItem2] = useState("");
	const [selectedItem3, setSelectedItem3] = useState("");
	const [selectedValues, setSelectedValues] = useState([]);
	const [textInput, setTextInput] = useState("");
	const [selectCategory, setselectCategory] = useState(
		"SHORT_LIST_WEBSITE_HOME_PAGE"
	);
	const [textInput2, setTextInput2] = useState("");
	const [textInput4, setTextInput4] = useState("");
	const [renderedText, setRenderedText] = useState("");
	const [apidata, setapidata] = useState([]);

	const handleInputChange = (event) => {
		let inputValue = event.target.value;

		// inputValue = inputValue.replace(/[^A-Za-z]/g, "");

		if (inputValue.length <= 6) {
			setTextInput2(inputValue.toUpperCase());
		}
	};
	const handleInputChangereg = (event) => {
		let inputValue = event.target.value;

		inputValue = inputValue.replace(/\D/g, "");

		if (inputValue.length <= 4) {
			setTextInput4(inputValue);
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
		const combinedData = [textInput2, textInput4];
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

	// branch list api
	// useEffect(() => {
	// 	const url =
	// 		"https://mobile.Orbitsys.com/OrbitsysSmbApiDemo/UsedCar/GetGeneralMaster";
	// 	const headers = {
	// 		ApplicationMode: "ONLINE",
	// 		EnvironmentType: "DEMO",
	// 		BrandCode: "UC",
	// 		CountryCode: "IN",
	// 		"Content-Type": "application/json",
	// 	};
	// 	const data = {
	// 		brandCode: "UC",
	// 		countryCode: "IN",
	// 		companyId: "ZOOMWHEEL",
	// 		calledBy: "Outlet",
	// 		loginUserId: "MANJEET",
	// 		loginIpAddress: "7C:46:85:53:E2:33",
	// 	};

	// 	fetch(url, {
	// 		method: "POST",
	// 		headers: headers,
	// 		body: JSON.stringify(data),
	// 	})
	// 		.then((response) => {
	// 			if (response.ok) {
	// 				return response.json();
	// 			} else {
	// 				throw new Error(
	// 					`Request failed with status code: ${response.status}`
	// 				);
	// 			}
	// 		})
	// 		.then((jsonData) => {
	// 			const generalList = jsonData?.generalMasterList[0].generalList;
	// 			setownerSerialno(generalList);
	// 		})
	// 		.catch((error) => {});
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
			calledBy: "MODEL",
			vehMake: codemodel,

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
			})
			.catch((error) => {});
	}, [codemodel]);

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

			calledBy: "VARIANT",
			vehMake: codemodel,
			vehModel: codemake,

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
			.catch((error) => {});
	}, [codemake, codemodel]);

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
			.catch((error) => {});
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
			.catch((error) => {});
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
			.catch((error) => {});
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
			.catch((error) => {});
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
			.catch((error) => {});
	}, [codemodel, codemake]);

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
			.catch((error) => {});
	}, []);

	const handleSelectbranch = (event) => {
		setselectbranch(event.target.value);
	};

	const handleSelectCategory = (event) => {
		setselectCategory(event.target.value);
	};

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
		try {
			e.preventDefault();
			

			if (!selectedItem) {
				toast.error("Brand is required");
				return;
			  } 
		  
			  if (!selectmodel) {
				toast.error("Model  is required");
				return;
			  } 


			  if (!selectverient) {
				toast.error("Variant  is required");
				return;
			  } 

			  if (!selectextirecolor) {
				toast.error("Color is required");
				return;
			  } else 

			  if (!selectfuel) {
				toast.error("Fuel is required");
				return;
			  } 

			  if (!selecttransmission) {
				toast.error("Transmission is required");
				return;
			  } 
			  if (!odometer) {
				toast.error("KMS DRIVEN is required");
				return;
			  } 

			  if (!selectmfy) {
				toast.error("Year is required");
				return;
			  }

			  if (!selectbodytype) {
				toast.error("Owner Serial no. is required");
				return;
			  } 

			  if (!sellingPrice) {
				toast.error("Selling Price is required");
				return;
			  } 
			  if (!selectCategory) {
				toast.error("vehicle Category is required");
				return;
			  }


			  if (!selectedItem3) {
				toast.error("Insurance Date is required");
				return;
			  } 
		  
			 
		  

			const Datasecondapi = {
				brandCode: "UC",
				countryCode: "IN",
				companyId: "ZOOMWHEEL",
				branchCode: selectbranch,
				uniqueSerial: "0",
				mobile: mobile,
				email: email,
				firstName: name,
				middleName: "",
				lastName: lastname,
				source: "99",
				vehBrand: selectedItem,
				vehModel: selectmodel,
				vehVariant: selectverient,
				vehFuel: selectfuel,
				transMissionCode: selecttransmission,
				vehExteriorColor: selectextirecolor,
				vehOdometer: odometer,
				manufactureYear: selectmfy,
				vehInsurance: [selectedItem1, selectedItem2, selectedItem3]
					.filter(Boolean)
					.join(","),
				ownerSerial: selectbodytype,
				sellingPrice: sellingPrice,
				stockCategory: selectCategory,
				isExchange: "N",
				newCarVehModel: "",
				challanExist: "N",
				challanCount: "0",
				challanPaid: "0",
				calledby: "",
				insuDate: selectedItem3,
				kms: odometer,
				regnFormat: "PIN0001",
				vehRegnFormatPart1: "0",
				vehRegnFormatPart2: "0",
				vehRegnFormatPart3: "0",
				vehRegnFormatPart4: "0",
				vehRegn1: textInput2,
				vehRegn2: textInput4,
				vehicleRegnNo: "",
				vehRegn: [textInput2, textInput4].filter(Boolean).join("-"),
				mfdYear: selectmfy,
				fuel: selectfuel,
				aggregator: kmsDriven,
				nocTypeList: [{ Id: "0", Type: "", ValidUpto: "" }],
				loginCompanyID: "ZOOMWHEEL",
				loginUserId: "MANJEET",
				loginIpAddress: "7C:46:85:53:E2:33",
			};

			localStorage.setItem("data", JSON.stringify(Datasecondapi));

			const saveAddvehicle = await fetch(
				"https://mobile.orbitsys.com/OrbitsysSmbApiDemo/UsedCar/SaveUsedCarStock",
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
			navigate("/stocktable");

			const insureceSaving = {
				brandCode: "UC",
				countryCode: "IN",
				companyId: "ZOOMWHEEL",
				uniqueSerial: "0",
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
			// toast.error("An error occurred. Please try again later.");
		}
	};

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
						Add New Stock
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
						<span>Name</span>
							<input
							
								className='admintextbox'
								placeholder='Name'
								type='text'
								name='name'
								onChange={(e) => setname(e.target.value)}
							/>
						</div>
						<div className='col-md-3 col-sm-6 col-xs-12'>
						<span>Last Name</span>
							<input
								className='admintextbox'
								name='lastname'
							
								placeholder='Last Name'
								type='text'
							
								onChange={(e) => setlastname(e.target.value)}
							/>
						</div>

						<div className='col-md-3 col-sm-6 col-xs-12'>
						<span>Email</span>
							<input
								className='admintextbox'
								name='email'
							
								placeholder='E-Mail'
								type='email'
								onChange={(e) => setemail(e.target.value)}
							/>
						</div>

						<div className='col-md-3 col-sm-6 col-xs-12'>
						<span>Phone</span>
													
							<input
								className='admintextbox'
								// required
								name='mobile'
								value={mobile}
								onChange={onChangeMobile}
								placeholder='Phone Number'
							/>
						</div>
					</div>

					<div className='row'>
						<div className='col-md-3 col-sm-6 col-xs-12'>
						<span>Branch</span>
														<span style={{ color: "red", fontSize: "20px" }}>
															*
														</span>
							<div class=''>
								<select
									// required
									id=''
									disabled
									className='admintextbox'
									value={selectbranch}
									onChange={handleSelectbranch}>
									<option value='' >
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
						<span>Aggregator</span>
														<span style={{ color: "red", fontSize: "20px" }}>
															*
														</span>
							<div class=''>
								<select
									id=''
									// required
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
						<span>Brand</span>
														<span style={{ color: "red", fontSize: "20px" }}>
															*
														</span>
							<div class=''>
								<select
									// required
									className='admintextbox'
									value={selectedItem}
									onChange={handleSelectChange}>
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
						<span>Model</span>
														<span style={{ color: "red", fontSize: "20px" }}>
															*
														</span>
							<div class=''>
								<select
									// required
									className='admintextbox'
									value={selectmodel}
									onChange={handleSelectChange3}>
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
						<span>Fuel</span>
														<span style={{ color: "red", fontSize: "20px" }}>
															*
														</span>
							<div class=''>
								<select
									// required
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

						<span>Variant</span>
														<span style={{ color: "red", fontSize: "20px" }}>
															*
														</span>
							<div class=''>
								<select
									// required
									className='admintextbox'
									value={selectverient}
									onChange={handleSelectChange9}>
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
						<span>Ext.Color</span>
														<span style={{ color: "red", fontSize: "20px" }}>
															*
														</span>
							<div class=''>
								<select
									// required
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
						<span>Transmission</span>
														<span style={{ color: "red", fontSize: "20px" }}>
															*
														</span>
							<select
								// required
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
						<span>Year</span>
														<span style={{ color: "red", fontSize: "20px" }}>
															*
														</span>
							<select
								// required
								className='admintextbox'
								value={selectmfy}
								onChange={handleSelectChange7}>
								<option value=''> Year</option>

								{vyear.map((item, index) => (
									<option key={index} value={item.code}>
										{item.description}
									</option>
								))}
							</select>
						</div>

						<div class='col-md-3 col-sm-6 col-xs-12'>
						<span>Owner Serial No.</span>
														<span style={{ color: "red", fontSize: "20px" }}>
															*
														</span>
							<select
								// required
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
						<span>KMS Driven</span>
														<span style={{ color: "red", fontSize: "20px" }}>
															*
														</span>
							<input
								name='odometer'
								onChange={(e) => setodometer(e.target.value)}
								// required
								placeholder='Odometer'
								type='text'
								className='admintextbox'
							/>
						</div>

						<div class='col-md-3 col-sm-6 col-xs-12'>
						<span>Registration No.</span>
														<span style={{ color: "red", fontSize: "20px" }}>
															*
														</span>
							<input
								id='uppercase'
								// required
								placeholder='Registration No.'
								type='text'
								value={[textInput2, textInput4].filter(Boolean).join("-")}
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
											// required
											placeholder='Registration No. 1'
											type='text'
											value={textInput2}
											onChange={handleInputChange}
											className='admintextbox'
										/>

										<input
											id='regnumberinput'
											style={{ margingTop: "20px" }}
											// required
											placeholder='Registration No. 2'
											type='number'
											value={textInput4}
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
						<span>Insurance</span>
														<span style={{ color: "red", fontSize: "20px" }}>
															*
														</span>
							<input
								placeholder='Insurance'
								type='text'
								className='admintextbox'
								value={[selectedItem1, selectedItem2, selectedItem3]
									.filter(Boolean)
									.join(", ")}
								readOnly

								name='insurence'
								onChange={(e) => setInsurence(e.target.value)}
								data-toggle='modal'
								data-target='#staticBackdrop1'
							/>
						</div>

						<div
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
										// required
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
										// required
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
										<input
											type='date'
											// required
											placeholder='Insurance Date'
											value={selectedItem3}
											onChange={(e) => handleDropdownChange(e, 3)}
											className='admintextbox'
										/>
									</div>
									<div class='modal-footer'>
										<button
											style={{
												borderRadius: "5px",
												width: "83px",
												height: "49px",
												backgroundColor: "#1976d2",
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
						</div>

						<div class='col-md-3 col-sm-6 col-md-12'>
						<span>Selling Price</span>
														<span style={{ color: "red", fontSize: "20px" }}>
															*
														</span>
							<input
								// required
								placeholder='Selling Price'
								type='number'
								className='admintextbox'
								name='sellingPrice'
								onChange={(e) => setSellingPrice(e.target.value)}
							/>
						</div>

						<div className='col-md-3 col-sm-6 col-md-12'>

						<span>Vehicle Category</span>
														<span style={{ color: "red", fontSize: "20px" }}>
															*
														</span>
							<div class=''>
								<select
									// required
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

export default AddVechil;

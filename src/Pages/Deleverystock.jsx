import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Chip, Stack } from "@mui/material";
import "./admin.css";
import "./table.css";
import ReactLoading from "react-loading";
import Table from "react-bootstrap/Table";
import DataUpload from "./DataUpload";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const BookingStovk = ({
	detailspage,
	setDetailspage,
	company,
	username,
	uniquekey,
}) => {
	const [dataapi, setdataapi] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [uploadData, setuploaddata] = useState(null);
	const [currentpage, setCurrentPage] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");

	const itemsperpage = 15;
	const totalItems = dataapi.length;
	const totalPage = Math.ceil(totalItems / itemsperpage);

	const onPageChange = (page) => {
		setCurrentPage(page);
	};

	const Startindex = (currentpage - 1) * itemsperpage;
	const EndIndex = Startindex + itemsperpage;
	var currentData = dataapi.slice(Startindex, EndIndex);

	useEffect(() => {
		const fetchData = async () => {
			const url =
				"https://mobile.Orbitsys.com/OrbitsysSmbApiDemo/UsedCar/GetUsedCarLeadsByStatus";
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
				branchCode: "DEL01",
				dataGroup: "STOCK",
				dataType: "VEH_DELIVERY",
				dataPeriodType: "TODAY",
				dateFrom: "2023-09-19T00:00:00",
				dateTo: "2023-09-19T00:00:00",
				loginCompanyId: "ZOOMWHEEL",
				loginCompanyAccessProfile: "DEALER_RETAIL",
				loginEmpHierarchialGroup: "L0",
				loginEmpCode: "E10001",
				loginJobTypeCode: "MGT",
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
					setdataapi(responseData.usedCarLeads);

					// setDemo(responseData?.UsedCarVehStockDetail);
				} else {
					throw new Error(
						`Request failed with status code: ${response.status}`()
					);
				}
			} catch (error) {}
		};

		fetchData();
	}, []);

	const navigate = useNavigate();

	

	const singleProducthandle = (uniqueSerial) => {
		const product = dataapi.find(
			(itemdata) => itemdata.uniqueSerial === uniqueSerial
		);
		setSelectedProduct(product);
		setuploaddata(product.uniqueSerial);

		// navigate("/deleveryform");
		navigate(`/deleveryform?uniqueSerial=${product.uniqueSerial}`);
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

	const filteredData = dataapi.filter((itemdata) => {
		for (const key in itemdata) {
			if (itemdata.hasOwnProperty(key) && typeof itemdata[key] === "string") {
				if (itemdata[key].toLowerCase().includes(searchTerm.toLowerCase())) {
					return true;
				}
			}
		}
		return false;
	});

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	return (
		<div className=' hedr_mb_wo'>
			<div>
				<div className=' col-xl-12 bg-dark' id='header'>
					<div className='row row-cols-md-2 m-2 p-4 row-cols-lg-2 row-cols-xl-2 font-weight-bold'>
						<Link style={{ color: "white", marginLeft: "-20px" }} to='/admin'>
							<ArrowBackIcon style={{ fontSize: "20px" }} />
							<span
								className=' text-left text-light '
								style={{ marginLeft: "10px" }}>
								Vehicle Delivery{" "}
							</span>
						</Link>{" "}
						<span
							id='booking-count'
							className=' text-left text-right '
							style={{ color: "white" }}>
							{totalItems}{" "}
							<ReactHTMLTableToExcel
								id='test-table-xls-button'
								className='export btn '
								table='table-to-xls2'
								filename='tablexls'
								sheet='tablexls'
								buttonText={
									<>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='25'
											height='25'
											fill='#1976d2'
											class='bi bi-arrow-down-circle-fill'
											viewBox='0 0 16 16'>
											<path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z' />
										</svg>
									</>
								}
							/>{" "}
						</span>
					</div>
				</div>
			</div>

			<div class='search_mn'>
				<div class='container'>
					<div class='row'>
						<div class='search-text'>
							<div class=' text-center'>
								<div class='form'>
									<form id='search-form' class='form-search form-horizontal'>
										<input
											type='text'
											class='input-search'
											value={searchTerm}
											onChange={handleSearchChange}
											placeholder='Search'></input>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='wid_fixd'>
				<>
					<>
						<br></br>
						<div className='tableFixHead'>
							<table id='table-to-xls2'>
								<thead>
									<tr>
										<th style={{ width: "" }}>Lead ID</th>

										

										<th style={{ width: "" }}> Name</th>

									

										<th style={{ width: "" }}>Brand</th>

										<th style={{ width: "" }}>Model</th>
										<th style={{ width: "" }}>Variant</th>
										<th style={{ width: "" }}>Color</th>

										<th style={{ width: "" }}>Odometer</th>

										<th style={{ width: "" }}> Year</th>

										<th style={{ width: "" }}>Phone </th>
										<th style={{ width: "" }}>Regn. No.</th>

										<th style={{ border: "none", width: "" }}>Created Date</th>
									</tr>
								</thead>

								<tbody>
									{dataapi.length === 0 ? (
										<>
										<div className='tex_nodata '>
														No Lead Found
													</div>
										</>
									) : (
										<>
											{dataapi.filter((itemdata) =>
                  Object.values(itemdata)
                    .join(' ')
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ).map((itemdata) => (
												<tr
													key={itemdata.vehOwnerSerial}
													onClick={() =>
														singleProducthandle(itemdata.uniqueSerial)
													}>
													<td style={{ width: "" }}>
														<Link style={{ color: "black" }}>
															{itemdata.uniqueSerial}
														</Link>
													</td>


													<td style={{ width: "" }}>{itemdata.vehOwnerName}</td>

													

													<td style={{ width: "" }}>
														{/* {itemdata.vehBrand.description} */}
														{itemdata.vehBrand
														? itemdata.vehBrand.description
														: ""}
													</td>

													<td style={{ width: "" }}>
														{/* {itemdata.vehModel.description} */}
														{itemdata.vehModel
														? itemdata.vehModel.description
														: ""}
													</td>

													<td style={{ width: "" }}>
														{itemdata.vehVariant
															? itemdata.vehVariant.description
															: ""}
													</td>

													<td style={{ width: "" }}>
														{itemdata.vehExteriorColor
															? itemdata.vehExteriorColor.description
															: ""}
													</td>

													<td style={{ width: "" }}>{itemdata.vehOdometer}</td>

													<td style={{ width: "" }}>
														{/* {itemdata.vehManufactureYear.description} */}
														{itemdata.vehManufactureYear
														? itemdata.vehManufactureYear.description
														: ""}
													</td>

													<td style={{ width: "" }}>
														{itemdata.vehOwnerMobile}
													</td>

													<td style={{ width: "" }}>{itemdata.vehRegnNo}</td>

													<td style={{ width: "" }}>
														{itemdata.createDate &&
															formatDate(itemdata.createDate)}
													</td>
												</tr>
											))}
										</>
									)}
								</tbody>
							</table>
						</div>
					</>
				</>
			</div>
		</div>
	);
};

export default BookingStovk;

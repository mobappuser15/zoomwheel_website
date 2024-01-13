import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { Chip, Stack } from "@mui/material";
import ReactLoading from "react-loading";
import "./admin.css";
import Table from "react-bootstrap/Table";
import DataUpload from "./DataUpload";
import { useNavigate } from "react-router-dom";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import styled from "./../Components/Item";
import AddVechil from "./AddVechil";
import EditForm from "./EditForm";
import EditIcon from "@mui/icons-material/Edit";

const StoreVechileTable = ({
	detailspage,
	setDetailspage,
	company,
	username,
}) => {
	const [dataapi, setdataapi] = useState([]);
	const [formData, setFormData] = useState(null);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [uploadData, setuploaddata] = useState(null);
	const [uniquekey, setUniquekey] = useState();
	const [selectkmsvalue, setselectkmsvalue] = useState();
	const [textBox1Value, setTextBox1Value] = useState("");
	const [currentpage, setCurrentPage] = useState(1);
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

	const handleTextBox1Change = (event) => {
		const value = event.target.value;
		setTextBox1Value(value);
	};

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
			const data = 
			{
				brandCode: "UC",
				countryCode: "IN",
				companyId: "ZOOMWHEEL",
				branchCode: "DEL01",
				dataGroup: "STOCK",
				dataType: "VEH_IMG_UPLOAD",
				dataPeriodType: "TODAY",
				dateFrom: "2023-09-14T00:00:00",
				dateTo: "2023-11-14T00:00:00",
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

	const singleProducthandle = (uniqueSerial, vehOdometer) => {
		const product = dataapi.find(
			(itemdata) => itemdata.uniqueSerial === uniqueSerial,
			(itemdata) => itemdata.vehOdometer === vehOdometer
		);
		setSelectedProduct(product);
		setUniquekey(product.uniqueSerial);
		setuploaddata(product.uniqueSerial);
		setselectkmsvalue(product.vehOdometer);
		navigate(
			`/dataupload?uniquekey=${product.uniqueSerial}&vehOdometer=${product.vehOdometer}`
		);
	};

	const singleProducthandle1 = (uniqueSerial, vehOdometer) => {
		const product = dataapi.find(
			(item) => item.uniqueSerial === uniqueSerial,
			(item) => item.vehOdometer === vehOdometer
		);

		localStorage.setItem("cardetails", JSON.stringify(product));

		setSelectedProduct(product);
		navigate(
			`/editdata?uniquekey=${product.uniqueSerial}&vehOdometer=${product.vehOdometer}`
		);
	};
	const handleCloseForm = () => {
		// Close the form by resetting the state
		setFormData(null);
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

		// Pad the day with a leading zero if needed
		const formattedDay = day < 10 ? `0${day}` : day;

		// Get the month name from the array
		const formattedMonth = monthNames[monthIndex];

		return `${formattedDay}-${formattedMonth}-${year}`;
	};


	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	  };

	return (
		<div className=' hedr_mb_wo'>
			<div className=' col-xl-12 bg-dark' id='header'>
				<div className='row row-cols-md-2 m-2 p-4 row-cols-lg-2 row-cols-xl-2 font-weight-bold'>
					<Link style={{ color: "white", marginLeft: "-20px" }} to='/admin'>
					<ArrowBackIcon style={{ fontSize: "20px" }} />
						<span
							className=' text-left text-light '
							style={{ marginLeft: "10px" }}>
							Stock Dtails{" "}
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
							table='table-to-xls5'
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

			<div class='search_mn'>
				<div class='container'>
					<div class='row'>
						<div class='search-text'>
							<div class=' text-center'>
								<div class='form'>
									<form id='search-form' class='form-search form-horizontal'>
										<input
											type='text'
											class='bi bi-search input-search'
											name='searchTerm'
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
							<table id='table-to-xls5' className=''>
								<thead className='thead_byer'>
									<tr>
										<th class='' style={{ width: "" }}>
											Lead ID
										</th>

										

										<th class='' style={{ width: "" }}>
											{" "}
											Name
										</th>

										

										<th class='' style={{ width: "" }}>
											Brand
										</th>
										<th class='' style={{ width: "" }}>
											Model
										</th>
										<th class='' style={{ width: "" }}>
											Variant
										</th>
										<th class='' style={{ width: "" }}>
											Color
										</th>

										<th class='' style={{ width: "" }}>
											Email
										</th>

										<th class='' style={{ width: "" }}>
											Odometer
										</th>

										<th class='' style={{ width: "" }}>
											 Year
										</th>

										<th class='' style={{ width: "" }}>
											Phone 
										</th>

										<th class='' style={{ border: "none", width: "" }}>
											Created Date
										</th>

										
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
												<tr key={itemdata.vehOwnerSerial}>
													<td
														onClick={() =>
															singleProducthandle(itemdata.uniqueSerial)
														}
														class=''
														style={{ width: "" }}>
														<Link style={{ color: "black" }}>
															{itemdata.uniqueSerial}
														</Link>
													</td>

													

													<td
														onClick={() =>
															singleProducthandle(itemdata.uniqueSerial)
														}
														class=''
														style={{ width: "" }}>
														{itemdata.vehOwnerName}
													</td>

													

													<td
														onClick={() =>
															singleProducthandle(itemdata.uniqueSerial)
														}
														class=''
														style={{ width: "" }}>
														{itemdata.vehBrand
															? itemdata.vehBrand.description
															: ""}
													</td>

													<td
														onClick={() =>
															singleProducthandle(itemdata.uniqueSerial)
														}
														class=''
														style={{ width: "" }}>
														{itemdata.vehModel
															? itemdata.vehModel.description
															: ""}
													</td>

													<td
														onClick={() =>
															singleProducthandle(itemdata.uniqueSerial)
														}
														class=''
														style={{ width: "" }}>
														{itemdata.vehVariant
															? itemdata.vehVariant.description
															: "N/A"}
													</td>
													<td
														onClick={() =>
															singleProducthandle(itemdata.uniqueSerial)
														}
														class=''
														style={{ width: "" }}>
														{itemdata.vehExteriorColor
															? itemdata.vehExteriorColor.description
															: ""}
													</td>

													<td
														onClick={() =>
															singleProducthandle(itemdata.uniqueSerial)
														}
														class=''
														style={{ width: "" }}>
														{itemdata.vehOwnerEmail}
													</td>

													<td
														onClick={() =>
															singleProducthandle(itemdata.uniqueSerial)
														}
														class=''
														style={{ width: "" }}>
														{itemdata.vehOdometer}
													</td>

													<td
														onClick={() =>
															singleProducthandle(itemdata.uniqueSerial)
														}
														class=''
														style={{ width: "" }}>
														{/* {itemdata.vehManufactureYear.description} */}
														{itemdata.vehManufactureYear
														? itemdata.vehManufactureYear.description
														: ""}
													</td>

													<td
														onClick={() =>
															singleProducthandle(itemdata.uniqueSerial)
														}
														class=''
														style={{ width: "" }}>
														{itemdata.vehOwnerMobile}
													</td>

													<td
														onClick={() =>
															singleProducthandle(itemdata.uniqueSerial)
														}
														class=''
														style={{ width: "" }}>
														{itemdata.createDate &&
															formatDate(itemdata.createDate)}
													</td>

													{/* <td
														onClick={() =>
															singleProducthandle1(itemdata.uniqueSerial)
														}
														class=''
														style={{ width: "" }}>
														<EditIcon />
													</td> */}
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

export default StoreVechileTable;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Chip, Stack } from "@mui/material";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import "./admin.css";
import "./table.css";
import ReactLoading from "react-loading";
import Table from "react-bootstrap/Table";
import DataUpload from "./DataUpload";
import { useNavigate } from "react-router-dom";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const InsuranceForm = ({
	detailspage,
	setDetailspage,
	company,
	username,
	uniquekey,
}) => {
	const [dataapi, setdataapi] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [uploadData, setuploaddata] = useState(null);
    const [leadType, setLeadType] = useState('FINANCE');

	const [currentpage, setCurrentPage] = useState();
	const [searchTerm, setSearchTerm] = useState("");

	const itemsperpage = 15;
	const totalItems = dataapi?.filter(
        (itemdata) => itemdata.leadType === "FINANCE",).length;
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
				"https://mobile.orbitsys.com/OrbitsysSmbApiDemo/UsedCar/GetUsedCarInsuLeadList";
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
                leadType:"FINANCE",
				loginCompanyId: "ZOOMWHEEL",
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
					setdataapi(responseData.UsedCarInsuLeadLists);
				} else {
					throw new Error(
						`Request failed with status code: ${response.status}`()
					);
				}
			} catch (error) {
				console.log(error);
			}
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
		setDetailspage((product) => !product);
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
		<div className='hedr_mb_wo'>
			<div className=' col-xl-12 bg-dark' id='header'>
				<div className='row row-cols-md-2 m-2 p-4 row-cols-lg-2 row-cols-xl-2 font-weight-bold'>
					<Link style={{ color: "white", marginLeft: "-20px" }} to='/admin'>
						<span
							className=' text-left text-light '
							style={{ marginLeft: "10px" }}>
							Car Finance Leads
						</span>{" "}
					</Link>{" "}
					<span
						id='booking-count'
						className=' text-left text-right '
						style={{ color: "white" }}>
						{totalItems}{" "}
						<ReactHTMLTableToExcel
							id='test-table-xls-button'
							className='export btn '
							table='table-to-xls4382'
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
							<table id='table-to-xls4382'>
								<thead>
									<tr>
										<th style={{ width: "" }}>  Lead ID</th>
										<th style={{ width: "" }}> Name</th>
										<th style={{ width: "" }}>Phone</th>
										<th style={{ border: "none" }}>Remarks</th>
										<th style={{ border: "none" }}>Created Date</th>
									</tr>
								</thead>

								<tbody>
									<>
										{/* <div style={{ marginLeft: "600px", marginTop: "10px" }}>
											<div className='loader hidden-xs'>
												<ReactLoading
													type='spin'
													color='#1976d2'
													height={200}
													width={100}
												/>
											</div>
										</div> */}
									</>

									<> 	{dataapi.length === 0 ? (
                                        <div className='tex_nodata '>
                                        No Lead Found
                                    </div>
                                    ):(
                                        <>
                                        
                                        {dataapi?.filter(
									(itemdata) => itemdata.leadType === "FINANCE",).map((itemdata) => (
											<tr key={itemdata.leadUniqueSerial}>
												<td style={{ width: "" }}>
													{itemdata.leadUniqueSerial}
												</td>
												<td style={{ width: "" }}>{itemdata.vehOwnerName}</td>
												

												
										

												<td style={{ width: "" }}>{itemdata.vehOwnerMobile}</td>

												<td style={{ width: "" }}>{itemdata.comment}</td>

												<td style={{ width: "" }}>
												
												{itemdata.leadCreatedDate &&
															formatDate(itemdata.leadCreatedDate)}
												</td>
											</tr>
										))}
                                        
                                        </>
                                    )}
										
									</>
								</tbody>
							</table>
						</div>
					</>
				</>
			</div>
		</div>
	);
};

export default InsuranceForm;

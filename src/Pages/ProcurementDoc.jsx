import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "./../Components/Item";

function ProcurementDoc({ product, uniquekey }) {
	const [dataimage, setDataImage] = useState(null);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [selectedImageIndex, setSelectedImageIndex] = useState(null);
	const [reloadComponent, setReloadComponent] = useState(false);
	const [deleteItem, setDeleteItem] = useState(null);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [apigroup, setapigroup] = useState("");
	const [index1, setIndex1] = useState();
	const [index2, setIndex2] = useState();
	const [decodem, setDecodem] = useState();
	const inputRef = useRef(null);
	const [uploadData, setuploaddata] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [data1, setData1] = useState();
	const [hideinput, setshowinput] = useState(false);
	const [input1, setInput1] = useState(false);
	const [input2, setInput2] = useState(false);
	const [input3, setInput3] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`https://mobile.Orbitsys.com/OrbitsysSmbApiDemo/UsedCar/GetUsedCarDocModule?uniqueSerial=${uniquekey}&docModule=UC`,
					{
						method: "GET",
						headers: {
							ApplicationMode: "ONLINE",
							EnvironmentType: "DEMO",
							BrandCode: "UC",
							CountryCode: "IN",
							loginCompanyId: "ZOOMWHEEL",
							loginUserId: "MANJEET",
							loginIpAddress: "7C:46:85:53:E2:33",
						},
					}
				);
				const data = await response.json();
				if (response.ok) {
					setDataImage(data.UsedCarDocSubModules);
				} else {
					toast.error("Failed to fetch data");
				}
			} catch (error) {
				toast.error("An error occurred while fetching data");
			}
		};

		fetchData();
	}, [uniquekey]);

	const handleFileChange = (index, e, index1, index2, DocCode) => {
		const file = e.target.files[0];
		const updatedSelectedFiles = [...selectedFiles];
		updatedSelectedFiles[index] = file;
		setSelectedFiles(updatedSelectedFiles);
		setIndex1(index1);
		setIndex2(index2);
		setDecodem(DocCode);
	};

	const navigate = useNavigate();

	// delete api

	function handeldelete(ind1, ind2) {
		dataimage
			?.filter((item, index) => item.SubModuleCode === "PROC_DOC")
			.map((item, index) => {
				let uniqueSerial = item.DocGroups[ind1].DocCodes[ind2].ImageSerial;
				let docGroupCode = item.DocGroups[ind1].DocCodes[ind2].DocGroupCode;
				let docCode = item.DocGroups[ind1].DocCodes[ind2].DocMasterCode;
				
				deleteData(uniqueSerial, docGroupCode, docCode);
			});
	}

	const deleteData = (uniqueSerialv, docGroupCodev, docCodev) => {
		const dataToDelete = {
			brandCode: "UC",
			countryCode: "IN",
			docModuleCode: "UC",
			docSubModuleCode: "PROC_DOC",
			docGroupCode: docGroupCodev,
			docCode: docCodev,
			calledBy: docCodev,
			uniqueSerial: uniqueSerialv,
			loginUserId: "MANJEET",
			loginIpAddress: "7C:46:85:53:E2:33",
			loginUserCompanyId: "ZOOMWHEEL",
			statusFlag: "Y",
			resultCode: "null",
		};

		fetch(
			"https://mobile.Orbitsys.com/OrbitsysSmbApiDemo/Document/DeleteDocument",
			{
				method: "POST",
				headers: {
					ApplicationMode: "ONLINE",
					EnvironmentType: "DEMO",
					BrandCode: "UC",
					CountryCode: "IN",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(dataToDelete),
			}
		)
			.then((response) => response.json())
			.then((data) => {
				toast.success(data.result);
			})
			.catch((error) => {
				toast.error("An error occurred while deleting data");
			});
	};

	const SaveDataApi = (item, index) => {
		if (!selectedFiles[index]) {
			return;
		}
		const docDescription =
			item.DocGroups[index1].DocCodes[index2].DocDescription;
		const SubModuleCode = item.SubModuleCode;
		const doccode1 = item.DocGroups[index1].DocCodes[index2].DocGroupCode;
		const docDescription2 =
			item.DocGroups[index1].DocCodes[index2].DocMasterCode;

		const formData = new FormData();
		formData.append("image", selectedFiles[index]);

		formData.append("DocKeyType", "UC_DOC");
		formData.append("LogIpAddress", "192.168.10.2");
		formData.append("CompanyId", "ZOOMWHEEL");
		formData.append("BrandCode", "UC");
		formData.append("CountryCode", "IN");
		formData.append("LogUserId", "MANJEET");

		const currentTimeMillis = new Date().getTime();
		formData.append("FileTitle", `DRP_${currentTimeMillis}`);
		formData.append("FileText", `DOC_${currentTimeMillis}`);

		formData.append("ImageSize", selectedFiles[index].size);
		formData.append("FileName", `TIR_${currentTimeMillis}`);
		formData.append("DocCode", decodem);
		formData.append("FileGroup", "TIR_DOC");
		formData.append("DocModule", "UC");

		formData.append("FileSizeLimitKb", "3072");
		formData.append("DocLocation", "DEL01");
		formData.append("DocKeyValue", uniquekey);
		formData.append("FileExtn", "jpg");
		formData.append("DocGroup", doccode1);
		formData.append("FileExtensionAllowed", "jpg");
		formData.append("DocSubModule", SubModuleCode);

		fetch(
			"https://mobile.Orbitsys.com/OrbitsysSmbApiDemo/Document/UploadDocument",
			{
				method: "POST",
				headers: {
					ApplicationMode: "ONLINE",
					EnvironmentType: "DEMO",
					BrandCode: "UC",
					CountryCode: "IN",
				},
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((data) => {
				// toast.success(data.result);
				console.log("Response:", data);
			})
			.catch((error) => {
				toast.error("An error occurred while uploading data");
			});
	};

	const handleImageClick = (index) => {
		const fileInput = document.getElementById(`fileInput_${index}`);
		if (fileInput) {
			fileInput.click();
		}
	};

	function reload() {
		setTimeout(function () {
			window.location.reload();
		}, 1000);
	}

	return (
		<div className='tabdatasize'>
			<div className='dat_upd2'>
				<div className='row'>
					{dataimage
						?.filter((item, index) => item.SubModuleCode === "PROC_DOC")
						.map((item, index) => (
							<>
								<div
									className='col-2 cl_wd1 position-relation'
									key={item.DisplaySerial}>
									<h5>{item.DocGroups[0].DocCodes[0].DocDescription}</h5>
									{!input1 &&
										item.DocGroups[0].DocCodes[0].AzureUri === null && (
											<input
												className='imageinputselect'
												type='file'
												id={`fileInput1_${index}`}
												style={{}}
												onChange={(e) => {
													handleFileChange(index, e, 0, 0, "PURC_INVOC");
													reload();
													setInput1(true);
												}}
											/>
										)}
									{selectedFiles[(0, 0)] ? (
										selectedImageIndex === index && (
											<img
												className='imageuploads'
												src={URL.createObjectURL(selectedFiles[index])}
												alt='Selected Image'
												onClick={() => handleImageClick(index, 0, 0)}
											/>
										)
									) : (
										<>
											{item.DocGroups[0].DocCodes[0].AzureUri !== null ? (
												<>
													{" "}
													<img
														className='imageuploads'
														src={item.DocGroups[0].DocCodes[0].AzureUri}
														alt='AzureUri'
														onClick={() => handleImageClick(index)}
													/>
													<DeleteIcon
														className='deletebtn'
														onClick={() => {
															handeldelete(0, 0);
															reload();
														}}
													/>
												</>
											) : (
												<>
													<img
														className='imageuploads data23'
														src={item.DocGroups[0].DocCodes[0].DocTypeIconPath}
														alt='AzureUri'
														onClick={() => handleImageClick(index)}
													/>
												</>
											)}
										</>
									)}
								</div>

								<div
									className='col-2 cl_wd1 position-relation'
									key={item.DisplaySerial}>
									<h5>{item.DocGroups[1].DocCodes[0].DocDescription}</h5>
									{!input2 &&
										item.DocGroups[1].DocCodes[0].AzureUri === null && (
											<input
												className='imageinputselect'
												type='file'
												id={`fileInput1_${index}`}
												style={{}}
												onChange={(e) => {
													handleFileChange(index, e, 1, 0, "MONEY_RCT");
													reload();
													setInput2(true);
												}}
											/>
										)}
									{selectedFiles[(1, 0)] ? (
										selectedImageIndex === index && (
											<img
												className='imageuploads'
												src={URL.createObjectURL(selectedFiles[index])}
												alt='Selected Image'
												onClick={() => handleImageClick(index, 1, 0)}
											/>
										)
									) : (
										<>
											{item.DocGroups[1].DocCodes[0].AzureUri !== null ? (
												<>
													{" "}
													<img
														className='imageuploads'
														src={item.DocGroups[1].DocCodes[0].AzureUri}
														alt='AzureUri'
														onClick={() => handleImageClick(index)}
													/>
													<DeleteIcon
														className='deletebtn'
														onClick={() => {
															handeldelete(1, 0);
															reload();
														}}
													/>
												</>
											) : (
												<>
													<img
														className='imageuploads data23'
														src={item.DocGroups[1].DocCodes[0].DocTypeIconPath}
														alt='AzureUri'
														onClick={() => handleImageClick(index)}
													/>
												</>
											)}
										</>
									)}
								</div>

								<div
									className='col-2 cl_wd1 position-relation'
									key={item.DisplaySerial}>
									<h5>{item.DocGroups[2].DocCodes[0].DocDescription}</h5>
									{!input3 &&
										item.DocGroups[2].DocCodes[0].AzureUri === null && (
											<input
												className='imageinputselect'
												type='file'
												id={`fileInput1_${index}`}
												style={{}}
												onChange={(e) => {
													handleFileChange(index, e, 2, 0, "PURC_ODR");
													reload();
													setInput3(true);
												}}
											/>
										)}
									{selectedFiles[(2, 0)] ? (
										selectedImageIndex === index && (
											<img
												className='imageuploads'
												src={URL.createObjectURL(selectedFiles[index])}
												alt='Selected Image'
												onClick={() => handleImageClick(index, 2, 0)}
											/>
										)
									) : (
										<>
											{item.DocGroups[2].DocCodes[0].AzureUri !== null ? (
												<>
													{" "}
													<img
														className='imageuploads'
														src={item.DocGroups[2].DocCodes[0].AzureUri}
														alt='AzureUri'
														onClick={() => handleImageClick(index)}
													/>
													<DeleteIcon
														className='deletebtn'
														onClick={() => {
															handeldelete(2, 0);
															reload();
														}}
													/>
												</>
											) : (
												<>
													<img
														className='imageuploads data23'
														src={item.DocGroups[2].DocCodes[0].DocTypeIconPath}
														alt='AzureUri'
														onClick={() => handleImageClick(index)}
													/>
												</>
											)}
										</>
									)}
								</div>
							</>
						))}
				</div>
			</div>
		</div>
	);
}

export default ProcurementDoc;

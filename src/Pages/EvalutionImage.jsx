import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "./../Components/Item";
import "./admin.css";

function EvalutionImage({ product, uniquekey }) {
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
	const [input4, setInput4] = useState(false);
	const [input5, setInput5] = useState(false);
	const [input6, setInput6] = useState(false);
	const [input7, setInput7] = useState(false);
	const [input8, setInput8] = useState(false);
	const [input10, setInput10] = useState(false);
	const [input11, setInput11] = useState(false);

	const [input12, setInput12] = useState(false);
	const [input13, setInput13] = useState(false);
	const [input9, setInput9] = useState(false);
	const [input14, setInput14] = useState(false);
	const [input15, setInput15] = useState(false);
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
				console.error("Error:", error);
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

	function handeldelete(ind1, ind2) {
		dataimage
			?.filter((item, index) => item.SubModuleCode === "EVLTN_IMG")
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
			docSubModuleCode: "EVLTN_IMG",
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
				// toast.success(data.result);
				console.log("Response: delete ", data);
			})
			.catch((error) => {
				toast.error("An error occurred while deleting data");
				console.error("Error:", error);
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
				console.error("Error:", error);
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
			<div className='img_upd1'>
				<div className='row'>
					{dataimage
						?.filter((item, index) => item.SubModuleCode === "EVLTN_IMG")
						.map((item, index) => (
							<>
								<h3
									className='hd1_tx'
									style={{ color: "black", marginTop: "30px" }}>
									{item.DocGroups[0].DocGroupDescription}
								</h3>

								<div
									className='col-2 cl_wd1 position-relation'
									key={item.DisplaySerial}
									onClick={SaveDataApi(item, index)}>
									<h5>{item.DocGroups[0].DocCodes[0].DocDescription}</h5>
									{!input1 &&
										item.DocGroups[0].DocCodes[0].AzureUri === null && (
											<input
												className='imageinputselect'
												type='file'
												id={`fileInput1_${index}`}
												style={{}}
												onChange={(e) => {
													handleFileChange(index, e, 0, 0, "FRONT");
													reload();
													setInput1(true);
												}}
											/>
										)}

									{selectedFiles[(0, 0)] ? (
										selectedImageIndex === index && (
											<img
												className='imageuploads'
												src={URL.createObjectURL(selectedFiles[(0, 0)])}
												alt='Selected Image'
												onClick={() => {
													handleImageClick(index);
												}}
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
														onClick={() => {
															handleImageClick(index);
														}}
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
														// data-toggle='modal'
														// data-target='.bd-example-modal-lg'
													/>

													<div
														class='modal fade bd-example-modal-lg'
														tabindex='-1'
														role='dialog'
														aria-labelledby='myLargeModalLabel'
														aria-hidden='true'>
														<div class='modal-dialog modal-lg'>
															<div
																class='modal-content'
																style={{ width: "60%", height: "60%" }}>
																<img
																	className=''
																	src={
																		item.DocGroups[0].DocCodes[0]
																			.DocTypeIconPath
																	}
																	alt='AzureUri'
																/>
															</div>
														</div>
													</div>
												</>
											)}
										</>
									)}
								</div>

								<div
									className='col-2 cl_wd1 position-relation'
									key={item.DisplaySerial}
									onClick={SaveDataApi(item, index)}>
									<h5>{item.DocGroups[0].DocCodes[1].DocDescription}</h5>
									{!input2 &&
										item.DocGroups[0].DocCodes[1].AzureUri === null && (
											<input
												className='imageinputselect'
												type='file'
												id={`fileInput1_${index}`}
												style={{}}
												onChange={(e) => {
													handleFileChange(index, e, 0, 1, "REAR");
													reload();
													setInput2(true);
												}}
											/>
										)}

									{selectedFiles[(0, 0)] ? (
										selectedImageIndex === index && (
											<img
												className='imageuploads'
												src={URL.createObjectURL(selectedFiles[(0, 1)])}
												alt='Selected Image'
												onClick={() => {
													handleImageClick(index);
												}}
											/>
										)
									) : (
										<>
											{item.DocGroups[0].DocCodes[1].AzureUri !== null ? (
												<>
													{" "}
													<img
														className='imageuploads'
														src={item.DocGroups[0].DocCodes[1].AzureUri}
														alt='AzureUri'
														onClick={() => {
															handleImageClick(index);
														}}
													/>
													<DeleteIcon
														className='deletebtn'
														onClick={() => {
															handeldelete(0, 1);
															reload();
														}}
													/>
												</>
											) : (
												<>
													<img
														className='imageuploads data23'
														src={item.DocGroups[0].DocCodes[1].DocTypeIconPath}
														alt='AzureUri'
														onClick={() => handleImageClick(index)}
														// data-toggle='modal'
														// data-target='.bd-example-modal-lg'
													/>

													<div
														class='modal fade bd-example-modal-lg'
														tabindex='-1'
														role='dialog'
														aria-labelledby='myLargeModalLabel'
														aria-hidden='true'>
														<div class='modal-dialog modal-lg'>
															<div
																class='modal-content'
																style={{ width: "60%", height: "60%" }}>
																<img
																	className=''
																	src={
																		item.DocGroups[0].DocCodes[1]
																			.DocTypeIconPath
																	}
																	alt='AzureUri'
																/>
															</div>
														</div>
													</div>
												</>
											)}
										</>
									)}
								</div>

								<div
									className='col-2 cl_wd1 position-relation'
									key={item.DisplaySerial}
									onClick={SaveDataApi(item, index)}>
									<h5>{item.DocGroups[0].DocCodes[2].DocDescription}</h5>
									{!input3 &&
										item.DocGroups[2].DocCodes[0].AzureUri === null && (
											<input
												className='imageinputselect'
												type='file'
												id={`fileInput1_${index}`}
												style={{}}
												onChange={(e) => {
													handleFileChange(index, e, 0, 2, "LEFT");
													reload();
													setInput3(true);
												}}
											/>
										)}
									{selectedFiles[(0, 2)] ? (
										selectedImageIndex === index && (
											<img
												className='imageuploads'
												src={URL.createObjectURL(selectedFiles[(0, 2)])}
												alt='Selected Image'
												onClick={() => {
													handleImageClick(index);
												}}
											/>
										)
									) : (
										<>
											{item.DocGroups[0].DocCodes[2].AzureUri !== null ? (
												<>
													{" "}
													<img
														className='imageuploads'
														src={item.DocGroups[0].DocCodes[1].AzureUri}
														alt='AzureUri'
														onClick={() => {
															handleImageClick(index);
														}}
													/>
													<DeleteIcon
														className='deletebtn'
														onClick={() => {
															handeldelete(0, 2);
															reload();
														}}
													/>
												</>
											) : (
												<>
													<img
														className='imageuploads data23'
														src={item.DocGroups[0].DocCodes[2].DocTypeIconPath}
														alt='AzureUri'
														onClick={() => handleImageClick(index)}
														// data-toggle='modal'
														// data-target='.bd-example-modal-lg'
													/>

													<div
														class='modal fade bd-example-modal-lg'
														tabindex='-1'
														role='dialog'
														aria-labelledby='myLargeModalLabel'
														aria-hidden='true'>
														<div class='modal-dialog modal-lg'>
															<div
																class='modal-content'
																style={{ width: "60%", height: "60%" }}>
																<img
																	className=''
																	src={
																		item.DocGroups[0].DocCodes[2]
																			.DocTypeIconPath
																	}
																	alt='AzureUri'
																/>
															</div>
														</div>
													</div>
												</>
											)}
										</>
									)}
								</div>

								<div
									className='col-2 cl_wd1 position-relation'
									key={item.DisplaySerial}
									onClick={SaveDataApi(item, index)}>
									<h5>{item.DocGroups[0].DocCodes[3].DocDescription}</h5>
									{!input4 &&
										item.DocGroups[0].DocCodes[3].AzureUri === null && (
											<input
												className='imageinputselect'
												type='file'
												id={`fileInput1_${index}`}
												style={{}}
												onChange={(e) => {
													handleFileChange(index, e, 0, 3, "RIGHT");
													reload();
													setInput5(true);
												}}
											/>
										)}
									{selectedFiles[(0, 3)] ? (
										selectedImageIndex === index && (
											<img
												className='imageuploads'
												src={URL.createObjectURL(selectedFiles[(0, 3)])}
												alt='Selected Image'
												onClick={() => {
													handleImageClick(index);
												}}
											/>
										)
									) : (
										<>
											{item.DocGroups[0].DocCodes[3].AzureUri !== null ? (
												<>
													{" "}
													<img
														className='imageuploads'
														src={item.DocGroups[0].DocCodes[3].AzureUri}
														alt='AzureUri'
														onClick={() => {
															handleImageClick(index);
														}}
													/>
													<DeleteIcon
														className='deletebtn'
														onClick={() => {
															handeldelete(0, 3);
															reload();
														}}
													/>
												</>
											) : (
												<>
													<img
														className='imageuploads data23'
														src={item.DocGroups[0].DocCodes[3].DocTypeIconPath}
														alt='AzureUri'
														onClick={() => handleImageClick(index)}
														// data-toggle='modal'
														// data-target='.bd-example-modal-lg'
													/>

													<div
														class='modal fade bd-example-modal-lg'
														tabindex='-1'
														role='dialog'
														aria-labelledby='myLargeModalLabel'
														aria-hidden='true'>
														<div class='modal-dialog modal-lg'>
															<div
																class='modal-content'
																style={{ width: "60%", height: "60%" }}>
																<img
																	className=''
																	src={
																		item.DocGroups[0].DocCodes[3]
																			.DocTypeIconPath
																	}
																	alt='AzureUri'
																/>
															</div>
														</div>
													</div>
												</>
											)}
										</>
									)}
								</div>

								<div
									className='col-2 cl_wd1 position-relation'
									key={item.DisplaySerial}
									onClick={SaveDataApi(item, index)}>
									<h5>{item.DocGroups[0].DocCodes[4].DocDescription}</h5>
									{!input5 &&
										item.DocGroups[0].DocCodes[4].AzureUri === null && (
											<input
												className='imageinputselect'
												type='file'
												id={`fileInput1_${index}`}
												style={{}}
												onChange={(e) => {
													handleFileChange(index, e, 0, 4, "FRONT_RHS");
													reload();
													setInput5(true);
												}}
											/>
										)}

									{selectedFiles[(0, 4)] ? (
										selectedImageIndex === index && (
											<img
												className='imageuploads'
												src={URL.createObjectURL(selectedFiles[(0, 4)])}
												alt='Selected Image'
												onClick={() => {
													handleImageClick(index);
												}}
											/>
										)
									) : (
										<>
											{item.DocGroups[0].DocCodes[4].AzureUri !== null ? (
												<>
													{" "}
													<img
														className='imageuploads'
														src={item.DocGroups[0].DocCodes[4].AzureUri}
														alt='AzureUri'
														onClick={() => {
															handleImageClick(index);
														}}
													/>
													<DeleteIcon
														className='deletebtn'
														onClick={() => {
															handeldelete(0, 4);
															reload();
														}}
													/>
												</>
											) : (
												<>
													<img
														className='imageuploads data23'
														src={item.DocGroups[0].DocCodes[4].DocTypeIconPath}
														alt='AzureUri'
														onClick={() => handleImageClick(index)}
														// data-toggle='modal'
														// data-target='.bd-example-modal-lg'
													/>

													<div
														class='modal fade bd-example-modal-lg'
														tabindex='-1'
														role='dialog'
														aria-labelledby='myLargeModalLabel'
														aria-hidden='true'>
														<div class='modal-dialog modal-lg'>
															<div
																class='modal-content'
																style={{ width: "60%", height: "60%" }}>
																<img
																	className=''
																	src={
																		item.DocGroups[0].DocCodes[4]
																			.DocTypeIconPath
																	}
																	alt='AzureUri'
																/>
															</div>
														</div>
													</div>
												</>
											)}
										</>
									)}
								</div>

								<div
									className='col-2 cl_wd1 position-relation'
									key={item.DisplaySerial}
									onClick={SaveDataApi(item, index)}>
									<h5>{item.DocGroups[0].DocCodes[5].DocDescription}</h5>
									{!input6 &&
										item.DocGroups[0].DocCodes[5].AzureUri === null && (
											<input
												className='imageinputselect'
												type='file'
												id={`fileInput1_${index}`}
												style={{}}
												onChange={(e) => {
													handleFileChange(index, e, 0, 5, "FRONT_LHS");
													setInput6(true);
												}}
											/>
										)}

									{selectedFiles[(0, 4)] ? (
										selectedImageIndex === index && (
											<img
												className='imageuploads'
												src={URL.createObjectURL(selectedFiles[(0, 5)])}
												alt='Selected Image'
												onClick={() => {
													handleImageClick(index);
												}}
											/>
										)
									) : (
										<>
											{item.DocGroups[0].DocCodes[5].AzureUri !== null ? (
												<>
													{" "}
													<img
														className='imageuploads'
														src={item.DocGroups[0].DocCodes[5].AzureUri}
														alt='AzureUri'
														onClick={() => {
															handleImageClick(index);
														}}
													/>
													<DeleteIcon
														className='deletebtn'
														onClick={() => {
															handeldelete(0, 5);
															reload();
														}}
													/>
												</>
											) : (
												<>
													<img
														className='imageuploads data23'
														src={item.DocGroups[0].DocCodes[5].DocTypeIconPath}
														alt='AzureUri'
														onClick={() => handleImageClick(index)}
														// data-toggle='modal'
														// data-target='.bd-example-modal-lg'
													/>
												</>
											)}
										</>
									)}
								</div>

								<div
									className='col-2 cl_wd1 position-relation'
									key={item.DisplaySerial}
									onClick={SaveDataApi(item, index)}>
									<h5>{item.DocGroups[0].DocCodes[6].DocDescription}</h5>
									{!input7 &&
										item.DocGroups[0].DocCodes[6].AzureUri === null && (
											<input
												className='imageinputselect'
												type='file'
												id={`fileInput1_${index}`}
												style={{}}
												onChange={(e) => {
													handleFileChange(index, e, 0, 6, "REAR_LHS");
													reload();
													setInput7(true);
												}}
											/>
										)}

									{selectedFiles[(0, 6)] ? (
										selectedImageIndex === index && (
											<img
												className='imageuploads'
												src={URL.createObjectURL(selectedFiles[(0, 6)])}
												alt='Selected Image'
												onClick={() => {
													handleImageClick(index);
												}}
											/>
										)
									) : (
										<>
											{item.DocGroups[0].DocCodes[6].AzureUri !== null ? (
												<>
													{" "}
													<img
														className='imageuploads'
														src={item.DocGroups[0].DocCodes[6].AzureUri}
														alt='AzureUri'
														onClick={() => {
															handleImageClick(index);
														}}
													/>
													<DeleteIcon
														className='deletebtn'
														onClick={() => {
															handeldelete(0, 6);
															reload();
														}}
													/>
												</>
											) : (
												<>
													<img
														className='imageuploads data23'
														src={item.DocGroups[0].DocCodes[6].DocTypeIconPath}
														alt='AzureUri'
														onClick={() => handleImageClick(index)}
														// data-toggle='modal'
														// data-target='.bd-example-modal-lg'
													/>
												</>
											)}
										</>
									)}
								</div>

								<div
									className='col-2 cl_wd1 position-relation'
									key={item.DisplaySerial}
									onClick={SaveDataApi(item, index)}>
									<h5>{item.DocGroups[0].DocCodes[7].DocDescription}</h5>
									{!input8 &&
										item.DocGroups[0].DocCodes[7].AzureUri === null && (
											<input
												className='imageinputselect'
												type='file'
												id={`fileInput1_${index}`}
												style={{}}
												onChange={(e) => {
													handleFileChange(index, e, 0, 7, "REAR_RHS");
													reload();
													setInput8(true);
												}}
											/>
										)}

									{selectedFiles[(0, 7)] ? (
										selectedImageIndex === index && (
											<img
												className='imageuploads'
												src={URL.createObjectURL(selectedFiles[(0, 7)])}
												alt='Selected Image'
												onClick={() => {
													handleImageClick(index);
												}}
											/>
										)
									) : (
										<>
											{item.DocGroups[0].DocCodes[6].AzureUri !== null ? (
												<>
													{" "}
													<img
														className='imageuploads'
														src={item.DocGroups[0].DocCodes[7].AzureUri}
														alt='AzureUri'
														onClick={() => {
															handleImageClick(index);
														}}
													/>
													<DeleteIcon
														className='deletebtn'
														onClick={() => {
															handeldelete(0, 7);
															reload();
														}}
													/>
												</>
											) : (
												<>
													<img
														className='imageuploads data23'
														src={item.DocGroups[0].DocCodes[7].DocTypeIconPath}
														alt='AzureUri'
														onClick={() => handleImageClick(index)}
														// data-toggle='modal'
														// data-target='.bd-example-modal-lg'
													/>
												</>
											)}
										</>
									)}
								</div>

								{/* testing */}

								{/* interor section */}

								<div className='row'>
									<h3 className='hd1_tx' style={{ margingTop: "30px" }}>
										{item.DocGroups[1].DocGroupDescription}
									</h3>

									<div
										className='col-2 cl_wd1 position-relation'
										key={item.DisplaySerial}
										onClick={SaveDataApi(item, index)}>
										<h5>{item.DocGroups[1].DocCodes[0].DocDescription}</h5>
										{!input9 &&
											item.DocGroups[1].DocCodes[0].AzureUri === null && (
												<input
													className='imageinputselect'
													type='file'
													id={`fileInput1_${index}`}
													style={{}}
													onChange={(e) => {
														handleFileChange(index, e, 1, 0, "KEY_SWTCH");
														reload();
														setInput9(true);
													}}
												/>
											)}

										{selectedFiles[(1, 0)] ? (
											selectedImageIndex === index && (
												<img
													className='imageuploads'
													src={URL.createObjectURL(selectedFiles[(1, 0)])}
													alt='Selected Image'
													onClick={() => {
														handleImageClick(index);
													}}
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
															onClick={() => {
																handleImageClick(index);
															}}
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
															src={
																item.DocGroups[1].DocCodes[0].DocTypeIconPath
															}
															alt='AzureUri'
															onClick={() => handleImageClick(index)}
															// data-toggle='modal'
															// data-target='.bd-example-modal-lg'
														/>
													</>
												)}
											</>
										)}
									</div>

									<div
										className='col-2 cl_wd1 position-relation'
										key={item.DisplaySerial}
										onClick={SaveDataApi(item, index)}>
										<h5>{item.DocGroups[1].DocCodes[1].DocDescription}</h5>
										{!input10 &&
											item.DocGroups[1].DocCodes[1].AzureUri === null && (
												<input
													className='imageinputselect'
													type='file'
													id={`fileInput1_${index}`}
													style={{}}
													onChange={(e) => {
														handleFileChange(index, e, 1, 1, "INSTRU_PANEL");
														reload();
														setInput10(true);
													}}
												/>
											)}

										{selectedFiles[(1, 1)] ? (
											selectedImageIndex === index && (
												<img
													className='imageuploads'
													src={URL.createObjectURL(selectedFiles[(1, 1)])}
													alt='Selected Image'
													onClick={() => {
														handleImageClick(index);
													}}
												/>
											)
										) : (
											<>
												{item.DocGroups[1].DocCodes[1].AzureUri !== null ? (
													<>
														{" "}
														<img
															className='imageuploads'
															src={item.DocGroups[1].DocCodes[1].AzureUri}
															alt='AzureUri'
															onClick={() => {
																handleImageClick(index);
															}}
														/>
														<DeleteIcon
															className='deletebtn'
															onClick={() => {
																handeldelete(1, 1);
																reload();
															}}
														/>
													</>
												) : (
													<>
														<img
															className='imageuploads data23'
															src={
																item.DocGroups[1].DocCodes[1].DocTypeIconPath
															}
															alt='AzureUri'
															onClick={() => handleImageClick(index)}
															// data-toggle='modal'
															// data-target='.bd-example-modal-lg'
														/>
													</>
												)}
											</>
										)}
									</div>

									<div
										className='col-2 cl_wd1 position-relation'
										key={item.DisplaySerial}
										onClick={SaveDataApi(item, index)}>
										<h5>{item.DocGroups[1].DocCodes[2].DocDescription}</h5>
										{!input11 &&
											item.DocGroups[1].DocCodes[2].AzureUri === null && (
												<input
													className='imageinputselect'
													type='file'
													id={`fileInput1_${index}`}
													style={{}}
													onChange={(e) => {
														handleFileChange(index, e, 1, 2, "DASHBOARD");
														reload();
														setInput11(true);
													}}
												/>
											)}
										{selectedFiles[(1, 2)] ? (
											selectedImageIndex === index && (
												<img
													className='imageuploads'
													src={URL.createObjectURL(selectedFiles[(1, 2)])}
													alt='Selected Image'
													onClick={() => {
														handleImageClick(index);
													}}
												/>
											)
										) : (
											<>
												{item.DocGroups[1].DocCodes[2].AzureUri !== null ? (
													<>
														{" "}
														<img
															className='imageuploads'
															src={item.DocGroups[1].DocCodes[2].AzureUri}
															alt='AzureUri'
															onClick={() => {
																handleImageClick(index);
															}}
														/>
														<DeleteIcon
															className='deletebtn'
															onClick={() => {
																handeldelete(1, 2);
																reload();
															}}
														/>
													</>
												) : (
													<>
														<img
															className='imageuploads data23'
															src={
																item.DocGroups[1].DocCodes[2].DocTypeIconPath
															}
															alt='AzureUri'
															onClick={() => handleImageClick(index)}
															// data-toggle='modal'
															// data-target='.bd-example-modal-lg'
														/>
													</>
												)}
											</>
										)}
									</div>

									<div
										className='col-2 cl_wd1 position-relation'
										key={item.DisplaySerial}
										onClick={SaveDataApi(item, index)}>
										<h5>{item.DocGroups[1].DocCodes[3].DocDescription}</h5>
										{!input12 &&
											item.DocGroups[1].DocCodes[3].AzureUri === null && (
												<input
													className='imageinputselect'
													type='file'
													id={`fileInput1_${index}`}
													style={{}}
													onChange={(e) => {
														handleFileChange(index, e, 1, 3, "STEERING_WHEEL");
														reload();
														setInput12(true);
													}}
												/>
											)}
										{selectedFiles[(1, 3)] ? (
											selectedImageIndex === index && (
												<img
													className='imageuploads'
													src={URL.createObjectURL(selectedFiles[(1, 3)])}
													alt='Selected Image'
													onClick={() => {
														handleImageClick(index);
													}}
												/>
											)
										) : (
											<>
												{item.DocGroups[1].DocCodes[3].AzureUri !== null ? (
													<>
														{" "}
														<img
															className='imageuploads'
															src={item.DocGroups[1].DocCodes[3].AzureUri}
															alt='AzureUri'
															onClick={() => {
																handleImageClick(index);
															}}
														/>
														<DeleteIcon
															className='deletebtn'
															onClick={() => {
																handeldelete(1, 3);
																reload();
															}}
														/>
													</>
												) : (
													<>
														<img
															className='imageuploads data23'
															src={
																item.DocGroups[1].DocCodes[3].DocTypeIconPath
															}
															alt='AzureUri'
															onClick={() => handleImageClick(index)}
															// data-toggle='modal'
															// data-target='.bd-example-modal-lg'
														/>
													</>
												)}
											</>
										)}
									</div>

									<div
										className='col-2 cl_wd1 position-relation'
										key={item.DisplaySerial}
										onClick={SaveDataApi(item, index)}>
										<h5>{item.DocGroups[1].DocCodes[4].DocDescription}</h5>
										{!input13 &&
											item.DocGroups[1].DocCodes[4].AzureUri === null && (
												<input
													className='imageinputselect'
													type='file'
													id={`fileInput1_${index}`}
													style={{}}
													onChange={(e) => {
														handleFileChange(index, e, 1, 4, "MUSIC_SYSTEM");
														reload();
														setInput13(true);
													}}
												/>
											)}
										{selectedFiles[(1, 4)] ? (
											selectedImageIndex === index && (
												<img
													className='imageuploads'
													src={URL.createObjectURL(selectedFiles[(1, 4)])}
													alt='Selected Image'
													onClick={() => {
														handleImageClick(index);
													}}
												/>
											)
										) : (
											<>
												{item.DocGroups[1].DocCodes[4].AzureUri !== null ? (
													<>
														{" "}
														<img
															className='imageuploads'
															src={item.DocGroups[1].DocCodes[4].AzureUri}
															alt='AzureUri'
															onClick={() => {
																handleImageClick(index);
															}}
														/>
														<DeleteIcon
															className='deletebtn'
															onClick={() => {
																handeldelete(1, 4);
																reload();
															}}
														/>
													</>
												) : (
													<>
														<img
															className='imageuploads data23'
															src={
																item.DocGroups[1].DocCodes[4].DocTypeIconPath
															}
															alt='AzureUri'
															onClick={() => handleImageClick(index)}
															// data-toggle='modal'
															// data-target='.bd-example-modal-lg'
														/>
													</>
												)}
											</>
										)}
									</div>

									{/* testing 2  */}
								</div>

								<div className='row'>
									<div
										className='col-2 cl_wd1 position-relation'
										key={item.DisplaySerial}
										onClick={SaveDataApi(item, index)}>
										<h5>{item.DocGroups[2].DocCodes[0].DocDescription}</h5>
										{!input14 &&
											item.DocGroups[2].DocCodes[0].AzureUri === null && (
												<input
													className='imageinputselect'
													type='file'
													id={`fileInput1_${index}`}
													style={{}}
													onChange={(e) => {
														handleFileChange(index, e, 2, 0, "ENGINE");
														reload();
														setInput14(true);
													}}
												/>
											)}

										{selectedFiles[(2, 0)] ? (
											selectedImageIndex === index && (
												<img
													className='imageuploads'
													src={URL.createObjectURL(selectedFiles[(2, 0)])}
													alt='Selected Image'
													onClick={() => {
														handleImageClick(index);
													}}
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
															onClick={() => {
																handleImageClick(index);
															}}
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
															src={
																item.DocGroups[2].DocCodes[0].DocTypeIconPath
															}
															alt='AzureUri'
															onClick={() => handleImageClick(index)}
															// data-toggle='modal'
															// data-target='.bd-example-modal-lg'
														/>
													</>
												)}
											</>
										)}
									</div>

									<div
										className='col-2 cl_wd1 position-relation'
										key={item.DisplaySerial}
										onClick={SaveDataApi(item, index)}>
										<h5>{item.DocGroups[3].DocCodes[0].DocDescription}</h5>
										{!input15 &&
											item.DocGroups[3].DocCodes[0].AzureUri === null && (
												<input
													className='imageinputselect'
													type='file'
													id={`fileInput1_${index}`}
													style={{}}
													onChange={(e) => {
														handleFileChange(index, e, 3, 0, "ENGINE");
														reload();
														setInput15(true);
													}}
												/>
											)}

										{selectedFiles[(3, 0)] ? (
											selectedImageIndex === index && (
												<img
													className='imageuploads'
													src={URL.createObjectURL(selectedFiles[(3, 0)])}
													alt='Selected Image'
													onClick={() => {
														handleImageClick(index);
													}}
												/>
											)
										) : (
											<>
												{item.DocGroups[3].DocCodes[0].AzureUri !== null ? (
													<>
														{" "}
														<img
															className='imageuploads'
															src={item.DocGroups[3].DocCodes[0].AzureUri}
															alt='AzureUri'
															onClick={() => {
																handleImageClick(index);
															}}
														/>
														<DeleteIcon
															className='deletebtn'
															onClick={() => {
																handeldelete(3, 0);
																reload();
															}}
														/>
													</>
												) : (
													<>
														<img
															className='imageuploads data23'
															src={
																item.DocGroups[3].DocCodes[0].DocTypeIconPath
															}
															alt='AzureUri'
															onClick={() => handleImageClick(index)}
															// data-toggle='modal'
															// data-target='.bd-example-modal-lg'
														/>
													</>
												)}
											</>
										)}
									</div>
								</div>
							</>
						))}
				</div>
			</div>
		</div>
	);
}

export default EvalutionImage;

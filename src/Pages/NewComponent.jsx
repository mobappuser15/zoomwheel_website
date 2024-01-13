import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const NewComponent = ({ product, uniquekey }) => {
	const [dataimage, setDataImage] = useState(null);
	const [data1, setData1] = useState();

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
							loginCompanyId: "SUSHIL",
							loginUserId: "SULTAN",
							loginIpAddress: "180.151.78.50",
						},
					}
				);
				const data = await response.json();
				console.log("Data fetched:", data);
				if (response.ok) {
					setDataImage(data.UsedCarDocSubModules);
					setData1(data);
				} else {
					toast.error("Failed to fetch data");
				}
			} catch (error) {
				toast.error("An error occurred while fetching data");
				console.error("Error:", error);
			}
		};

		fetchData();
	}, [data1]);
	return <div>NewComponent</div>;
};

export default NewComponent;

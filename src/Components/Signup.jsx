import React, { useState } from "react";
import "./singup.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Signup({ loggedIn }) {
	const [company, setCompany] = useState("");

	const [username, setUsername] = useState("");

	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const onSubmit = (e) => {
		e.preventDefault();

		const loginType = loggedIn ? " CDB_ADMIN " : "CDB_USER"; // Set the login type based on whether the user is an admin or not

		const data = {
			loginCountryCode: "IN",

			deviceScreenSize: "4.59",

			appVersion: "V000",

			loginType: "CDB_USER",

			deviceOs: "Android",

			ipAddress: "",

			deviceOsVersion: "27",

			firebase: "",

			deviceId: "",

			versionCode: "zoomwheel",

			loginMacAddress: "7C:46:85:53:E2:33",

			loginBrandCode: "UC",

			loginPassword: password,

			loginUserId: username,

			deviceMobile: "",

			loginCompanyId: company,

			appReleasePhase: "DEMO",
		};

		fetch(
			"https://mobile.Orbitsys.com/OrbitsysSmbApiDemo/Login/GetLoginInfoV2",

			{
				method: "POST",

				headers: {
					ApplicationMode: "ONLINE",

					EnvironmentType: "DEMO",

					BrandCode: "UC",

					CountryCode: "IN",

					"Content-Type": "application/json",
				},

				body: JSON.stringify(data),
			}
		)
			.then((response) => response.json())

			.then((data) => {
				toast.success(data.loginNotValidReason);


				localStorage.setItem("token", data.accessToken);

				navigate("/admin");

				// Check if the login was successful
			})

			.catch((error) => {
				console.error("Error:", error);
			});

	};

	return (
		<div>
			<div class='login_mn'>
				<div class='container'>
					<div className='col-md-6 col-sm-6 col-xs-12'>
						<div className='logn_logo'>
							<img class='' src='images/about-logo.png'></img>
						</div>
					</div>

					<div className='col-md-6 col-sm-6 col-xs-12'>
						<div className='wrapper'>
							<form onSubmit={onSubmit}>
								<h1>Login</h1>
								<div class='input-box'>
									<input
										type='text'
										name='company'
										onChange={(e) => setCompany(e.target.value)}
										placeholder='Company Id'
										required></input>
									<i class='bx bxs-user'></i>
								</div>
								<div class='input-box'>
									<input
										name='username'
										onChange={(e) => setUsername(e.target.value)}
										type='text'
										placeholder='User Id'
										required></input>
									<i class='bx bxs-lock-alt'></i>
								</div>

								<div class='input-box'>
									<input
										type='password'
										name='password'
										onChange={(e) => setPassword(e.target.value)}
										placeholder=' Password'
										required></input>
									<i class='bx bxs-lock-alt'></i>
								</div>

								<button type='submit' class='btn'>
									Login
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Signup;

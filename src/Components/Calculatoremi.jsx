import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./style.css";
import "./calculator.css";

import { Typography, Slider } from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";
import Box from "@material-ui/core/Box";
import Footer from "./Footer";
import Socalmedial from "./Socalmedial";

ChartJS.register(ArcElement, Tooltip, Legend);

const EmiCalculator = () => {
	const [mode, setMode] = useState("slider");
	const [pAmount, setpAmount] = useState(100000);
	const [interest, setinterest] = useState(20);
	const [duration, setDuration] = useState(1);
	const [emi, setEmi] = useState(9263);
	const [toatalpayable, setTotalpayable] = useState(111161);
	const [totalAmountOfInterest, setTotalAmountOfInterest] = useState(11161);
	const [totalAmountOfCredit, setTotalAmountOfCredit] = useState();
	const maxValue = 50000000;
	const intMax = 20;
	const maxDuration = 7;
	const monthsInYear = 12;
	const intr = interest / 1200;
	const minValue = 0;

	useEffect(() => {
		const intr = interest / 12 / 100; // Monthly interest rate
		const emiValue =
			(pAmount * intr * Math.pow(1 + intr, duration * 12)) /
			(Math.pow(1 + intr, duration * 12) - 1);
		setEmi(Math.round(emiValue));

		const totalPayment = emiValue * duration * 12;
		setTotalpayable(Math.round(totalPayment));

		const totalAmountOfInterestValue = Math.round(totalPayment - pAmount);
		setTotalAmountOfInterest(totalAmountOfInterestValue);

		const totalAmountOfCreditValue = Math.round(
			(emiValue / intr) * (1 - Math.pow(1 + intr, -duration * 12))
		);
		setTotalAmountOfCredit(totalAmountOfCreditValue);
	}, [pAmount, interest, duration]);

	const DataSheet = {
		marksTenure: [
			// { value: 1, label: "1" },
			{ value: 7, label: "" },
		],

		marksInt: [
			// { value: 1, label: "1" },
			{ value: 20, label: "" },
		],
		marksAmt: [
			// { value: 100000, label: "1 Lac" },
			{ value: 50000000, label: "" },
		],
	};

	const data = {
		labels: ["Total Interest", "Total Amount"],
		datasets: [
			{
				data: [totalAmountOfInterest, pAmount],
				backgroundColor: ["#1976d2", "#082c4e "],
				fontSize: "20px",
			},
		],
	};

	const handleTenureChange = (event) => {
		const newDuration = parseInt(event.target.value);
		if (!isNaN(newDuration)) {
			setDuration(newDuration);
		}
	};

	return (
		<>
			<Socalmedial />
			<section class='about_top'>
				<div class='container'>
					<div class='row'>
						<h1>EASY EMI</h1>
					</div>
				</div>
			</section>

			<section className='b-detail s-shadow'>
				<div className='container '>
					<div className='header'>
						<div className='b-detail__main'>
							<div className='row '>
								<div className='col-md-10 col-xs-12'>
									<h1 className='car-emi-title ' data-wow-delay='0.5s'>
										Car EMI Calculator
									</h1>
									<p className='emipara '>
										The Car Loan EMI Calculator, is the best way to calculate
										your Equated Monthly Instalments for the loan amount you
										require. The EMI calculator helps in decision-making and
										brings you one step closer to your dream car. Now with all
										the details in place, all you need to do is apply for a car
										loan.
									</p>
								</div>
							</div>

							<div className='row mt-40'>
								<div className=' col-sm-4 car_mn'>
									<div className='detail-group'>
										<Typography gutterBottom>
											<strong
												id='rangSlide'
												className='rangedata'
												style={{ fontSize: "17px" }}>
												Loan Amount
											</strong>
											<strong className='amount_details'>
												<input
													class='form-control emi_form'
													id='form-control'
													name='pAmount'
													value={pAmount.toLocaleString("en-IN")}
													type='text'
													onChange={(event) => {
														const newValue = parseInt(
															event.target.value.replace(/\D/g, "")
														); // Remove non-numeric characters
														if (!isNaN(newValue) && newValue >= minValue) {
															setpAmount(newValue);
														}
													}}
													max={maxValue}
												/>
											</strong>
										</Typography>
										<Box md={{ width: 700 }}>
											<Slider
												aria-label='Temperature'
												defaultValue={pAmount}
												max={maxValue}
												color='#1976d2'
												type='line'
												speed={pAmount}
												marks={DataSheet.marksAmt}
												value={pAmount}
												onChange={(event, vAmt) => setpAmount(vAmt)}
											/>

											<div className='row'>
												<p className=' col-6' id='dataprize'>
													{" "}
													<i class='fa fa-rupee' id='sidata'></i> 1 Lac
												</p>
												<p className='col-6' id='prezedata'>
													{" "}
													<i class='fa fa-rupee' id='sidata'></i> 5 Cr
												</p>
											</div>
										</Box>
										<Typography gutterBottom>
											<strong
												className='rangedata'
												id='rangSlide'
												style={{ fontSize: "17px" }}>
												Interest Rate
											</strong>

											{/* <strong className='amount_details'>{interest} %</strong> */}
											<input
												class='form-control emi_form'
												id='loanterm'
												name='interest'
												value={interest}
												type='number'
												onChange={(event) => setinterest(event.target.value)}
												max={intMax}
											/>
										</Typography>
										{/* <p>{pAmount}</p> */}

										<Box md={{ width: 700 }}>
											<Slider
												aria-label='Temperature'
												color='#1976d2'
												marks={DataSheet.marksInt}
												defaultValue={interest}
												value={interest}
												onChange={(event, vInt) => {
													setinterest(vInt);
												}}
												max={intMax}
											/>
											{/* <p className='pamountno'> 20 %</p> */}
											<div className='row'>
												<p className='   col-6' id='dataprize'>
													{" "}
													1 %
												</p>
												<p className='  col-6' id='prezedata'>
													{" "}
													20 %
												</p>
											</div>
										</Box>

										<Typography style={{ fontSize: "17px" }} gutterBottom>
											<strong className='rangedata' id='rangSlide'>
												Tenure(Year){" "}
											</strong>
											{/* <strong className='amount_details2'> {output}</strong> */}
											<input
												class='form-control emi_form'
												id='loanterm'
												name='duration'
												value={duration}
												type='number'
												defaultValue={duration}
												onChange={(event) => setDuration(event.target.value)}
												max={maxDuration}
											/>
										</Typography>
										<Box md={{ width: 700 }}>
											<Slider
												color='#1976d2'
												marks={DataSheet.marksTenure}
												defaultValue={duration}
												value={duration}
												onChange={(event, vDur) => {
													setDuration(vDur);
												}}
												max={maxDuration}
												aria-label='Temperature'
											/>
											<div className='row'>
												<p className=' col-6' id='dataprize'>
													{" "}
													1 Year
												</p>
												<p className='col-6' id='prezedata'>
													{" "}
													7 Year
												</p>
											</div>
										</Box>
									</div>
								</div>

								<div
									className='col-sm-2'
									id='circledata'
									style={{ marginTop: "37px", marginLeft: "98px" }}>
									<Typography gutterBottom>
										<strong className='rangedata'>Principle Amount</strong>
										<br />
										<strong style={{ fontSize: "17px" }}>
											<i class='fa fa-rupee'></i>{" "}
											{pAmount.toLocaleString("en-IN")}
										</strong>
									</Typography>
									<br />
									<Typography gutterBottom>
										<strong className='rangedata'>Monthly Loan EMI</strong>
										<br />
										<strong style={{ fontSize: "17px" }}>
											<i class='fa fa-rupee'></i> {emi.toLocaleString("en-IN")}
										</strong>
									</Typography>
									<br />

									<Typography gutterBottom>
										<strong className='rangedata'>Interest Amount</strong>
										<br />
										<strong style={{ fontSize: "17px" }}>
											<i class='fa fa-rupee'></i>{" "}
											{totalAmountOfInterest.toLocaleString("en-IN")}
										</strong>
									</Typography>

									<br />

									<Typography gutterBottom>
										<strong className='rangedata'>Total Amount Payable</strong>{" "}
										<br />
										<strong style={{ fontSize: "17px" }}>
											<i class='fa fa-rupee'></i>{" "}
											{toatalpayable.toLocaleString("en-IN")
												? toatalpayable.toLocaleString("en-IN")
												: 0}
										</strong>
									</Typography>
								</div>

								<div className='col-sm-4 car_mn2 canvas'>
									<Doughnut data={data} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* <div className="insorence_logo">

<div class="container">
        <div class="row">

		

		<div class="insorence_pic">

			<h2>BUYING CAR INSURANCE</h2>

<ul>
	<li><img class="menu_icon" src="images/car_image/tata.png"></img></li>
	<li><img class="menu_icon" src="images/car_image/bharti.png"></img></li>
	<li><img class="menu_icon" src="images/car_image/bajaj.png"></img></li>
	<li><img class="menu_icon" src="images/car_image/hdfc.png"></img></li>
	<li><img class="menu_icon" src="images/car_image/iffco.png"></img></li>
</ul>

		</div>


</div>
</div>
</div> */}
			<Footer />
		</>
	);
};

export default EmiCalculator;

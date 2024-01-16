import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Carousel from "react-elastic-carousel";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Footer from "./Footer";
import Socalmedial from "./Socalmedial";
import Priceslider from "./Priceslider";
import PageScrolltop from "./PageScrolltop";





const images = [
	{
		label: `San `,
		imgPath: `https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60`,
	},
	{
		label: `San Francisco`,
		imgPath: `https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60`,
	},
	{
		label: ` Francisco Oakland Bay Bridge`,
		imgPath: `https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250`,
	},
	{
		label: `San  United States`,
		imgPath: `https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60`,
	},

	{
		label: ` Bay Bridge,`,
		imgPath: `https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60`,
	},

	{
		label: `San United States`,
		imgPath: `https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60`,
	},

	{
		label: ` Bridge,`,
		imgPath: `https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60`,
	},

	{
		label: `Francisco `,
		imgPath: `https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60`,
	},
];
const breakPoints = [
	{ width: 1, itemsToShow: 1 },
	{ width: 550, itemsToShow: 2, itemsToScroll: 2 },
	{ width: 768, itemsToShow: 3 },
	{ width: 1200, itemsToShow: 3 },
];
function SwipeableTextMobileStepper() {
	const theme = useTheme();
	const [activeStep, setActiveStep] = React.useState(0);
	const maxSteps = images.length;
	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};
	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};
	const handleStepChange = (step) => {
		setActiveStep(step);
	};
	return (
		<>
			<PageScrolltop />
			<Socalmedial />
			<section class='about_top'>
				<div className='container'>
					<div className='row'>
						<h1>About Us</h1>
					</div>
				</div>
			</section>

			

			<section class='about_mn'>
				<div className='container'>
					<div className='row'>

					

						<div className='col-md-4 col-sm-6 col-xs-12'>
							<div className='about_sv'>
								<img class='' src='images/about-logo.svg'></img>
							</div>
						</div>

						<div className='col-md-8 col-sm-6 col-xs-12'>
							<h2> About Zoomwheels  </h2>
							<p>
							With over a decade of experience in the used car industry, our company has established itself as one of the leading dealers in the Delhi NCR region. We have built a strong reputation for providing high-quality, reliable used cars to our customers, along with exceptional customer service and support. Our extensive experience in the industry has enabled us to develop a deep understanding of the market, allowing us to offer a wide range of vehicles at competitive prices. We take pride in our ability to assist customers in finding the ideal used car to meet their needs, and our commitment to transparency and integrity has made us a trusted name in the industry.
							</p>
						</div>

						<section class='why_zoom_mn'>
							
							<h3>Why Zoomwheels</h3>




<div class="design1">
                            <div  class="tab-pane">
                                <h3><span class="fa fa-circle"></span> Certified Cars </h3>
                               
                            </div>
							
                        </div>

						<div class="design1">
                            <div  class="tab-pane">
                                <h3><span class="fa fa-circle"></span> Non-Accidental </h3>
                                
                            </div>
							
                        </div>

						<div class="design1">
                            <div  class="tab-pane">
                                <h3><span class="fa fa-circle"></span> Under Warranty Cars</h3>
                               
                            </div>
							
                        </div>

						<div class="design1">
                            <div  class="tab-pane">
                                <h3><span class="fa fa-circle"></span> Non Meter Tampered</h3>
                              
                            </div>

							
							
                        </div>


						<div class="design1">
                            <div  class="tab-pane">
                                <h3><span class="fa fa-circle"></span> No Hidden Charges</h3>
                               
                            </div>
							
                        </div>

						<div class="design1">
                            <div  class="tab-pane">
                                <h3><span class="fa fa-circle"></span> Free RC Transfer</h3>
                               
                            </div>
							
                        </div>


						<p>Points like "No commission," "Non-accidental," "With Warranty," "Certified cars," and "Non-meter tampering" 
									highlight key advantages of buying from reputable used car dealers. These factors contribute to a more transparent and 
									reliable car purchasing experience,
									 addressing concerns related to costs, vehicle condition, and overall peace of mind for the buyer. </p>

						</section>

						<div class='team_mn'>
							<h2>The Wonder Team</h2>
							<p>
							Our used car wonder team is a group of dedicated and knowledgeable individuals 
							who excel at finding high-quality,<br></br> affordable used cars for our customers.
							</p>

							<div class='col-md-3 col-sm-6 col-xs-12'>
								<div class='our-team'>
									<div class='pic'>
										<img src='/images/team/img-1.jpg'></img>
									</div>

									<div class='team-content'>
										<h3 class='title'>Mr. Roop Singh</h3>
										<span class='post'>Sales </span>
									</div>
								</div>
							</div>

							<div class='col-md-3 col-sm-6 col-xs-12'>
								<div class='our-team'>
									<div class='pic'>
										<img src='/images/team/img-2.jpg'></img>
									</div>

									<div class='team-content'>
										<h3 class='title'>Mr. Prashant Ahuja</h3>
										<span class='post'>Sales</span>
									</div>
								</div>
							</div>

							<div class='col-md-3 col-sm-6 col-xs-12'>
								<div class='our-team'>
									<div class='pic'>
										<img src='/images/team/img-3.jpg'></img>
									</div>

									<div class='team-content'>
										<h3 class='title'>Mr. Manjeet Singh</h3>
										<span class='post'>Sales</span>
									</div>
								</div>
							</div>

							<div class='col-md-3 col-sm-6 col-xs-12'>
								<div class='our-team'>
									<div class='pic'>
										<img src='/images/team/img-4.jpg'></img>
									</div>

									<div class='team-content'>
										<h3 class='title'>Mr. Rudransh Mehta</h3>
										<span class='post'>Sales</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>


			


			<section class='jk-slider slid2'>
				<div id='carousel-example' class='carousel slide' data-ride='carousel'>
					<ol class='carousel-indicators'>
						<li
							data-target='#carousel-example'
							data-slide-to='0'
							class='active'></li>
						<li data-target='#carousel-example' data-slide-to='1'></li>
						<li data-target='#carousel-example' data-slide-to='2'></li>
					</ol>

					<div class='carousel-inner'>
						<div class='item active'>
							<div class='hero'>
								<hgroup></hgroup>
							</div>
							<div class='overlay'></div>
							<a href='#'>
								<img class='sli_pic1' src='/images/team/team.jpg' />
							</a>
						</div>
						<div class='item'>
							<div class='hero'>
								<hgroup></hgroup>
							</div>

							<div class='overlay'></div>
							<a href='#'>
								<img class='sli_pic1' src='/images/team/team.jpg' />
							</a>
						</div>
						<div class='item'>
							<div class='hero'>
								<hgroup></hgroup>
							</div>
							<div class='overlay'></div>
							<a href='#'>
								<img class='sli_pic1' src='/images/team/team.jpg' />
							</a>
						</div>
					</div>

					<a
						class='left carousel-control'
						href='#carousel-example'
						data-slide='prev'>
						<span class='glyphicon glyphicon-chevron-left'></span>
					</a>
					<a
						class='right carousel-control'
						href='#carousel-example'
						data-slide='next'>
						<span class='glyphicon glyphicon-chevron-right'></span>
					</a>
				</div>
			</section>
			<Footer />
		</>
	);
}

export default SwipeableTextMobileStepper;

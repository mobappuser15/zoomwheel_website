import React from "react";
import Footer from "./Footer";
import Socalmedial from "./Socalmedial";
import PageScrolltop from "./PageScrolltop";

function Contact() {
	return (
		<>
			<PageScrolltop />
			<Socalmedial />
			<section class='about_top'>
				<div class='container'>
					<div class='row'>
						<h1>Contact Us</h1>
					</div>
				</div>
			</section>

			{/* <div class='contacts-section'>
				<div class='container'>
					<div class='row'>
						<div class='col-lg-4 col-md-6'>
							<div class='conatact-single-box'>
								<div class='contacts-icon'>
									<span class='fa fa-home'></span>
								</div>
								<div class='contact-title'>
									<h5>ADDRESS</h5>
								</div>
								<div class='contact-description'>
									<p>
										G-8 & 11, NDM - 1, Netaji Subhash Place, New Delhi, Delhi
										110034
									</p>
								</div>
							</div>
						</div>
						<div class='col-lg-4 col-md-6'>
							<div class='conatact-single-box'>
								<div class='contacts-icon'>
									<span class='fa fa-envelope'></span>
								</div>
								<div class='contact-title'>
									<h5> E-Mail Us </h5>
								</div>
								<div class='contact-description'>
									<p>zoomwheels9@gmail.com</p>
								</div>
							</div>
						</div>
						<div class='col-lg-4 col-md-6'>
							<div class='conatact-single-box'>
								<div class='contacts-icon'>
									<span class='fa fa-phone'></span>
								</div>
								<div class='contact-title'>
									<h5> PHONE </h5>
								</div>
								<div class='contact-description'>
									<p>+91 8926152152</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class='container'>
				<div class='row'>
					<div class='b-map  '>
						<iframe
							src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.9661823299734!2d77.15072459999999!3d28.690658199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0213ec109e35%3A0xff5085c67f93e370!2sZoomwheels!5e0!3m2!1sen!2sin!4v1701843943947!5m2!1sen!2sin'
							width='100%'
							height='450'
							allowfullscreen=''
							loading='lazy'
							referrerpolicy='no-referrer-when-downgrade'></iframe>
					</div>
				</div>
			</div> */}

			<div class='contacts-section'>
				<div class='container'>
					<div class='row'>
						<div class='col-md-6'>
							<div class='b-map  '>
								<iframe
									src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.9661823299734!2d77.15072459999999!3d28.690658199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0213ec109e35%3A0xff5085c67f93e370!2sZoomwheels!5e0!3m2!1sen!2sin!4v1701843943947!5m2!1sen!2sin'
									width='100%'
									height='450'
									allowfullscreen=''
									loading='lazy'
									referrerpolicy='no-referrer-when-downgrade'></iframe>
							</div>
						</div>

						<div class='col-md-6'>
							<div class='colmun-30 get_say_form'>
								<h5>Contact Details</h5>
								<ul class='get_say_info_sec'>
									<li>
										<i class='fa fa-envelope'></i>
										<a href='mailto:'>zoomwheels9@gmail.com</a>
									</li>
									<li>
										<i class='fa fa-phone'></i>
										<a href='tel:'>+91 8926152152</a>
									</li>
									<li>
										<i class='icon icon-lg fa fa-map-marker'></i>
										<p className="adr_ts_clr">
											G-8 & 11, NDM - 1, Netaji Subhash Place, New Delhi, Delhi
											110034
											</p>
										
									</li>
								</ul>
								<ul class='get_say_social-icn'>
									<li>
										<a
											href='https://www.facebook.com/zoomwheels/'
											target='_blank'>
											<i class='fa fa-facebook'></i>
										</a>
									</li>

									<li>
										<a
											href='https://www.instagram.com/Zoomwheels_usedcars'
											target='_blank'>
											<i class='fa fa-instagram'></i>
										</a>
									</li>

									<li>
										<a
											href='https://api.whatsapp.com/send/?phone=8926152152&text= Hello Zoomwheels +Team%2C+I+would+like+to+know+more&type=phone_number&app_absent=0'
											target='_blank'>
											<i class='fa fa-whatsapp'></i>
										</a>
									</li>

									<li>
										<a
											href='https://www.youtube.com/@ZoomwheelsUsedCars'
											target='_blank'>
											<i class='fa fa-youtube'></i>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
}

export default Contact;

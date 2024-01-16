import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Link,
	Navigate,
} from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Dashboard from "./Dashboard";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import StarIcon from "@mui/icons-material/Star";
import "./style.css";
import Sellcar from "./Sellcar";
import BuyerCar from "./BuyerCar";
import About from "./About";
import Contact from "./Contact";
import Gallery from "./Gallery";
import DetailsCars from "./DetailsCars";
import Signup from "./Signup";
import Insurance from "./Insurance";
import Footer from "./Footer";
import Calculatoremi from "./Calculatoremi";
import AutoLoan from "./AutoLoan";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div className='menu_style'>
			<div className='menu1'>
				<List className='data'>
					{/* <img class='logo_siz7' src='images/logo.png'></img>/\ */}
					{[
						{
							text: "Home",
							icon: (
								<img class='menu_icon arrow' src='images/car_image/home.png'></img>
							),
							path: "/",
						},

						
						{
							text: "Buy Car",
							icon: (
								<img class='menu_icon arrow' src='images/car_image/buy_car.png'></img>
							),
							path: "/buyercars",
						},

						{
							text: "Sell Car",
							icon: (
								<img class='menu_icon arrow' src='images/car_image/cari.png'></img>
							),
							path: "/sellcars",
						},

						{
							text: "Happy customers",
							icon: (
								<img
									class='menu_icon arrow'
									src='images/car_image/gallery_icon.png'></img>
							),
							path: "/imagegallery",
						},
						{
							text: "Insurance",
							icon: (
								<img
									class='menu_icon arrow'
									src='images/car_image/insurance.png'></img>
							),
							path: "/insuranceform",
						},


						

						{
							text: "About Us",
							icon: (
								<img
									class='menu_icon arrow'
									src='images/car_image/about_icon.png'></img>
							),
							path: "/about",
						},

						{
							text: "Car Finance",
							icon: (
								<img
									class='menu_icon arrow'
									src='images/car_image/ic2.png'></img>
							),
							path: "/autoloan",
						},

						{
							text: "Contact Us",
							icon: (
								<img
									class='menu_icon arrow'
									src='images/car_image/contact-us.png'></img>
							),
							path: "/contact",
						},

						// {
						// 	text: "Details",
						// 	icon: <SendIcon className='icon_clr' />,
						// 	path: "/carsdetails",
						// },
					].map((item, index) => (
						<Link to={item.path}>
							<ListItem key={item.text}>
								<ListItemButton onClick={handleDrawerToggle}>
									<ListItemIcon>{item.icon}</ListItemIcon>
									<ListItemText primary={item.text} />
								</ListItemButton>
							</ListItem>
						</Link>
					))}
				</List>
			</div>
			<Divider />
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position='fixed'
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}>
						<MenuIcon />
					</IconButton>

					<div className='logo_mn'>
						<div className='row'>
							<div className='col-md-6'>
								<Link to='/'>
									<img class=' logo_header_mn' src='images/logo.svg'></img>
								</Link>
							</div>

							<div className='col-md-6'>
								<div className='socil_icon'>
									<ul>
										<li>
											<a
												href='https://api.whatsapp.com/send/?phone=+91 8926152152&text= Hello Zoomwheels +Team%2C+I+would+like+to+know+more&type=phone_number&app_absent=0'
												target='_blank'>
												<img src='images/whatsapp_icon.png'></img>
											</a>
										</li>
										<li>
											<a
												href='https://www.facebook.com/zoomwheels/'
												target='_blank'>
												<img src='images/fb.png'></img>
											</a>
										</li>
										<li>
											<a
												href='https://www.instagram.com/Zoomwheels_usedcars'
												target='_blank'>
												<img src='images/instra.png'></img>
											</a>
										</li>
										<li>
											<a
												href='https://www.youtube.com/@ZoomwheelsUsedCars'
												target='_blank'>
												<img src='images/ytb.png'></img>
											</a>
										</li>

										<li className='no_tx'>
											<a href='tel:+91 8926152152'>
												<span class='no_top1'>
													<i class='fa fa-fw' aria-hidden='true'>
														
													</i>{" "}
													+91 8926152152
												</span>
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</Toolbar>
			</AppBar>
			<Box
				component='nav'
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label='mailbox folders'>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					container={container}
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}>
					{drawer}
				</Drawer>
				<Drawer
					variant='permanent'
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
					open>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}>
				<Toolbar />
				<Typography paragraph>
					<Routes>
						<Route />

						<Route path='/' element={<Dashboard />} />

						<Route path='/sellcars' element={<Sellcar />} />

						<Route path='/buyercars' element={<BuyerCar />} />

						<Route path='/about' element={<About />} />

						<Route path='/autoloan' element={<AutoLoan />} />

						<Route path='/contact' element={<Contact />} />

						<Route path='/imagegallery' element={<Gallery />} />
						<Route path='/Calculatoremi' element={<Calculatoremi />} />

						<Route
							path='/carsdetails/:uniquekey/:vehOdometer'
							element={<DetailsCars />}
						/>

						<Route path='/footer' element={<Footer />} />
						<Route path='/insuranceform' element={<Insurance />} />
						<Route path='/footer' element={<Footer />} />
					</Routes>
				</Typography>
			</Box>
		</Box>
	);
}

ResponsiveDrawer.propTypes = {
	window: PropTypes.func,
};

export default ResponsiveDrawer;

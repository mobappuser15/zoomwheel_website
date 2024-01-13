import React, { useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";
import Person2Icon from "@mui/icons-material/Person2";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HompPage from "./../Components/Homepage";
import "./admin.css";
import { Link } from "react-router-dom";
import AddVechil from "./AddVechil";
import BookingStovk from "./BookingStovk";
import Sellertable from "./Sellertable";

import BuyerLead from "./BuyerLead";
import StoreVechileTable from "./StoreVechileTable";
import Deleverystock from "./Deleverystock";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import NewComponent from "./NewComponent";
import InsuranceForm from "./InsuranceForm";
import FinaceCar from "./FinaceCar";

const drawerWidth = 100;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

export default function MiniDrawer() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		if (!localStorage.getItem("token")) {
			toast.success("User Logout");
			navigate("/login");
		}
	}, []);

	const reloadPage = () => {
		window.location.reload();
		navigate("/login");
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	const Logoutdata = () => {

		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<Box>
			<div className='tab_mn4'>
				<div className='tablelistdata'>
					<Link
						onClick={() => {
							Logoutdata();
							reloadPage();
						}}
						className='addvechle2'>
						Logout
					</Link>

					<div class=''>
						<Tabs
							defaultActiveKey='profile23'
							transition={false}
							id='noanim-tab-example'
							variant='pills'
							className='adminbtn1'>
							<Tab
								eventKey='profile23'
								title='Seller Lead'
								style={{ background: "white", marginTop: "70px" }}>
								<Sellertable />
							</Tab>

							<Tab
								eventKey='profile43'
								title='Buyer Lead'
								style={{ background: "white", marginTop: "70px" }}>
								<BuyerLead />
							</Tab>

							<Tab className="in_padg"
								eventKey='insirance'
								title='Insurance '
								style={{  marginTop: "70px" }}>
								<InsuranceForm />
							</Tab>



							<Tab className="in_padg"
								eventKey='finace'
								title=' Car Finance  '
								style={{ background: "white", marginTop: "70px" }}>
								<FinaceCar />
							</Tab>
							<Tab
								eventKey='profile'
								title='Image Upload'
								style={{ marginTop: "70px" }}>
								<StoreVechileTable />
							</Tab>
							<Tab
								eventKey='contact'
								title='Booking'
								style={{ background: "white", marginTop: "70px" }}>
								<BookingStovk />
							</Tab>

							<Tab
								eventKey='contact1'
								title='Delivery'
								style={{ background: "white", marginTop: "70px" }}>
								<Deleverystock />
							</Tab>
						</Tabs>

						<Link to='/Addvechils' className='addvechle'>
							Add New Vehicle
						</Link>
					</div>
				</div>
			</div>
		</Box>
	);
}

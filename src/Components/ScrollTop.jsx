import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import "./scroll.css";

export default function ScrollTop() {
	const [showTopBtn, setShowTopBtn] = useState(false);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 100) {
				setShowTopBtn(true);
			} else {
				setShowTopBtn(false);
			}
		});
	}, []);
	const goToTop = () => {
		window.scrollTo({
			top: -500,
			behavior: "smooth",
		});
	};
	// const { pathname } = useLocation();

	// useEffect(() => {
	// 	window.scrollTo(0, 0);
	// }, [pathname]);

	// return null;

	return (
		<div className='top-to-btm'>
			{" "}
			{showTopBtn && (
				<button className='icon-position icon-style' onClick={goToTop}>
					<i className='fa fa-angle-double-up'></i>
				</button>
			)}{" "}
		</div>
	);
}

import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const minDistance = 10;

export default function PriceRangeSlider() {
	const minValue = 50000;
	const maxValue = 6000000;

	const [value, setValue] = React.useState([minValue, maxValue]);

	const handleChange = (event, newValue, activeThumb) => {
		if (!Array.isArray(newValue)) {
			return;
		}

		if (newValue[1] - newValue[0] < minDistance) {
			if (activeThumb === 0) {
				const clamped = Math.min(newValue[0], maxValue - minDistance);
				setValue([clamped, clamped + minDistance]);
			} else {
				const clamped = Math.max(newValue[1], minValue + minDistance);
				setValue([clamped - minDistance, clamped]);
			}
		} else {
			setValue(newValue);
		}
	};

	return (
		<Box sx={{ width: 300 }}>
			<Slider
				getAriaLabel={() => "Price Range"}
				value={value}
				onChange={handleChange}
				valueLabelDisplay='auto'
				min={minValue}
				max={maxValue}
				step={1000}
			/>
		</Box>
	);
}

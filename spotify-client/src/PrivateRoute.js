import { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
	const { currentSong } = useSelector((state) => state.audioPlayer);
	const [padding, setPadding] = useState("6rem 0 0 26rem");

	useEffect(() => {
		const updatePadding = () => {
			if (window.innerWidth <= 768) {
				setPadding(currentSong ? "6rem 0 10rem 2rem" : "6rem 0 0 2rem");
			} else {
				setPadding(currentSong ? "6rem 0 10rem 26rem" : "6rem 0 0 26rem");
			}
		};

		updatePadding(); // Call on load
		window.addEventListener("resize", updatePadding); // Adjust on resize

		return () => window.removeEventListener("resize", updatePadding);
	}, [currentSong]);

	const styles = {
		padding,
		backgroundColor: "#181818",
		color: "#ffffff",
		minHeight: "calc(100vh - 6rem)",
	};

	return (
		<Route
			{...rest}
			render={(props) =>
				user ? (
					<div style={styles}>
						<Component {...props} />
					</div>
				) : (
					<Redirect
						to={{ pathname: "/login", state: { from: props.location } }}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;

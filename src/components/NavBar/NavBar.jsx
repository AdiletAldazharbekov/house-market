import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import { ReactComponent as OfferIcon } from "../../assets/svg/localOfferIcon.svg";
import { ReactComponent as ExploreIcon } from "../../assets/svg/exploreIcon.svg";
import { ReactComponent as PersonalOutlineIcon } from "../../assets/svg/personOutlineIcon.svg";

function NavBar() {
	return (
		<footer className="navbar">
			<nav className="navbarNav">
				<ul className="navbarListItems">
					<li className="navbarListItem">
						<ExploreIcon fill="#2C2C2C" width="36px" height="36px"/>
						<p>Explore</p>
					</li>
					<li className="navbarListItem">
						<OfferIcon  fill="#2C2C2C" width="36px" height="36px"/>
						<p>Offer</p>
					</li>
					<li className="navbarListItem">
						<PersonalOutlineIcon  fill="#2C2C2C" width="36px" height="36px"/>
						<p>Profile</p>
					</li>
				</ul>
			</nav>
		</footer>
	);
}

export default NavBar;

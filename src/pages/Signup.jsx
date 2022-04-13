import { toast } from "react-toastify";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config.js";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

const Signup = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const { name, email, password } = formData;
	const navigate = useNavigate();

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const auth = getAuth();
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			updateProfile(auth.currentUser, {
				displayName: name,
			});
			const formDataCopy = { ...formData };
			delete formDataCopy.password;
			formDataCopy.timestamp = serverTimestamp();
			await setDoc(doc(db, "users", user.uid), formDataCopy);
			navigate("/");
		} catch (error) {
			toast.error('Error')
		}
	};

	return (
		<>
			<div>
				<div className="pageContainer">
					<header>
						<p className="pageHeader">Welcome Back!</p>
					</header>
					<main>
						<form onSubmit={onSubmit}>
							<input
								id="name"
								type="text"
								placeholder="Name"
								className="nameInput"
								value={name}
								onChange={onChange}
							/>
							<input
								id="email"
								type="email"
								placeholder="Email"
								className="emailInput"
								value={email}
								onChange={onChange}
							/>
							<div className="passwordInputDiv">
								<input
									id="password"
									type={showPassword ? "text" : "password"}
									placeholder="Password"
									className="passwordInput"
									value={password}
									onChange={onChange}
								/>
								<img
									src={visibilityIcon}
									alt="show Password"
									onClick={() =>
										setShowPassword(
											(prevState) => !prevState
										)
									}
									className="showPassword"
								/>
							</div>
							<p className="forgotPasswordLink">
								Create Password
							</p>
							<div className="signInBar">
								<p className="signInText">Sign up</p>
								<button className="signInButton">
									<ArrowRightIcon
										fill="#FFFFFF"
										width="30px"
										hanging="30px"
									/>
								</button>
							</div>
						</form>
						{/* Google Auth */}
						<Link to="/signin" className="registerLink">
							Sign In
						</Link>
					</main>
				</div>
			</div>
		</>
	);
};

export default Signup;

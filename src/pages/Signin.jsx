import {toast} from 'react-toastify'
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Signin = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;
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
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			if (userCredential.user) {
				navigate("/profile");
			}
		} catch (error) {
			toast.error('error')
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
							<Link
								to="/forgot-password"
								className="forgotPasswordLink"
							>
								Forgot Password
							</Link>
							<div className="signInBar">
								<p className="signInText">Sign In</p>
								<button className="signInButton">
									<ArrowRightIcon
										fill="#FFFFFF"
										width="30px"
										height="30px"
										// href='/profile'
									/>
								</button>
							</div>
						</form>
						{/* Google Auth */}
						<Link to="/signup" className="registerLink">
							Sign Up
						</Link>
					</main>
				</div>
			</div>
		</>
	);
};

export default Signin;

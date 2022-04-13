import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

function Profile() {
	const auth = getAuth();
	const navigate = useNavigate();
	const [changeDetails, setChangeDetails] = useState(false);
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	});
	const { name, email } = formData;

	const onLogout = () => {
		auth.signOut();
		navigate("/");
	};

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const onSubmit = async () => {
		try {
			if (auth.currentUser.displayName !== name) {
				await updateProfile(auth.currentUser, {
					displayName: name,
				});
			}
			const userRef=doc(db,'users', auth.currentUser.uid)
			await updateDoc(userRef, {
				name,
			})
		} catch (error) {
			toast.error("Err 404");
		}
	};

	return (
		<div className="profile">
			<header className="profileHeader">
				<p className="pageHeader">My Profile</p>
				<button className="logOut" onClick={onLogout}>
					Logout
				</button>
			</header>
			<main>
				<div className="profileDetailsHeader">
					<p className="profileDetailsText">Personal Details</p>
					<p
						className="changePersonalDetails"
						onClick={() => {
							changeDetails && onSubmit();
							setChangeDetails((prevState) => !prevState);
						}}
					>
						{changeDetails ? "Done" : "Change"}
					</p>
				</div>
				<div className="profileCard">
					<form action="">
						<input
							onChange={onChange}
							value={name}
							disabled={!changeDetails}
							id="name"
							className={
								changeDetails
									? "profileName"
									: "profileNameActive"
							}
							type="text"
						/>
						<input
							onChange={onChange}
							value={email}
							disabled={!changeDetails}
							id="email"
							className={
								changeDetails
									? "profileEmail"
									: "profileEmailActive"
							}
							type="text"
						/>
					</form>
				</div>
			</main>
		</div>
	);
}

export default Profile;

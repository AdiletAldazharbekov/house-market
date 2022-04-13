import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Explore from "./pages/Explore";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PriveteRoute/PrivateRoute";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Explore />} />
					<Route path="/offers" element={<Offers />} />
					<Route path="/profile" element={<PrivateRoute />}>
						<Route path="/profile" element={<Profile />} />
					</Route>
					<Route path="/signin" element={<Signin />} />
					<Route path="/signup" element={<Signup />} />
					<Route
						path="/forgot-password"
						element={<ForgotPassword />}
					/>
				</Routes>
				<NavBar />
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;

import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import {
	Navbar,
	Exchanges,
	HomePage,
	Cryptocurrencies,
	CryptoDetails,
	News,
} from './components';
import './App.css';

function App() {
	return (
		<div className="app">
			<div className="navbar">
				<Navbar />
			</div>
			<div className="main">
				<Layout>
					<div className="routes">
						<Routes>
							<Route exact path="/" element={<HomePage />} />
							<Route exact path="/exchanges" element={<Exchanges />} />
							<Route
								exact
								path="/cryptocurrencies"
								element={<Cryptocurrencies />}
							/>
							<Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
							<Route exact path="/news" element={<News />} />
						</Routes>
					</div>
				</Layout>

				<div className="footer">
					<Typography.Title
						level={5}
						style={{
							color: 'white',
							textAlign: 'center',
						}}
					>
						CryptoWorld.
						<br /> All Right Reserved
					</Typography.Title>
					<Space>
						<Link to="/">Home</Link>
						<Link to="/exchanges">Exchanges</Link>
						<Link to="/news">News</Link>
					</Space>
				</div>
			</div>
		</div>
	);
}

export default App;

import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../movies/pages/HomePage';
import { FavoritesPage } from '../movies/pages/FavoritesPage';

export const AppRouter = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Navigate to="/home" />} />
				<Route path="home" element={<HomePage />} />
				<Route path="favorites" element={<FavoritesPage />} />
			</Routes>
		</>
	);
};

import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../movies/pages/HomePage';
import { FavoritesPage } from '../movies/pages/FavoritesPage';
import { DetailsPage } from '../movies/pages/DetailsPage';
import { ActorPage } from '../movies/pages/ActorPage';

export const AppRouter = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Navigate to="/home" />} />
				<Route path="home" element={<HomePage />} />
				<Route path="details/:id" element={<DetailsPage />} />
				<Route path="actor/:id" element={<ActorPage />} />
				<Route path="favorites" element={<FavoritesPage />} />
			</Routes>
		</>
	);
};

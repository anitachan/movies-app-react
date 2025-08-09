/* istanbul ignore file */
import { Navigate, Route, Routes } from 'react-router-dom';
import { ActorPage } from '../movies/pages/ActorPage';
import { DetailsPage } from '../movies/pages/DetailsPage';
import { FavoritesPage } from '../movies/pages/FavoritesPage';
import { HomePage } from '../movies/pages/HomePage';

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

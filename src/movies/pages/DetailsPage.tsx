import { useParams } from 'react-router-dom';
import { Box, IconButton, Typography } from '@mui/material';
import { useMovie } from '../hooks/useMovie';
import { Accordion } from '../components/Accordion';
import { CastCard } from '../components/CastCard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useFavorites } from '../hooks/useFavorites';

export const DetailsPage = () => {
  const { id } = useParams();
  const { movie, cast } = useMovie(id!);
  const url = process.env.REACT_APP_IMAGES_URL;
  const { isFavorite, toggleFavorite } = useFavorites(movie!);

  return (
    <Box
      component="main"
      sx={{
        width: '100%',
        boxSizing: 'border-box',
        p: 2,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridAutoRows: 'auto',
        }}
      >
        <Box
          sx={{
            gridColumn: 'span 4',
            position: 'relative',
            width: '100%',
          }}
        >
          <IconButton
            onClick={toggleFavorite}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(255,255,255,0.7)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
              zIndex: 2,
            }}
          >
            {isFavorite ? (
              <FavoriteIcon data-testid="favorite-icon" color="error" />
            ) : (
              <FavoriteBorderIcon data-testid="favorite-border-icon" />
            )}
          </IconButton>

          <Box
            component="img"
            src={`${url}${movie?.poster_path}?w=200&fit=crop&auto=format`}
            alt={movie?.title}
            loading="lazy"
            sx={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: 2,
              display: 'block',
            }}
          />
        </Box>

        <Box
          sx={{
            gridColumn: 'span 8',
            minWidth: 0,
          }}
        >
          <Accordion movie={movie!} />
        </Box>

        <Box sx={{ gridColumn: '1 / -1', mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Cast
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              overflowX: 'auto',
              overflowY: 'hidden',
              py: 1,
              '&::-webkit-scrollbar': { height: 6 },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,0.3)',
                borderRadius: 3,
              },
            }}
          >
            {cast?.map((actor) => (
              <Box key={actor.cast_id} sx={{ flex: '0 0 auto' }}>
                <CastCard actor={actor} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

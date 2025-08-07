import { Box, Button, Rating, Stack, Typography } from '@mui/material';
import { Movie } from '../models/movies.model';
import { useNavigate } from 'react-router-dom';
import { MovieDetail } from '../models/movieDetail';

interface Props {
  movie: Movie | MovieDetail;
}

export const MovieCard = ({ movie }: Props) => {
  const url = process.env.REACT_APP_IMAGES_URL;
  const { backdrop_path, title, overview, vote_average } = movie;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/details/${movie.id}`);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <img
        src={`${url}${backdrop_path}?w=400&fit=crop&auto=format`}
        alt={title}
        loading="lazy"
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          display: 'block',
          borderRadius: 4,
        }}
      />
      <Box
        sx={{
          bgcolor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          p: 2,
          mt: '-4px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
        }}
      >
        <Box>
          <Typography
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            variant="subtitle1"
            fontWeight="bold"
          >
            {title}
          </Typography>
          <Typography
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            variant="body2"
          >
            {overview}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Rating value={vote_average} precision={0.1} max={10} readOnly />
            <Typography variant="body2">{vote_average.toPrecision(2)}</Typography>
          </Stack>
        </Box>
        <Button
          sx={{ marginLeft: '10px', whiteSpace: 'nowrap' }}
          variant="contained"
          size="small"
          color="primary"
          onClick={handleClick}
        >
          See More
        </Button>
      </Box>
    </Box>
  );
};

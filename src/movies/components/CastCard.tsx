import { Box, Button, Card, CardMedia, Typography } from '@mui/material';
import { Cast } from '../models/cast.model';
import noUser from '../../assets/no-user.png';
import { useNavigate } from 'react-router-dom';

interface Props {
  actor: Cast;
}
export const CastCard = ({ actor }: Props) => {
  const url = process.env.REACT_APP_IMAGES_URL;
  const profile_path = actor.profile_path ? `${url}${actor.profile_path}` : noUser;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/actor/${actor.id!}`);
  };

  return (
    <Button onClick={handleClick}>
      <Box sx={{ maxWidth: 250, textAlign: 'center' }}>
        <Card sx={{ maxWidth: 250 }}>
          <CardMedia
            component="img"
            src={profile_path}
            alt={actor.name}
            sx={{
              width: '100%',
              height: 350,
              objectFit: 'cover',
              borderRadius: 2,
            }}
          />
        </Card>
        <Typography variant="body2" fontWeight="bold" noWrap>
          {actor.name}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap>
          {actor.character}
        </Typography>
      </Box>
    </Button>
  );
};

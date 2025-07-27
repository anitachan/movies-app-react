import { Box, Button, Typography } from '@mui/material';
import noUser from '../../assets/no-user.png';
import { ActorCast } from '../models/actorCast.model';
import { useNavigate } from 'react-router-dom';

interface Props {
	credit: ActorCast;
}

export const CreditsCard = ({ credit }: Props) => {
	const url = process.env.REACT_APP_IMAGES_URL;
	const posterSrc = credit.poster_path ? `${url}${credit.poster_path}` : noUser;
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/details/${credit.id!}`);
	};

	return (
		<Button onClick={handleClick}>
			<Box sx={{ width: 150, textAlign: 'center' }}>
				<Box
					component="img"
					src={posterSrc}
					alt={credit.title}
					loading="lazy"
					onError={(e) => {
						e.currentTarget.onerror = null;
						e.currentTarget.src = noUser;
					}}
					sx={{
						width: '100%',
						height: 225, // ratio 2:3
						objectFit: 'cover',
						borderRadius: 1,
						display: 'block',
					}}
				/>
				<Typography variant="subtitle2" noWrap>
					{credit.title}
				</Typography>
				<Typography variant="caption" color="text.secondary" noWrap>
					{credit.release_date ? new Date(credit.release_date).getFullYear() : '—'} as {credit.character}
				</Typography>
			</Box>
		</Button>
	);
};

import { useParams } from 'react-router-dom';
import { Box, Typography, Chip, Link } from '@mui/material';
import { useActor } from '../hooks/useActor';
import noUser from '../../assets/no-user.png';
import { CreditsCard } from '../components/CreditsCard';

export const ActorPage = () => {
	const { id } = useParams();
	const { actor, credits } = useActor(id!);
	const url = process.env.REACT_APP_IMAGES_URL!;
	const photoSrc = actor?.profile_path ? `${url}${actor.profile_path}` : noUser;

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
					component="img"
					src={photoSrc}
					alt={actor?.name}
					loading="lazy"
					onError={(e) => {
						e.currentTarget.onerror = null;
						e.currentTarget.src = noUser;
					}}
					sx={{
						gridColumn: 'span 4',
						width: '100%',
						height: 'auto',
						objectFit: 'cover',
						borderRadius: 2,
						display: 'block',
					}}
				/>
				<Box
					sx={{
						gridColumn: 'span 8',
						minWidth: 0,
					}}
				>
					<Typography variant="h4" gutterBottom>
						{actor?.name}
					</Typography>
					<Typography variant="body2" color="text.secondary" gutterBottom>
						{actor?.known_for_department}
					</Typography>
					<Typography variant="body2" gutterBottom>
						<strong>Born:</strong> {actor?.birthday ? new Date(actor.birthday).toLocaleDateString() : '—'} in{' '}
						{actor?.place_of_birth}
					</Typography>
					{actor?.deathday && (
						<Typography variant="body2" gutterBottom>
							<strong>Died:</strong> {new Date(actor.deathday).toLocaleDateString()}
						</Typography>
					)}
					{actor?.homepage && (
						<Typography variant="body2" gutterBottom>
							<strong>Homepage:</strong>{' '}
							<Link href={actor.homepage} target="_blank" rel="noopener">
								{actor.homepage}
							</Link>
						</Typography>
					)}

					<Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
						{actor?.also_known_as.map((aka) => (
							<Chip key={aka} label={aka} size="small" />
						))}
					</Box>

					<Box sx={{ mt: 4 }}>
						<Typography variant="h6" gutterBottom>
							Biography
						</Typography>
						<Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
							{actor?.biography}
						</Typography>
					</Box>
				</Box>
				<Box sx={{ gridColumn: '1 / -1', mt: 4 }}>
					<Typography variant="h6" gutterBottom>
						Credits
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
						{credits?.map((credit) => (
							<Box key={credit.credit_id} sx={{ flex: '0 0 auto' }}>
								<CreditsCard credit={credit!} />
							</Box>
						))}
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

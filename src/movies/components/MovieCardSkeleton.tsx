import { Box, Skeleton } from '@mui/material';

export const MovieCardSkeleton = () => (
	<Box sx={{ position: 'relative' }}>
		<Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 4 }} />
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
			<Box sx={{ flex: 1 }}>
				<Skeleton variant="text" width="80%" />
				<Skeleton variant="text" width="100%" />
				<Skeleton variant="text" width="40%" />
			</Box>
			<Skeleton variant="rectangular" width={80} height={30} sx={{ borderRadius: 1, ml: 2 }} />
		</Box>
	</Box>
);

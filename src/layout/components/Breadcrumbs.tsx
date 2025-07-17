import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, SvgIconTypeMap } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { OverridableComponent } from '@mui/material/OverridableComponent';

const breadcrumbNameMap: Record<string, { text: string; icon: OverridableComponent<SvgIconTypeMap> }> = {
	'/home': { text: 'Home', icon: HomeIcon },
	'/favorites': { text: 'Favorites', icon: FavoriteIcon },
};

export const Breadcrumbs = () => {
	const location = useLocation();
	const pathnames = location.pathname.split('/').filter((x) => x);

	return (
		<MuiBreadcrumbs
			separator={<NavigateNextIcon fontSize="small" />}
			aria-label="breadcrumb"
			sx={{
				color: 'white',
				pl: 2,
				pt: 0.5,
			}}
		>
			<Typography variant="h6" noWrap component="div">
				<Link underline="none" color="inherit">
					Movies
				</Link>
			</Typography>
			{pathnames.map((value, index) => {
				const to = `/${pathnames.slice(0, index + 1).join('/')}`;
				const isLast = index === pathnames.length - 1;
				const { icon: Icon, text } = breadcrumbNameMap[to];

				return isLast ? (
					<Typography key={to} color="white" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
						<Icon fontSize="small" />
						{text || value}
					</Typography>
				) : (
					<Link
						key={to}
						underline="hover"
						color="inherit"
						component={RouterLink}
						to={to}
						sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
					>
						<Icon fontSize="small" />
						{text || value}
					</Link>
				);
			})}
		</MuiBreadcrumbs>
	);
};

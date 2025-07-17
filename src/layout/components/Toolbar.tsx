import { AppBar as MuiAppBar, Box, IconButton, Toolbar as MuiToolbar, Typography, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeToggleButton } from './ThemeToggleButton';
import { Breadcrumbs } from './Breadcrumbs';

interface Props {
	open: boolean;
	drawerWidth: number;
	handleDrawerOpen?: () => void;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth',
})<Props>(({ theme, open, drawerWidth }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

export const Toolbar = ({ open, handleDrawerOpen, drawerWidth }: Props) => {
	return (
		<AppBar
			position="fixed"
			open={open}
			drawerWidth={drawerWidth}
			sx={{
				zIndex: (theme) => theme.zIndex.drawer + 1,
			}}
		>
			<MuiToolbar>
				{!open && (
					<IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
				)}
				<Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'start' }}>
					<Breadcrumbs />
				</Typography>
				<Box sx={{ display: 'flex', gap: 1 }}>
					<IconButton aria-label="language" color="inherit">
						<LanguageIcon />
					</IconButton>
					<IconButton aria-label="search" color="inherit">
						<SearchIcon />
					</IconButton>
					<ThemeToggleButton />
				</Box>
			</MuiToolbar>
		</AppBar>
	);
};

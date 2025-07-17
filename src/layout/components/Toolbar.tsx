import { AppBar, Box, IconButton, Toolbar as MuiToolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeToggleButton } from './ThemeToggleButton';

interface Props {
	open: boolean;
	handleDrawerOpen: () => void;
	drawerWidth: number;
}

export const Toolbar = ({ open, handleDrawerOpen, drawerWidth }: Props) => {
	return (
		<AppBar
			position="fixed"
			sx={{
				width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
				ml: open ? `${drawerWidth}px` : 0,
				transition: 'width 0.3s ease, margin 0.3s ease',
			}}
		>
			<MuiToolbar>
				{!open && (
					<IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
				)}
				<Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
					Movies
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

import { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Sidebar } from './Sidebar';
import { Toolbar } from './Toolbar';
import { AppRouter } from '../../router/AppRouter';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
	open?: boolean;
}>(({ theme, open }) => ({
	flexGrow: 1,
	padding: theme.spacing(3),

	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: open ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen,
	}),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
	...theme.mixins.toolbar,
}));

export const Layout = () => {
	const [open, setOpen] = useState(false);

	const handleDrawerOpen = () => setOpen(true);
	const handleDrawerClose = () => setOpen(false);

	return (
		<Box sx={{ display: 'flex' }}>
			<Toolbar open={open} handleDrawerOpen={handleDrawerOpen} drawerWidth={drawerWidth} />
			<Sidebar open={open} handleDrawerClose={handleDrawerClose} drawerWidth={drawerWidth} />
			<Main open={open}>
				<DrawerHeader />
				<AppRouter />
			</Main>
		</Box>
	);
};

import {
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	useTheme,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
	open: boolean;
	handleDrawerClose: () => void;
	drawerWidth: number;
}

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));

export const Sidebar = ({ open, handleDrawerClose, drawerWidth }: Props) => {
	const theme = useTheme();

	const menuItems = [
		{ id: 'Home', icon: HomeIcon },
		{ id: 'Favorites', icon: FavoriteIcon },
	];

	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					boxSizing: 'border-box',
				},
			}}
			variant="persistent"
			anchor="left"
			open={open}
		>
			<DrawerHeader>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
			</DrawerHeader>
			<Divider />
			<List>
				{menuItems.map(({ id, icon: IconComponent }) => (
					<ListItem key={id} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<IconComponent />
							</ListItemIcon>
							<ListItemText primary={id} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Drawer>
	);
};

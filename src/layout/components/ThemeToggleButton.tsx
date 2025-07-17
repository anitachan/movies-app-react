import { IconButton, useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useColorMode } from '../context/ThemeContext';

export const ThemeToggleButton = () => {
	const theme = useTheme();
	const { toggleColorMode } = useColorMode();

	return (
		<div>
			<IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
				{theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
			</IconButton>
		</div>
	);
};

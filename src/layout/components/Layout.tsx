import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { AppRouter } from '../../router/AppRouter';
import { Sidebar } from './Sidebar';
import { Toolbar } from './Toolbar';

export interface LayoutProps {
  ToolbarComponent?: React.ComponentType<{
    open: boolean;
    handleDrawerOpen: () => void;
    drawerWidth: number;
  }>;
  SidebarComponent?: React.ComponentType<{
    open: boolean;
    handleDrawerClose: () => void;
    drawerWidth: number;
  }>;
}

const drawerWidth = 240;

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: open
      ? theme.transitions.duration.enteringScreen
      : theme.transitions.duration.leavingScreen,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

export const Layout: React.FC<LayoutProps> = ({
  ToolbarComponent = Toolbar,
  SidebarComponent = Sidebar,
}) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <ToolbarComponent open={open} handleDrawerOpen={handleDrawerOpen} drawerWidth={drawerWidth} />
      <SidebarComponent
        open={open}
        handleDrawerClose={handleDrawerClose}
        drawerWidth={drawerWidth}
      />
      <Main open={open}>
        <DrawerHeader />
        <AppRouter />
      </Main>
    </Box>
  );
};

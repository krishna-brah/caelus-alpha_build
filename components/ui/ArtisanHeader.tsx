import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Container,
  Avatar,
  Menu,
  MenuItem,
  styled,
  alpha,
} from '@mui/material';
import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: 'blur(8px)',
  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  boxShadow: 'none',
  '& .MuiToolbar-root': {
    padding: theme.spacing(1, 2),
  },
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 700,
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginRight: theme.spacing(4),
}));

const NavButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '0.95rem',
  color: theme.palette.text.primary,
  padding: theme.spacing(1, 2),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
  },
}));

interface NavItem {
  label: string;
  href: string;
}

interface ArtisanHeaderProps {
  navItems: NavItem[];
  onMenuOpen?: () => void;
  userAvatar?: string;
  userName?: string;
}

export const ArtisanHeader: React.FC<ArtisanHeaderProps> = ({
  navItems,
  onMenuOpen,
  userAvatar,
  userName,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuOpen}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Logo variant="h6" noWrap>
            Caelus
          </Logo>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
            {navItems.map((item) => (
              <NavButton
                key={item.label}
                href={item.href}
              >
                {item.label}
              </NavButton>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {userName ? (
              <>
                <IconButton onClick={handleProfileClick} sx={{ p: 0 }}>
                  {userAvatar ? (
                    <Avatar alt={userName} src={userAvatar} />
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My Designs</MenuItem>
                  <MenuItem onClick={handleClose}>Settings</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="contained"
                sx={{
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                }}
              >
                Get Started
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};
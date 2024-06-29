import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Quotes
          </Typography>

          <Button
            component={NavLink}
            to="/"
            color="inherit"
            className="ms-auto"
          >
            quotes
          </Button>
          <Button component={NavLink} to="/new-quote" color="inherit">
            New quote
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;

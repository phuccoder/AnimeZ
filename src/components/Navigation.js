import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

export default function Navigation() {
  //
  const { user, logOut } = UserAuth();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Thêm state mới
  const [currentUser, setCurrentUser] = React.useState(null); // Thêm state mới

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    setCurrentUser(user); // Cập nhật currentUser khi user thay đổi
  }, [user]);

  React.useEffect(() => {
    setIsLoggedIn(!!currentUser);
  }, [currentUser]);

  return (
    <div className="Naviagation">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: "black" }}>
          <Toolbar>
            <Link to="/">
              <img
                src="assets/images/logo.png"
                alt="logo"
                width="150"
                height="40"
              />
            </Link>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>

            {isLoggedIn ? ( // Sử dụng isLoggedIn để kiểm tra xem người dùng đã đăng nhập hay chưa
              <div>
                <Tooltip title="User Profile">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={currentUser?.displayName}
                      src={currentUser?.photoURL}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link to="/dashboard" style={{ textDecoration: "none" }}>
                        Dashboard
                      </Link>
                    </Typography>
                  </MenuItem>

                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link to="/" style={{ textDecoration: "none" }}>
                        Home
                      </Link>
                    </Typography>
                  </MenuItem>

                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link to="/contact" style={{ textDecoration: "none" }}>
                        Contact
                      </Link>
                    </Typography>
                  </MenuItem>

                  <MenuItem>
                    <Typography textAlign="center" onClick={handleSignOut}>
                      <Link to="/" style={{ textDecoration: "none" }}>
                        Logout
                      </Link>
                    </Typography>
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Sign in
                </Button>
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <div className="bottom-line"></div>
    </div>
  );
}

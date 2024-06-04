import "./index.scss";
import { Button, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SaveIcon from '@mui/icons-material/Save';
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";

const Layout = () => {
  return (
    <>
    <Navbar />
    
    <div className='layout'>
      <div className="sidebar">
        <Button className="new-btn" variant="outlined" fullWidth>New</Button>

        <ListItemButton sx={{ borderRadius:"30px" }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton sx={{ borderRadius:"30px" }} selected>
          <ListItemIcon>
            <NotificationsNoneIcon />
          </ListItemIcon>
          <ListItemText primary="Activity" />
        </ListItemButton>
        <ListItemButton sx={{ borderRadius:"30px" }}>
          <ListItemIcon>
            <SaveIcon />
          </ListItemIcon>
          <ListItemText primary="My Drive" />
        </ListItemButton>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
    </>

  )
}

export default Layout
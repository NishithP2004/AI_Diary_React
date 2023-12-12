import "./Sidebar.css";
import { FaDatabase } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Tooltip, IconButton } from "@mui/material";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="glass">
      <ul>
        <li onClick={() => navigate("/")}>
          <Tooltip title="Home">
            <IconButton
              style={{
                fontSize: "1em",
                color: "aliceblue",
              }}
            >
              <FaHome />
            </IconButton>
          </Tooltip>
        </li>
        <li onClick={() => navigate("/db")}>
          <Tooltip title="Database">
            <IconButton
              style={{
                fontSize: "1em",
                color: "aliceblue",
              }}
            >
              <FaDatabase />
            </IconButton>
          </Tooltip>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;

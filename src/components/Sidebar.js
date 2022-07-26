import React from "react";
import "../pages/Projects/Projects.css";
import Icons from "./Icons.js";
import HomeSvg from "../assets/svg/home.svg";
import chatSvg from "../assets/svg/chat.svg";
import calenderSvg from "../assets/svg/calender.svg";
import projectSvg from "../assets/svg/project.svg";
import settingSvg from "../assets/svg/setting.svg";
import logoutSvg from "../assets/svg/logout.svg";
import statsSvg from "../assets/svg/stats.svg";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function Sidebar() {
  const navigate = useNavigate();
  const Auth = getAuth();
  return (
    <div className="SideBarWrapper">
      <div className="FirstWrapper">.taskez</div>
      <div className="SecondWrappere">
        <Icons name="Home" icon={HomeSvg} />
        <Icons name="Stats" icon={statsSvg} />
        <Icons name="Projects" icon={projectSvg} />
        <Icons name="Chat" icon={chatSvg} />
        <Icons name="Calendar" icon={calenderSvg} />
      </div>
      <div className="LastWrapper">
        <Icons name="Setting" icon={settingSvg} />
        <div
          onClick={() => {
            Auth.signOut();
            navigate("/auth");
          }}
        >
          <Icons name="Log Out" icon={logoutSvg} />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

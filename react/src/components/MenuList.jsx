import { Menu } from "antd";
import {
  HomeOutlined,
  PieChartOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const MenuList = ({ darkTheme, onSidebarToggle, isSidebarOpen }) => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Sidebar Collapse Button */}
      <div style={{ padding: "10px", textAlign: "center" }}></div>
      <Menu
        theme={darkTheme ? "dark" : "light"}
        mode="inline"
        className="menu-bar"
        inlineCollapsed={!isSidebarOpen}
      >
        <Menu.Item
          onClick={() => navigate("/")}
          key="home"
          icon={<HomeOutlined />}
        >
          Home
        </Menu.Item>
        <Menu.Item
          key="student"
          icon={<UserOutlined />}
          onClick={() => navigate("/discussionboards")}
        >
          Student View
        </Menu.Item>
        <Menu.SubMenu
          key="subteacher"
          icon={<PieChartOutlined />}
          title="Teacher View"
        >
          <Menu.Item
            key="interaction"
            onClick={() => navigate("/discussionboards")}
          >
            Interaction Graph
          </Menu.Item>
          <Menu.Item key="summary" onClick={() => navigate("/summary")}>
            Summary
          </Menu.Item>
          <Menu.Item key="analytics" onClick={() => navigate("/analytics")}>
            Analytics
          </Menu.Item>
          <Menu.Item key="grades" onClick={() => navigate("/grades")}>
            Grades
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};

/**
 * React component props for the `MenuList` component.
 * @property {boolean} darkTheme - Indicates whether the menu should use a dark theme.
 * @property {function} onSidebarToggle - Callback function to toggle the sidebar.
 * @property {boolean} isSidebarOpen - Indicates whether the sidebar is currently open.
 */
MenuList.propTypes = {
  darkTheme: PropTypes.bool,
  onSidebarToggle: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
};

export default MenuList;

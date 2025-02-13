/**
 * The main React application component that handles routing and layout.
 * It sets up the main layout with a sidebar and a content area, and defines the routes for the different pages of the application.
 * The component also manages the state of the dark theme and the collapsed state of the sidebar.
 */
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Button, Layout, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import store from "./store";
import HomePage from "./pages/HomePage";
import FourOFourPage from "./pages/404Page";
import InteractionGraph from "./pages/StudentInteractionGraph";
import GradePage from "./pages/GradePage";
import DiscussionBoards from "./pages/DiscussionBoards";
import DiscussionBoardDetail from "./pages/DiscussionBoardDetail";
import Dashboard from "./pages/Dashboard";
import Logo from "./components/Logo";
import MenuList from "./components/MenuList";
import ToggleThemeButton from "./components/ToggleThemeButton";
import ReplyButtonPage from "./pages/ReplyButtonPage";
import ChatPage from "./pages/ChatPage";
import StudentList from "./pages/test";
import UserPostsPage from "./pages/UserPostsPage";

const { Header, Sider } = Layout;

const App = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Sider
            collapsed={collapsed}
            collapsible
            trigger={null}
            theme={darkTheme ? "dark" : "light"}
            className="sidebar"
          >
            <Logo />
            <MenuList darkTheme={darkTheme} />
            <ToggleThemeButton
              darkTheme={darkTheme}
              toggleTheme={toggleTheme}
            />
          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>
              <Button
                type="text"
                className="toggle"
                onClick={() => setCollapsed(!collapsed)}
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              />
            </Header>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/student" element={<InteractionGraph />} />
              <Route
                path="/interaction/:boardId"
                element={<InteractionGraph />}
              />
              <Route path="/discussionboards" element={<DiscussionBoards />} />
              <Route
                path="/discussion/:boardnId"
                element={<DiscussionBoardDetail />}
              />
              <Route path="/grades" element={<GradePage />} />
              <Route path="/analytics" element={<Dashboard />} />
              <Route path="/*" element={<FourOFourPage />} />
            </Routes>
          </Layout>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;

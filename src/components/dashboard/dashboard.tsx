import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Button, Layout, Menu } from "antd";
import Cookies from "js-cookie";
import { Link, Outlet, useNavigate } from "react-router";
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { LayoutDatas } from "../../layout/layout.datas";

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = LayoutDatas.map((item) => {
  return {
    key: item.id,
    icon: React.createElement(item.icon),
    label: <Link to={item.path}>{item.title}</Link>,
    children: item.children?.map((innerItem) => {
      return {
        key: innerItem.id,
        label: <Link to={innerItem.path}>{innerItem.title}</Link>,
        icon: React.createElement(innerItem.icon),
      };
    }),
  }
})
const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  
  const logout=()=>{
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    navigate("/signIn");
  }

  const [collapsed, setCollapsed] = useState(false);


  return (
    
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["0"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "white",
            paddingRight: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              paddingLeft: "20px",
            }}
          />
          <button
            style={{
              width: "50px",
              height: "50px",
              background: "black",
              border: "none",
            }}
            onClick={logout}
          >
            <LogoutOutlined />
          </button>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "white",
            borderRadius: "20px",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

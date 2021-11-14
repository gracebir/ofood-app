import React, { useEffect, useState } from "react";
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  DashboardOutlined,
  BankOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons';
import { useHistory } from "react-router";


export default function Overview({children}) {
  
  const [ collapsed, setCollapsed ] = useState();
  const history = useHistory()
  const { Header, Sider, Content } = Layout;

  const toggle = () => {
      setCollapsed(!collapsed)
  };

  return (
      <Layout style={{
          height: "100%",
      }}>
      <Sider collapsed={collapsed} onCollapse={toggle} collapsible 
          style={{
              height: "100vh",
              paddingTop: "50px"
          }}
      >
        <div className="logo" style={{ backgroundColor: "gray", padding: "10px", margin: "auto",
        textAlign: "center", marginBottom: "20px" }}
        >Ibrahim Bagalwa</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" onClick={() =>history.push("/admin")} icon={<DashboardOutlined />}>
            Tableau de bord
          </Menu.Item>
          <Menu.Item key="2" onClick={() =>history.push("/admin/users")} icon={<UserOutlined />}>
            Utilisateurs
          </Menu.Item>
          <Menu.Item key="3" onClick={() =>history.push("/admin/companys")} icon={<BankOutlined />}>
            Ajouter un Produit
          </Menu.Item>
          <Menu.Item key="4" onClick={() =>history.push("/admin/orders")} icon={<DollarCircleOutlined />}>
            Commandes
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: "40px", backgroundColor: "white" }}>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
  }
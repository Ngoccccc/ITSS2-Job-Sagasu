import React, { useState, useLayoutEffect } from "react";
import { Flex, Menu } from "antd";
import { FaLeaf } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState("1");

  useLayoutEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/admin/verify-user")) {
      setSelected("1");
    }
  }, [location.pathname]);

  const handleMenuItemClick = (key) => {
    setSelected(key);
    switch (key) {
      case "1":
        navigate("/admin/verify-user");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Menu
        mode="inline"
        selectedKeys={[selected]}
        className="menu-bar"
        onSelect={({ key }) => handleMenuItemClick(key)}
        items={[
          {
            key: "1",
            icon: <FaLeaf />,
            label: "Xác thực người dùng",
          },
        ]}
      />
    </>
  );
};

export default Sidebar;

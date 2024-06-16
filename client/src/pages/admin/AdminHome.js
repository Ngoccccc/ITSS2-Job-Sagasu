import React from "react";
import AdminLayout from "../../components/Layout/Admin/Layout";

const AdminHome = () => {
  return (
    <AdminLayout>
      Đây là trang admin - trong trang admin: ta có thể xác thực nhà tuyển dụng
      với những thông tin mà họ cung cấp. Các nhà tuyển dụng sau khi được xác
      thực mới có thể đăng bài được
    </AdminLayout>
  );
};

export default AdminHome;

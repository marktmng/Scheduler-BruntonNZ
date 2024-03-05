import React from 'react';
import { Menu, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './navbar.css';

const TopNavbar = ({ handleTopMenuClick, selectTopMenu }) => {
  const uploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Menu
      className="top-menu-bar"
      mode="horizontal"
      selectedKeys={selectTopMenu ? [selectTopMenu] : []}
      onClick={handleTopMenuClick}
    >
      <Menu.Item key="home" className="nav-item"> Home </Menu.Item>
      <Menu.Item key="about" className="nav-item"> About </Menu.Item>
      <Menu.Item key="contact" className="nav-item"> Contact</Menu.Item>
      {/* Upload Image Button */}
      <Menu.Item key="upload" className="nav-item" style={{ position: 'absolute', right: 0 }}>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />} />
        </Upload>
      </Menu.Item>
    </Menu>
  );
};

export default TopNavbar;

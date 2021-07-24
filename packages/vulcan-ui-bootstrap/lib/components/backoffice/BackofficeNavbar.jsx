import React from 'react';
import { registerComponent } from 'meteor/vulcan:lib';
import Navbar from 'react-bootstrap/Navbar';

const BackofficeNavbar = ({ onClick, basePath }) => {
  return (
    <Navbar collapseOnSelect variant="admin" expand="md">
      <Navbar.Toggle onClick={onClick} style={{ display: 'block' }} />
      <Navbar.Brand href={basePath}>S</Navbar.Brand>
    </Navbar>
  );
};

registerComponent('VulcanBackofficeNavbar', BackofficeNavbar);

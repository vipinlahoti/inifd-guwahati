import React from 'react';
import { registerComponent } from 'meteor/vulcan:lib';

const styles = {
  wrapper: {
    display: 'flex'
  },
  side: {
    overflowX: 'hidden',
    transition: 'all 0.5s ease-out',
    position: 'static',
  },
  sideOpen: {
    minWidth: '200px',
    visibility: 'visible',
  },
  sideClosed: {
    minWidth: '0',
    width: '0',
    visibility: 'hidden',
  }
};

const BackofficeVerticalMenuLayout = ({ side, main, open }) => {
  return (
    <div style={styles.wrapper}>
      <div className="navbar-sidebar" style={open ? { ...styles.side, ...styles.sideOpen } : { ...styles.side, ...styles.sideClosed }}>{side}</div>

      <div className="section-dashboard">
        {main}
      </div>
    </div>
  );
};

registerComponent('VulcanBackofficeVerticalMenuLayout', BackofficeVerticalMenuLayout);

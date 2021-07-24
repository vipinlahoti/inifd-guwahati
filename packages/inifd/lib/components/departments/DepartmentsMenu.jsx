import { Components, registerComponent, withMulti, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Departments } from '../../modules/departments/index.js';
import { withApollo } from 'react-apollo';
import get from 'lodash/get';

const DepartmentsMenu = props => {
  const { match, results } = props;

  let menuItems = [
    {
      to: '/',
      labelId: 'departments.all',
    },
  ];

  if (results) {
    menuItems = [
      ...menuItems,
      ...results.map(({ name, slug }) => {
        return {
          to: {
            pathname: `/department/${slug}`,
          },
          label: name,
          linkProps: {
            isActive: () => get(match, 'params.slug') === slug,
          },
        };
      }),
    ];
  }

  return (
    <Components.Dropdown
      buttonProps={{ variant: 'secondary' }}
      className="departments-list"
      labelId={'departments'}
      id="departments-dropdown"
      menuItems={menuItems}
    />
  );
};

const options = {
  collection: Departments,
  fragmentName: 'DepartmentItem',
  limit: 0,
  queryOptions: {
    pollInterval: 0,
  },
};

registerComponent({
  name: 'DepartmentsMenu',
  component: DepartmentsMenu,
  hocs: [withRouter, withApollo, [withMulti, options], withCurrentUser],
});

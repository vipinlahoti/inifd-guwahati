import { Components, registerComponent, withMulti, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Courses } from '../../modules/courses/index.js';
import { withApollo } from 'react-apollo';
import get from 'lodash/get';

const CoursesMenu = props => {
  const { match, results } = props;

  let menuItems = [
    {
      to: '/docs',
      labelId: 'courses.all',
    },
  ];

  if (results) {
    menuItems = [
      ...menuItems,
      ...results.map(({ name, slug }) => {
        return {
          to: {
            pathname: `/docs/course/${slug}`,
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
    <div className="courses-list">
      <Components.Dropdown
        buttonProps={{ variant: 'flat' }}
        labelId={'courses'}
        id="courses-dropdown"
        menuItems={menuItems}
      />
    </div>
  );
};

const options = {
  collection: Courses,
  fragmentName: 'CourseItem',
  limit: 0,
  queryOptions: {
    pollInterval: 0,
  },
};

registerComponent({
  name: 'CoursesMenu',
  component: CoursesMenu,
  hocs: [withRouter, withApollo, [withMulti, options], withCurrentUser],
});

import { Components, registerComponent, withMulti2 } from 'meteor/vulcan:core';
import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { Courses } from '../../modules/courses/index.js';

const CourseDropdown = ({results}) => {
  if (results && results.length > 0) {
    return results.map(course =>      
      <React.Fragment key={course._id}>
        <LinkContainer to={{ pathname: course.pagePath}} key={course._id}>
          <NavDropdown.Item>
            {course.name}
          </NavDropdown.Item>
        </LinkContainer>
      </React.Fragment>
    )
  } else {
    return null;
  }
}

const options = {
  collection: Courses,
  fragmentName: 'CourseItem',
};

registerComponent({
  name: 'CourseDropdown',
  component: CourseDropdown,
  hocs: [
    [withMulti2, options]
  ]
});

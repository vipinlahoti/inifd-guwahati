import { Components, registerComponent, withMulti2 } from 'meteor/vulcan:core';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Courses } from '../../modules/courses/index.js';

const Course = ({results, loading}) => {
  if (results && results.length > 0) {
    return results.map(course =>
      <Col md={4} sm={12} xs={4} className="text-left mb-3" key={course._id}>
        <Link to={{ pathname: course.pagePath }} className="image-wrapper">
          <span
            className="img-overlay image-container"
            style={{
              backgroundImage: `url(${course.thumbnailUrl ? course.thumbnailUrl : course.thumbnail ? course.thumbnail : '/images/p9.jpg'})`,
            }}
          ></span>
          <span className="title-5">{course.name}</span>
        </Link>
      </Col>
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
  name: 'Course',
  component: Course,
  hocs: [
    [withMulti2, options]
  ]
});

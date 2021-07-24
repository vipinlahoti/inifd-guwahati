import { Components, registerComponent, withSingle, withCurrentUser, withMessages } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import React, { Component } from 'react';
import mapProps from 'recompose/mapProps';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Programs } from '../../modules/programs/index.js';

class ProgramsPage extends Component {
  render() {
    if (this.props.loading) {
      return (
        <div className="docs-page">
          <Components.Loading />
        </div>
      );
    } else if (!this.props.document) {
      return (
        <Components.Error404 />
      );
    } else {
      const doc = this.props.document;
      const currentUser = this.props.currentUser;

      const htmlBody = { __html: doc.htmlBody };

      const courses = doc.courses;

      return (
        <React.Fragment>
          <Components.HeadTags
            url={doc.pageUrl}
            title={doc.title}
            description={doc.title}
          />

          {courses && courses.map(course =>
            <Components.HeroJumbotron 
              key={course._id}
              eyebrow={course.name}
              title={doc.title}
              description=""
            />
          )}

          <div className="section">
            <Container>
              <Row>
                <Col md={9} xs={4}>
                  <div className="pb-5">
                    {doc.htmlBody ? <div className="text-left editor-text" dangerouslySetInnerHTML={htmlBody}></div> : null}
                  </div>
                </Col>
                <Col md={3} xs={4}>
                  <div className="bg-dark text-white p-1">
                    <h5>Course</h5>
                    {courses && courses.map(course =>
                      <p key={course._id}>{course.name}</p>
                    )}
                    <hr />
                    <h5>Duration</h5>
                    <p>{doc.duration}</p>
                    <hr />
                    <h5>Level</h5>
                    <p>{doc.level}</p>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>

        </React.Fragment>
      );
    }
  }
}

const queryOptions = {
  collection: Programs,
  queryName: 'docsSingleQuery',
  fragmentName: 'ProgramPage',
};

const mapPropsFunction = props => ({
  ...props,
  documentId: props.match && props.match.params._id,
});

registerComponent(
  // component name used by Vulcan
  'ProgramsPage',
  // React component
  ProgramsPage,
  mapProps(mapPropsFunction),
  // HOC to give access to the current user
  withCurrentUser,
  withMessages,
  // HOC to load the data of the document, based on queryOptions & a documentId props
  [withSingle, queryOptions]
);

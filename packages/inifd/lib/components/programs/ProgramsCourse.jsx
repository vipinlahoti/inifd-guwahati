import { Components, registerComponent, withSingle, withCurrentUser, withMessages } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import get from 'lodash/get';
import mapProps from 'recompose/mapProps';
import { Row, Col, Container } from 'react-bootstrap';
import { Courses } from '../../modules/courses/index.js';

class ProgramsCourse extends Component {
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
      const slug = doc.slug;
      const input = { filter: { _byCourse: { slug } } };
      const currentUser = this.props.currentUser;

      const htmlBody = { __html: doc.htmlBody };

      return (
        <React.Fragment>
          <Components.HeadTags
            url={doc.pageUrl}
            title={doc.name}
            description={doc.name}
          />

          <Components.HeroJumbotron 
            title={doc.name}
            image={doc.thumbnailUrl}
            description=""
          />

          <div className="section pb-0">
            <Container>
              <Row>
                <Col>
                  {doc.description}
                </Col>
              </Row>
            </Container>
          </div>

          <div className="section pt-3">
            <Container>
              <Row>
                <Components.ProgramsList input={input} />
              </Row>
            </Container>
          </div>
        </React.Fragment>
      )
    }
  }
}

const queryOptions = {
  collection: Courses,
  queryName: 'docsSingleQuery',
  fragmentName: 'CourseItem',
};

const mapPropsFunction = props => ({
  ...props,
  documentId: props.match && props.match.params._id,
});

registerComponent(
  // component name used by Vulcan
  'ProgramsCourse',
  // React component
  ProgramsCourse,
  mapProps(mapPropsFunction),
  // HOC to give access to the current user
  withCurrentUser,
  withMessages,
  // HOC to load the data of the document, based on queryOptions & a documentId props
  [withSingle, queryOptions]
);

import { Components, registerComponent, withMulti2, withSingle, withCurrentUser, withMessages } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import mapProps from 'recompose/mapProps';
import { Jumbotron, Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import moment from 'moment';
import { Pages } from '../../modules/pages/index.js';

class PagesPage extends Component {
  render() {
    if (this.props.loading) {
      return (
        <div className="pages-page">
          <Components.Loading />
        </div>
      );
    } else if (!this.props.document) {
      return (
        <Components.Error404 />
      );
    } else {
      const page = this.props.document;
      const currentUser = this.props.currentUser;

      const htmlBody = { __html: page.body };

      const course = page.features ? page.features[0].slug : null;

      return (
        <React.Fragment>
          <Components.HeadTags
            url={page.pageUrl}
            title={page.seoTitle}
            description={page.seoDescription}
          />

          <Components.HeroJumbotron 
            title={page.heroTitle}
            description={page.heroDescription}
          />

          <div className="section">
            <Container>
              {page.body ? <div dangerouslySetInnerHTML={htmlBody}></div> : null}
            </Container>
          </div>

         </React.Fragment>
      );
    }
  }
}

const queryOptions = {
  collection: Pages,
  queryName: 'pagesSingleQuery',
  fragmentName: 'PagePage',
};

const mapPropsFunction = props => ({
  ...props,
  documentId: props.match && props.match.params._id,
});

registerComponent(
  // component name used by Vulcan
  'PagesPage',
  // React component
  PagesPage,
  mapProps(mapPropsFunction),
  // HOC to give access to the current user
  withCurrentUser,
  withMessages,
  // HOC to load the data of the document, based on queryOptions & a documentId props
  [withSingle, queryOptions]
);

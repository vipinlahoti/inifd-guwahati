import { Components, registerComponent, withSingle2, withCurrentUser } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import React from 'react';
import { Link } from 'react-router-dom';
import mapProps from 'recompose/mapProps';
import get from 'lodash/get';
import { Row, Col, Container } from 'react-bootstrap';

const UsersProfile = ({ currentUser, loading, document: user }) => {
  if (loading) {
    return (
      <div className="page users-profile">
        <Components.Loading />
      </div>
    );
  } else if (!user) {
    return (
      <Components.Error404 />
    );
  } else {
    const userBio = user.htmlBio ? <div dangerouslySetInnerHTML={{ __html: user.htmlBio }} /> : null;
    
    return (
      <React.Fragment>
        <Components.HeadTags url={Users.getProfileUrl(user, true)} title={Users.getDisplayName(user)} />
        
        <Components.HeroJumbotron 
          title={Users.getDisplayName(user)}
          description={userBio}
        />

        <div className="section">
          <Container>
            <Row>
              <Col>
                <Components.PostsList input={{ filter: { userId: { _eq: user._id } } }} showHeader={false} />
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
};

UsersProfile.displayName = 'UsersProfile';

const options = {
  collection: Users,
  fragmentName: 'UsersProfile',
};

// make router slug param available as `slug` prop
const mapPropsFunction = props => ({ ...props, input: { filter: { slug: { _eq: get(props, 'match.params.slug') } } } });

registerComponent({
  name: 'UsersProfile',
  component: UsersProfile,
  hocs: [mapProps(mapPropsFunction), withCurrentUser, [withSingle2, options]],
});

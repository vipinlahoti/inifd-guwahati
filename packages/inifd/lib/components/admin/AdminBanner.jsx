import React from 'react';
import { Components, registerComponent, withAccess } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Container from 'react-bootstrap/Container';
import { Banners } from '../../modules/banner/collection.js';

const AdminBanner = () => (
  <div className="admin-banners">
    <Components.HeadTags title="Banner" description="Banner Page" />
    
    <Container>
      <h5 className="title-5 mb-1">Admin Banner</h5>
      <div className="instances__list">
        <Components.Datatable
          collection={Banners}
          columns={['title', 'image', 'thumbnail']}
        />
      </div>
    </Container>
  </div>
);

const accessOptions = {
  groups: ['admins'],
  redirect: '/',
  message: 'Sorry, you do not have the rights to access this page.',
};

registerComponent('AdminBanner', AdminBanner, [withAccess, accessOptions]);

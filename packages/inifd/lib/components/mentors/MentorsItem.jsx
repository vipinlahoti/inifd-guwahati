import { Components, registerComponent } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const MentorsItem = ({ mentor }) =>
  <div className="blog__list mb-2">
    <div className="d-flex">
      <div className="blog__list-desc d-flex">
        <div className="mr-1">
          {mentor.image ?
            <img className="mentors-avatar" src={mentor.image} alt={mentor.name} />
          : 
          mentor.thumbnail ?
            <img className="mentors-avatar" src={mentor.thumbnail} alt={mentor.name} />
          : 
            <img className="mentors-avatar" src="/images/avatar.png" alt={mentor.name} />
          }
        </div>
        <div>
          <h5 className="mb-0">{mentor.name}</h5>
          <p className="mb-xs font-weight-bold">{mentor.position}</p>
          <p>{mentor.description}</p>
        </div>  
      </div>
    </div>
  </div>

registerComponent({ name: 'MentorsItem', component: MentorsItem });

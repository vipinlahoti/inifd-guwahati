import { Components, registerComponent } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const FacultiesItem = ({ faculty }) =>
  <div className="blog__list mb-2">
    <div className="d-flex">
      <div className="blog__list-desc d-flex">
        <div className="mr-1">
          {faculty.image ?
            <img className="mentors-avatar" src={faculty.image} alt={faculty.name} />
          : 
          faculty.thumbnail ?
            <img className="mentors-avatar" src={faculty.thumbnail} alt={faculty.name} />
          : 
            <img className="mentors-avatar" src="/images/avatar.png" alt={faculty.name} />
          }
        </div>
        <div>
          <h5 className="mb-0">{faculty.name}</h5>
          <p className="mb-xs font-weight-bold">{faculty.position}</p>
          <p>{faculty.description}</p>
        </div>  
      </div>
    </div>
  </div>

registerComponent({ name: 'FacultiesItem', component: FacultiesItem });

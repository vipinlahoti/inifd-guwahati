import { Components, registerComponent } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const OurEventsItem = ({ event }) => {
  const todayDate = new Date();
  const checkEvent = moment(event.eventAt).isAfter(todayDate);

  return (
    <div className="blog__list mb-2">
      <div className="d-flex">
        <div className="blog__list-side mr-1">
          <div className={`blog__list-date text-center ${checkEvent ? 'blog__list-date--future' : 'blog__list-date--past'}`}>
            <span>{moment(new Date(event.eventAt)).format('Do MMM')}</span> <span className={`${checkEvent ? 'bg-primary' : 'bg-dark'} text-white`}>{moment(new Date(event.eventAt)).format('YYYY')}</span>
          </div>
        </div>
        <div className="blog__list-desc">
          <h6>{event.title}</h6>
          <div className="d-flex middle-xs">
            <Components.Icon name="location_on" />
            <p className="mb-0">{event.location}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
registerComponent({ name: 'OurEventsItem', component: OurEventsItem });

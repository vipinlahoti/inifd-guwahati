import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Link } from 'react-router-dom';

const TicketsDepartments = ({ ticket }) => {
  return (
    <React.Fragment>
      {ticket.departments.map(({ _id, name }) => (
        <React.Fragment key={_id}>
          {name}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

registerComponent({ name: 'TicketsDepartments', component: TicketsDepartments });

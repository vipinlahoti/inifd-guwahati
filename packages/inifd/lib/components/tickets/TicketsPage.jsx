import { Components, registerComponent, withSingle, withCurrentUser, withMessages } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import mapProps from 'recompose/mapProps';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { Tickets } from '../../modules/tickets/index.js';

class TicketsPage extends Component {
  render() {
    if (this.props.loading) {
      return (
        <div className="tickets-page">
          <Components.Loading />
        </div>
      );
    } else if (!this.props.document) {
      return (
        <Components.Error404 />
      );
    } else {
      const ticket = this.props.document;
      const currentUser = this.props.currentUser;

      const htmlBody = { __html: ticket.htmlBody };

      return (
        <React.Fragment>
          <Components.HeadTags url={ticket.pageUrl} title={ticket.subject}/>

          <Container>
            <Row>
              <Col>
                <h5 className="title-5 mb-1 breadcrumb__wrapper d-flex middle-xs">
                  <Link to={{ pathname: '/accounts/tickets' }}>
                    Tickets
                  </Link>
                  <span className="breadcrumb-divider">/</span>
                  {ticket.subject}
                </h5>
              </Col>
            </Row>

            <Row>
              <Col lg={6} md={12} sm={12} xs={4}>
                <ul className="list small-list count-list">
                  <li><span className="list-label">Ticket ID:</span> {ticket._id} </li>
                  <li>
                    <span className="list-label">Status:</span> 
                    <span className={`badge ${ticket.status === 'Open' ? 'badge-primary' : ''}`}>{ticket.status}</span>
                  </li>
                  <li><span className="list-label">Last updated:</span> {ticket.lastReplyedAt ? moment(new Date(ticket.lastReplyedAt)).fromNow() : <FormattedMessage id="tickets.dateNotDefined" />}</li>
                </ul>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className="thread__wrapper">
                  <div className="media">
                    <Components.UsersAvatar user={ticket.user} size="small" className="mr-1" addLink={false} />
                    <div className="media__body">
                      <div className="media__body-heading">
                        <strong>
                          <Components.UsersName user={ticket.user} />
                        </strong>
                        &nbsp; / &nbsp;
                        <span className="media-time">
                          {ticket.createdAt ? moment(new Date(ticket.createdAt)).fromNow() : <FormattedMessage id="tickets.dateNotDefined" />}
                        </span>
                        {ticket.user.groups && ticket.user.groups.map(group =>
                          <span className="badge" key={group}>{group}</span>
                        )}
                      </div>
                      <div className="media__body-description">
                        {ticket.htmlBody ? <div className="text-left" dangerouslySetInnerHTML={htmlBody}></div> : null}
                        <div className="media__body-vote"></div>
                      </div>
                    </div>
                  </div>

                  <Components.TicketsRepliesThread
                    status={ticket.status}
                    ticketId={ticket._id}
                    input={{
                      filter: { ticketId: { _eq: ticket._id } },
                      sort: { createdAt: 'asc' }
                    }}
                  />

                </div>
              </Col>
            </Row>
          </Container>

        </React.Fragment>
      );
    }
  }
}

const queryOptions = {
  collection: Tickets,
  queryName: 'ticketsSingleQuery',
  fragmentName: 'TicketPage',
};

const mapPropsFunction = props => ({
  ...props,
  documentId: props.match && props.match.params._id,
});

registerComponent(
  // component name used by Vulcan
  'TicketsPage',
  // React component
  TicketsPage,
  mapProps(mapPropsFunction),
  // HOC to give access to the current user
  withCurrentUser,
  withMessages,
  // HOC to load the data of the document, based on queryOptions & a documentId props
  [withSingle, queryOptions]
);

// , sort: {createdAt: 'asc'}

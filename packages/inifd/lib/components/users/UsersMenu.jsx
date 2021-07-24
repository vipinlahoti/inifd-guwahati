import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { STATES } from 'meteor/vulcan:accounts';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';


const UsersMenu = ({ currentUser, currentUserLoading, client, state }) => {
  return (
    <div className="users-menu">
      {currentUserLoading ? (
        <Components.Loading />
      ) : currentUser ? (
        <UserLoggedInMenu currentUser={currentUser} client={client} />
      ) : (
        <UserLoggedOutMenu state={state} />
      )}
    </div>
  );
};

const UserLoggedInMenu = ({ currentUser, client }) => {
  const menuItems = [];

  if (Users.isAdmin(currentUser)) {
    menuItems.push({
      to: `/admin/users`,
      labelId: 'admin.users',
    });

    menuItems.push({
      to: `/admin/enquiry`,
      labelId: 'admin.enquiry',
    });

    menuItems.push('divider');
    menuItems.push({
      to: `/admin/settings`,
      labelId: 'admin.settings',
    });
    menuItems.push({
      to: `/admin/banner`,
      labelId: 'admin.banner',
    });
    menuItems.push({
      to: `/admin/testimonials`,
      labelId: 'admin.testimonials',
    });
    menuItems.push({
      to: `/admin/mentors`,
      labelId: 'admin.mentors',
    });
    menuItems.push({
      to: `/admin/faculty`,
      labelId: 'admin.faculty',
    });
    menuItems.push({
      to: `/admin/courses`,
      labelId: 'admin.courses',
    });
    menuItems.push({
      to: `/admin/program`,
      labelId: 'admin.program',
    });
    menuItems.push({
      to: `/admin/events`,
      labelId: 'admin.events',
    });

    menuItems.push('divider');

    menuItems.push({
      to: `/admin/departments`,
      labelId: 'admin.departments',
    });
    menuItems.push({
      to: `/admin/tickets`,
      labelId: 'admin.tickets',
    });
    menuItems.push({
      to: `/admin/replies`,
      labelId: 'admin.replies',
    });

    menuItems.push('divider');

    menuItems.push({
      to: `/admin/pages`,
      labelId: 'admin.pages',
    });

    menuItems.push('divider');
  }

  else if (Users.isMemberOf(currentUser, 'staff')) {
    menuItems.push({
      to: `/admin/users`,
      labelId: 'admin.users',
    });

    menuItems.push('divider');
    menuItems.push({
      to: `/admin/settings`,
      labelId: 'admin.settings',
    });
    menuItems.push({
      to: `/admin/testimonials`,
      labelId: 'admin.testimonials',
    });
    menuItems.push({
      to: `/admin/courses`,
      labelId: 'admin.courses',
    });
    menuItems.push({
      to: `/admin/events`,
      labelId: 'admin.events',
    });

    menuItems.push('divider');

    menuItems.push({
      to: `/admin/departments`,
      labelId: 'admin.departments',
    });
    menuItems.push({
      to: `/admin/tickets`,
      labelId: 'admin.tickets',
    });
    menuItems.push({
      to: `/admin/replies`,
      labelId: 'admin.replies',
    });

    menuItems.push('divider');

    menuItems.push({
      to: `/admin/pages`,
      labelId: 'admin.pages',
    });

    menuItems.push('divider');
  }

  else {
    // dont know what should be here
  }

  menuItems.push({
    labelId: 'users.log_out',
    itemProps: {
      onClick: () => Meteor.logout(() => client.resetStore()),
    },
  });

  return (
    <Components.Dropdown
      buttonProps={{ variant: 'none pt-0 pb-0' }}
      id="user-dropdown"
      trigger={
        <div className="dropdown-toggle-inner">
          <Components.UsersAvatar size="xsmall" user={currentUser} addLink={false} />
        </div>
      }
      menuItems={menuItems}
    />
  );
};

const UserLoggedOutMenu = ({ state }) => (
  <Components.Dropdown
    buttonProps={{ variant: 'none pt-0 pb-0' }}
    id="accounts-dropdown"
    className="users-account-menu"
    trigger={
      <div className="dropdown-toggle-inner">
        <Components.Icon name="user" />
        <FormattedMessage id="users.sign_up_log_in" />
      </div>
    }
    menuContents={<Components.AccountsLoginForm formState={state ? STATES[state] : STATES.SIGN_UP} />}
  />
);

UsersMenu.propsTypes = {
  currentUser: PropTypes.object,
  client: PropTypes.object,
};

registerComponent({ name: 'UsersMenu', component: UsersMenu, hocs: [withCurrentUser, withApollo] });

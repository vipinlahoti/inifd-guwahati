import { registerComponent } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const UsersAvatar = ({ className, size, user, addLink }) => {
  const avatarClassNames = classNames('avatar', className);

  const sizes = {
    xsmall: '35px',
    small: '50px',
    medium: '80px',
    large: '120px'
  }

  const aStyle = {
    borderRadius: '100%',
    display: 'inline-block',
    height: sizes[size],
    width: sizes[size]
  }; 

  const imgStyle = {
    borderRadius: '100%',
    display: 'block',
    height: sizes[size],
    width: sizes[size]
  }; 

  const avatarUrl = user.avatarUrl || Users.avatar.getUrl(user);

  const img = (
    <img
      alt={Users.getDisplayName(user)}
      style={imgStyle}
      className={classNames('shadow-lg', avatarClassNames)}
      src={avatarUrl}
      title={user.username}
    />
  );
  const initials = (
    <span className={avatarClassNames}>
      <span>{Users.avatar.getInitials(user)}</span>
    </span>
  );

  const avatar = avatarUrl ? img : initials;

  return (
    <div className={classNames('avatar', className)}>
      {addLink ? (
        <Link to={Users.getProfileUrl(user)}>
          <span>{avatar}</span>
        </Link>
      ) : avatar}
    </div>
  );
};

UsersAvatar.propTypes = {
  user: PropTypes.object.isRequired,
  size: PropTypes.string,
  addLink: PropTypes.bool
};

UsersAvatar.defaultProps = {
  size: 'medium',
  addLink: true
};

UsersAvatar.displayName = 'UsersAvatar';

registerComponent({ name: 'UsersAvatar', component: UsersAvatar });

import { replaceComponent, Utils } from 'meteor/vulcan:lib';
import React from 'react';

const Icon = ({ name, iconClass, onClick }) => {
  const icons = Utils.icons;
  const iconCode = !!icons[name] ? icons[name] : name;
  iconClass = (typeof iconClass === 'string') ? ' '+iconClass : '';
  const c = 'material-icons icon' + ' icon-' + name + iconClass;
  return <i onClick={onClick} className={c} aria-hidden="true">{iconCode}</i>;
};

replaceComponent('Icon', Icon);

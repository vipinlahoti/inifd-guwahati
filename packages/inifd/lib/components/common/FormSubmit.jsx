import { Components, replaceComponent } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import React from 'react';
import PropTypes from 'prop-types';

const FormSubmit = ({
  submitForm,
  submitLabel,
  cancelLabel,
  cancelCallback,
  revertLabel,
  revertCallback,
  document,
  deleteDocument,
  collectionName,
  classes,
}, {
  isChanged,
  clearForm,
}) => (
  <div className="form-submit">
    <Components.Button type="submit" variant="primary-fill">
      {submitLabel ? submitLabel : <FormattedMessage id="forms.submit" />}
    </Components.Button>

    {cancelCallback ? (
      <Components.Button variant="primary-link" size="small"
        onClick={e => {
          e.preventDefault();
          cancelCallback(document);
        }}
      >
        {cancelLabel ? cancelLabel : <FormattedMessage id="forms.cancel" />}
      </Components.Button>
    ) : null}
  
    {revertCallback ? (
      <Components.Button variant="primary-link" size="small"
        onClick={e => {
          e.preventDefault();
          clearForm();
          revertCallback(document);
        }}
      >
      {revertLabel ? revertLabel : <FormattedMessage id="forms.revert"/>}
      </Components.Button>
    ) : null}
  
    {deleteDocument ? (
      <Components.Button
        variant="primary-link"
        size="small"
        onClick={deleteDocument}
        className={`delete-link ${collectionName}-delete-link`}
      >
        <Components.Icon name="close" /> <FormattedMessage id="forms.delete" />
      </Components.Button>
    ) : null}
  </div>
);

FormSubmit.propTypes = {
  submitLabel: PropTypes.node,
  cancelLabel: PropTypes.node,
  cancelCallback: PropTypes.func,
  revertLabel: PropTypes.node,
  revertCallback: PropTypes.func,
  document: PropTypes.object,
  deleteDocument: PropTypes.func,
  collectionName: PropTypes.string,
  classes: PropTypes.object,
};

FormSubmit.contextTypes = {
  isChanged: PropTypes.func,
  clearForm: PropTypes.func,
};

replaceComponent('FormSubmit', FormSubmit);

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FileItem from '@infobizzs/rn-form-builder/src/fields/file/FileItem';

export default class VideoField extends Component {
  static propTypes = {
    attributes: PropTypes.object,
    updateValue: PropTypes.func,
    theme: PropTypes.object,
    ErrorComponent: PropTypes.func,
  }
  constructor(props) {
    super(props);
  }

  render() {
    const { theme, attributes, ErrorComponent, updateValue } = this.props;
    return (
     <FileItem
      attributes={attributes}
      theme={theme}
      ErrorComponent={ErrorComponent}
      imageOnly={true}
      multiple={false}
      mediaType="video"
      updateValue={updateValue}
      />
    );
  }
}
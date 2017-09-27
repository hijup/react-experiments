import PropTypes from 'prop-types';
import React from 'react';

export default (Component) => {
  return class extends React.Component {
    static contextTypes = {
      experimentParameters: PropTypes.object.isRequired
    };

    render() {
      return (
        <Component {...this.props} {...this.context.experimentParameters}/>
      );
    }
  };
};
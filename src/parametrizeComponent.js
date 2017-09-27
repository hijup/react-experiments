import React from 'react';
import Parametrize from './parametrize';

export default (experiment, experimentParams, Component) => class extends React.Component {
  render() {
    return (
      <Parametrize experiment={experiment} params={experimentParams} _passThrough={true}>
        <Component {...this.props} />
      </Parametrize>
    );
  }
};

import PropTypes from 'prop-types';
import React from 'react';

export class When extends React.Component {
  static contextTypes = {
    experimentParameters: PropTypes.object.isRequired,
    experimentProps: PropTypes.object.isRequired
  };

  state = {
    shouldRender: false
  };

  componentWillUpdate(props, state) {
    if (state.shouldRender) {
      this.context.experimentProps.enrolledInVariation();
    }
  }

  componentDidMount() {
    this.shouldRenderVariation();
  }

  shouldRenderVariation = () => {
    const value = this.props.value;
    const paramName = this.context.experimentProps.on;
    if (this.context.experimentParameters && this.context.experimentParameters[paramName] === value) {
      this.setState({
        shouldRender: true
      });
    }
  };

  renderChildren = () => {
    return React.Children.map(this.props.children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {});
      }
      return child;
    });
  };

  render() {
    if (!this.state.shouldRender) {
      return null;
    }

    return (
      <span className='experiment-variation-component'>
        {this.renderChildren()}
      </span>
    );
  }
}

export class Default extends React.Component {
  static contextTypes = {
    experimentProps: PropTypes.object.isRequired
  };

  render() {
    if (this.context.experimentProps.hasRendered) {
      return null;
    }

    return (
      <span>
        {this.props.children}
      </span>
    );
  }
}

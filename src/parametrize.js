import React from 'react';

const Parametrize = React.createClass({
  propTypes: {
    // We don't accept multiple React elements as children. So the children technically is
    // "child" (singular).
    children: React.PropTypes.element.isRequired,
  },

  getInitialState() {
    return {
      experimentParameters: null
    };
  },

  childContextTypes: {
    experimentParameters: React.PropTypes.object,
    experimentProps: React.PropTypes.object.isRequired
  },

  getChildContext() {
    return {
      experimentParameters: this.state.experimentParameters,
      experimentProps: this.props
    };
  },

  componentWillMount() {
    this.fetchParameters();
  },

  fetchParameters() {
    const { experiment, params } = this.props;

    if (!experiment || !experiment.get) {
      console.error("You must pass in an experiment instance as a prop");
      return;
    } else if (!params) {
      console.error("You mass pass a list of params in as a prop");
      return;
    }

    let paramsObj = {};
    for (let i = 0; i < params.length; i++) {
      const param = params[i];
      const paramVal = experiment.get(param);
      if (paramVal !== null && paramVal !== undefined) {
        paramsObj[param] = paramVal;
      }
    }

    if (Object.keys(paramsObj).length !== 0 && experiment.previouslyLogged() === false) {
      experiment.logExposure({
        params: params,
        name: experiment.getName()
      });
    }

    this.setState({
      experimentParameters: paramsObj
    });
  },

  renderExperiment() {
    if (!this.state.experimentParameters) {
      return null;
    }

    const passThrough = this.props._passThrough;
    let renderedChildren;
    if (passThrough) {
      renderedChildren = React.cloneElement(
        React.Children.only(this.props.children),
        this.state.experimentParameters
      );
    } else {
      renderedChildren = this.props.children;
    }

    return renderedChildren;
  },

  render() {
    return this.renderExperiment();
  }
});

export default Parametrize;

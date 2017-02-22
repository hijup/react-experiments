import React from 'react';

const Parametrize = React.createClass({
  propTypes: {
    children: React.PropTypes.node.isRequired,
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
    const { experimentParameters } = this.state;
    if (!experimentParameters) {
      return null;
    }

    const { children, _passThrough: passThrough } = this.props;

    if (React.Children.count(children) > 1) {
      const renderedChildren = React.Children.map(children, (child) => {
        if (passThrough) {
          return React.cloneElement(child, experimentParameters);
        }
        return child;
      });
      return <div>{renderedChildren}</div>;
    } else if (passThrough) {
      return React.cloneElement(React.Children.only(children), experimentParameters);
    }
    return children;
  },

  render() {
    return this.renderExperiment();
  }
});

export default Parametrize;

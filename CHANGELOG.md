# Changes in 6.2.0
- Support React 16 too.
- Use React 16 for testing.

# Changes in 6.1.0
- Update dependencies (698b341).

# Changes in 6.0.0
Breaking changes:
- `<Parametrize>` that only have one children will be rendered without wrapper. This wrapper usually cause problem because it break HTML semantic and layout.

# Changes in 5.0.0
Breaking changes:
- Now React is peer dependency so React Experiments will use the same React with your app. There is good chance you will not need to do anything (hence no breaking change for you).
- Replacing parametrized experiment's child wrapper with `<div>` (formerly `<span>`).

# Changes in 4.1.0
- Now transpile using babel 6 instead of babel 4

# Changes in 3.0.1
- Removed the ```shouldEnroll``` prop. If you want to use conditional enrollment then you should register the experimental input to the experiment you care about and then conditionally unenroll users in your PlanOut experiment definition (see here for more information: https://github.com/HubSpot/PlanOut.js/pull/15)

# Changes in 3.0
- Renamed experimentClass -> Experiment

# Changes in 2.1
- Added the ```parametrize``` function that takes in experiment information and a component and parametrizes the component with the experiment parameters as props.
- Added the requirement to pass in an array of experiment parameters as props to the Parametrize component and removed the experimentName prop.

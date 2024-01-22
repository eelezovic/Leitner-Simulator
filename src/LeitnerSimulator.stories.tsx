import LeitnerSimulator, { LeitnerSimulatorProps } from './components/LeitnerSimulator';

export default {
  title: 'LeitnerSimulator',
  component: LeitnerSimulator,
  argTypes: {
    onEasyMultiplierChange: { action: 'easyMultiplierChanged' },
    onGoodMultiplierChange: { action: 'goodMultiplierChanged' },
    onHardMultiplierChange: { action: 'hardMultiplierChanged' },
    onAgainMultiplierChange: { action: 'againMultiplierChanged' },
    onMaxIntervalMultiplierChange: { action: 'maxIntervalMultiplierChanged' },
  },
};

const Template = (args: LeitnerSimulatorProps) => <LeitnerSimulator {...args} />;

export const DefaultMultipliers  = Template.bind({});
DefaultMultipliers.args = {
  easyLabel: 'Easy',
  goodLabel: 'Good',
  hardLabel: 'Hard',
  againLabel: 'Again',
};

export const CustomMultipliers = Template.bind({});
CustomMultipliers.args = {
  ...DefaultMultipliers.args,
  easyMultiplier: 3.0,
  goodMultiplier: 2.0,
  hardMultiplier: 1.5,
  againMultiplier: 0.8,
  maxInterval: 180,
};

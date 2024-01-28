

import SearchableTable, { CardType } from './SearchableTable';
import { Story } from '@storybook/react';


export default {
  title: 'Components/SearchableTable',
  component: SearchableTable,
};

const Template: Story = (args) => <SearchableTable {...args} />;

// example of some mock data for the stories..
const exampleData: CardType[] = [
    { id: 1, title: "Example 1", description: "Description 1", isNew: true },
    { id: 2, title: "Example 2", description: "Description 2", isNew: false },
    { id: 3, title: "Example 3", description: "Description 3", isNew: false },
    { id: 4, title: "Example 4", description: "Description 4", isNew: false },
    { id: 5, title: "Example 5", description: "Description 5 ", isNew: false  },
    { id: 6, title: "Example 6", description: "Description 6", isNew: false },
    { id: 7, title: "Example 7", description: "Description 7", isNew: false },
    { id: 8, title: "Example  8", description: "Description 8", isNew: false },
    { id: 9, title: "Example 9", description: " Description 9 ", isNew: false },
    { id: 10, title: "Example10", description: "Description 10", isNew: false },

  ];
  

export const DefaultTable = Template.bind({});
DefaultTable.args = {
  initialData: exampleData,
  initialQuery: '',
  initialItemsPerPage: 5,
};


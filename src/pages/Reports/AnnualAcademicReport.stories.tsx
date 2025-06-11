// FormOne.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import  { AnnualAcademicReport } from '../../pages/Reports/AnnualAcademicReport';

const meta: Meta<typeof AnnualAcademicReport> = {
  title: 'pages/Reports/AnnualAcademicReport', 
  component: AnnualAcademicReport,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
  
export const Default: Story = {
  args: {
   
  },
};
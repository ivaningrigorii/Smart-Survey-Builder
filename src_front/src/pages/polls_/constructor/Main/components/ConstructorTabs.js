// import * as React from 'react';
// import { styled } from '@mui/system';
// import TabsUnstyled from '@mui/base/TabsUnstyled';
// import TabsListUnstyled from '@mui/base/TabsListUnstyled';
// import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
// import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
// import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
// import Box from '@mui/material/Box';
// import CreateQuestions from "./CreateQuestions";
// export default function ConstructorTabs() {
//   return (
//     <Box sx={{
//         marginTop: 10, flexGrow: 1, width: '100%',
//         maxWidth: '100%'
//       }}>
//     <TabsUnstyled defaultValue={0}>
//       <TabsList>
//         <Tab value={0}>Опрос</Tab>
//         <Tab value={1}>Конструктор</Tab>
//         <Tab value={2}>Анализ</Tab>
//         <Tab value={3}>Настройки опроса</Tab>
//       </TabsList>
//       <TabPanel value={0}> <CreateQuestions/></TabPanel>
//       <TabPanel value={1}><CreateQuestions/></TabPanel>
//       <TabPanel value={2}>Анализ</TabPanel>
//       <TabPanel value={3}>Настройки опроса</TabPanel>
//     </TabsUnstyled>
//     </Box>
//   );
// }

// const blue = {
//   50: '#F0F7FF',
//   100: '#C2E0FF',
//   200: '#80BFFF',
//   300: '#66B2FF',
//   400: '#3399FF',
//   500: '#007FFF',
//   600: '#0072E5',
//   700: '#0059B2',
//   800: '#004C99',
//   900: '#003A75',
// };

// const grey = {
//   50: '#f6f8fa',
//   100: '#eaeef2',
//   200: '#d0d7de',
//   300: '#afb8c1',
//   400: '#8c959f',
//   500: '#6e7781',
//   600: '#57606a',
//   700: '#424a53',
//   800: '#32383f',
//   900: '#24292f',
// };

// const Tab = styled(TabUnstyled)`
//   font-family: IBM Plex Sans, sans-serif;
//   color: black;
//   cursor: pointer;
//   font-size: 0.875rem;
//   font-weight: 600;
//   background-color: transparent;
//   width: 100%;
//   padding: 10px 12px;
//   margin: 6px 6px;
//   border: none;
//   border-radius: 7px;
//   display: flex;
//   justify-content: center;

//   &:hover {
//     background-color: ${blue[400]};
//   }

//   &:focus {
//     color: #fff;
//     outline: 3px solid ${blue[200]};
//   }

//   &.${tabUnstyledClasses.selected} {
//     background-color: #fff;
//     color: ${blue[600]};
//   }

//   &.${buttonUnstyledClasses.disabled} {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }
// `;

// const TabPanel = styled(TabPanelUnstyled)(
//   ({ theme }) => `
//   width: 100%;
//   font-family: IBM Plex Sans, sans-serif;
//   font-size: 0.875rem;
//   padding: 20px 12px;
//   textColor: black;
//   background: white;
//   border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
//   color: black;
//   border-radius: 12px;
//   opacity: 0.6;
//   `,
// );

// const TabsList = styled(TabsListUnstyled)(
//   ({ theme }) => `
//   min-width: 400px;
//   background-color: secondary;
//   border-radius: 12px;
//   margin-bottom: 16px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   align-content: space-between;
//   box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
//   `,
// );

import * as React from 'react';
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import Box from '@mui/material/Box';
import CreateQuestions from "./CreateQuestions";
import CreateAnswers from './Answers/CreateAnswers';
export default function ConstructorTabs() {
  return (
    <Box sx={{
                marginTop: 10, flexGrow: 1, width: '100%',
                maxWidth: '100%'
              }}>
     <TabsUnstyled defaultValue={0}>
    <TabsList>
         <Tab value={0}>Вопрос</Tab>
        <Tab value={1}>Конструктор</Tab>
         <Tab value={2}>Анализ</Tab>
        <Tab value={3}>Настройки опроса</Tab>
      </TabsList>
      <TabPanel value={0}> <CreateQuestions/></TabPanel>
       <TabPanel value={1}><CreateAnswers/></TabPanel>
       <TabPanel value={2}>Анализ</TabPanel>
      <TabPanel value={3}>Настройки опроса</TabPanel>
     </TabsUnstyled>
    </Box>
  );

}

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: black;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: secondary;
  width: 100%;
  padding: 12px;
  margin: 6px 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  background-color: secondary;
  
`;

const TabsList = styled(TabsListUnstyled)(
  ({ theme }) => `
  min-width: 400px;
  background-color: primary;
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 8px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);
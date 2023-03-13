// import { Grid } from '@mui/material';
import Skills from './components/Skillsdata';
import Profile from './components/Profile';
import Grades from './components/Grades';
import Projects from './components/Projects';
import {createTheme} from '@mui/material/styles';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const theme = createTheme ({
  palette: {
    primary: {
      // light purple
      // main:"#1F1045", bg color
      main:"#956BFF",
    },
    secondary: {
      // yellowish
      main:"#F7E731",
    },
    tertiary: {
      // darker purple
      main:"#8050FA",
    },
  },
  typography: {
    fontFamily: [
      // body font
      'Dosis'
    ],
    h4: {
      fontWeight: 600,
      fontSize: 28,
      lineHeight: '2rem',
    },
    h5: {
      fontWeight: 100,
      lineHeight: '2rem',
    },
  },
})

const client = new QueryClient();
const endpoint = "https://learn.01founders.co/api/graphql-engine/v1/graphql";

function App() {
  return (
    <QueryClientProvider client={client}>
      <Profile endpoint={endpoint}/>
      <Projects endpoint={endpoint}/>
      <Skills endpoint={endpoint}/>
      <Grades endpoint={endpoint}/>
    </QueryClientProvider>

  );
}

export default App;
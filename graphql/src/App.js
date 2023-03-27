// import { Grid } from '@mui/material';
import Skills from './components/Skillsdata';
import Profile from './components/Profile';
import Grades from './components/Grades';
import Projects from './components/Projects';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();
const endpoint = "https://learn.01founders.co/api/graphql-engine/v1/graphql";

function App() {
  return (
    <QueryClientProvider client={client}>
      <Profile endpoint={endpoint}/>
      <div id='graphBlock'>
        <Projects endpoint={endpoint}/>
        <Skills endpoint={endpoint}/>
      </div>
      <Grades endpoint={endpoint}/>
    </QueryClientProvider>
  );
}

export default App;
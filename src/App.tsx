import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar/NavBar';
import { Container, Typography } from '@mui/material';
import MutateQuotes from './containers/MutateQuotes/MutateQuotes';
import Quotes from './containers/Quotes/Quotes';

function App() {


  return (
    <>
      <header>
        <NavBar />
      </header>
      <Container component="main">
        <Routes>
          <Route path="/" element={<Quotes />} />
          <Route path="/quotes/:id/edit" element={<MutateQuotes />} />
          <Route path="/new-quote" element={<MutateQuotes />} />
          <Route
            path="*"
            element={<Typography variant="h2">Not found</Typography>}
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;

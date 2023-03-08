import Header from './components/Header';
import Footer from './components/Footer';
import FindingFalcone from './components/FindingFalcone';
import { SnackbarProvider } from 'notistack';
import  {BrowserRouter as Router}  from 'react-router-dom';
import { Route } from 'react-router-dom';
import {Switch} from "react-router-dom"
import Result from './components/Result';
import AppState from './components/AppContext';
import { ThemeProvider } from "@mui/material/styles";
import theme from './components/Theme';


function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <AppState>
          <SnackbarProvider maxSnack={3}>
            <Router>
              <Switch>
                <Route exact path="/"  >
                    <Header />
                    <FindingFalcone />
                    <Footer />
                </Route>
                <Route path="/find">  
                    <Header />
                    <Result />
                    <Footer />
                </Route>
              </Switch>
            </Router>
          </SnackbarProvider>
        </AppState>            
      </ThemeProvider>
    </>
  );
}

export default App;

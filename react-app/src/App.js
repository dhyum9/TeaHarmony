import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import TeaIndex from "./components/TeaIndex";
import TeaDetails from "./components/TeaDetails";
import HomePage from "./components/HomePage";
import CreateTeaForm from "./components/CreateTeaForm";
import TeaLog from "./components/Tealog";
import EditTeaForm from "./components/EditTeaForm";
import TastingNotesLog from "./components/TastingNotesLog";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <HomePage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/tealog">
            <TeaLog />
          </Route>
          <Route exact path="/tastingnotes">
            <TastingNotesLog />
          </Route>
          <Route exact path="/teas">
            <TeaIndex />
          </Route>
          <Route exact path="/teas/new">
            <CreateTeaForm />
          </Route>
          <Route path="/teas/:teaId/edit">
            <EditTeaForm />
          </Route>
          <Route exact path="/teas/:teaId">
            <TeaDetails />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

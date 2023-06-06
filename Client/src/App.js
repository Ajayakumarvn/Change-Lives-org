import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// import MenuList from "./components/MenuList";
import { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Registration";
import Donorform from "./pages/Donor-form";
import Contact from "./pages/SignIn";
import DonorDetails from "./pages/Donor-Details";
import VolunteerList from "./pages/VolunteerList";
import OrganiserList from "./pages/OrganiserList";
import ParticipatedEvents from "./pages/ParticipatedEvents";
import TransactionList from "./pages/TransactionList";
import DonorList from "./pages/DonorList";
import Events from "./pages/Events";
import AddEvent from "./pages/AddEvent";
import EditEvents from "./pages/EditEvents";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import MyEvents from "./pages/MyEvents";

function App(id) {
  return (
    <Fragment>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/donate" element={<Donorform />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donor-details" element={<DonorDetails />} />
        <Route path="/volunteer-list" element={<VolunteerList />} />
        <Route path="/organizer-list" element={<OrganiserList />} />
        <Route path="/transactions" element={<TransactionList />} />
        <Route path="/donor-list" element={<DonorList />} />
        <Route path="/events" element={<Events />} />
        <Route path="/addevents" element={<AddEvent />} />
        <Route path="/participatedevents" element={<ParticipatedEvents />} />
        <Route path="/myevents" element={<MyEvents />} />
        <Route path="/editevent/:id" element={<EditEvents />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Fragment>
  );
}

export default App;

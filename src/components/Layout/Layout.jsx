import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PrivateRoute from "../auth/PrivateRoute";
import Register from "../auth/Register";
import Login from "../auth/Login";
import MyProfile from "../myProfile/MyProfile";
import Chat from "../Chat/Chat";
import ResetPassword from "../auth/ResetPassword/ResetPassword";
import NewPassword from "../auth/ResetPassword/NewPassword";
import UserProfile from "../userProfile/UserProfile";
import Challenges from "../Challenges/Challenges";
import AddChallenge from "../AddChallenge/AddChallenge";
import Groups from "../Groups/Groups";
import AddGroup from "../AddGroup/AddGroup";
import Explore from "../Explore/Explore";
import Admin from "../Admin/Admin";
import ApplyExpert from "../ApplyExpert/ApplyExpert";
import EditChallenge from "../EditChallenge/EditChallenge";
import CreateUser from "../Admin/ManageUsers/CreateUser";

import { getUserNotifications } from "../../features/user/userSlice";

const Layout = () => {
  const dispatch = useDispatch();

  let SECONDS_MS = 4000;

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getUserNotifications());
    }, SECONDS_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/new-password/:passwordResetString" element={<NewPassword />} />

        <Route element={<PrivateRoute allowedRoles={["user", "admin", "expert"]} />}>
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/add-group" element={<AddGroup />} />
          <Route path="/apply-expert" element={<ApplyExpert />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["expert", "admin"]} />}>
          <Route path="/add-challenge" element={<AddChallenge />} />
          <Route path="/challenges/:challengeId/edit" element={<EditChallenge />} />
        </Route>
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/create-user" element={<CreateUser />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Layout;

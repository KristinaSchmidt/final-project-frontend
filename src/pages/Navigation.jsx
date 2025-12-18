import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../shared/components/PrivateRoute/PrivateRoute.jsx";
import PublicRoute from "../shared/components/PublicRoute/PublicRoute.jsx";
import MainLayout from "../shared/components/MainLayout/MainLayout.jsx";
import HomePage from "./HomePage/HomePage.jsx";
import LoginPage from "./LoginPage/LoginPage.jsx";
import SignUpPage from "./SignUpPage/SignUpPage.jsx";
import NotFoundPage from "./NotFoundPage/NotFoundPage.jsx";
import ResetPasswordPage from "./ResetPasswordPage/ResetPasswordPage.jsx";
import CookiesPolicyPage from "./CookiesPolicyPage/CookiesPolicyPage.jsx";
import LearnMorePage from "./LearnMorePage/LearnMorePage.jsx";
import PrivacyPolicyPage from "./PrivacyPolicyPage/PrivacyPolicyPage.jsx";
import TermsPage from "./TermsPage/TermsPage.jsx";
import SearchPage from "./SearchPage/SearchPage.jsx";
import NotificationsPage from "./NotificationPage/NotificationPage.jsx";
import ExplorePage from "./ExplorePage/ExplorePage.jsx";
import ProfilePage from "./ProfilePage/ProfilePage.jsx";
import EditProfilePage from "./EditProfilePage/EditProfilePage.jsx";
import CreatePage from "./CreatePage/CreatePage.jsx";
import UserProfilePage from "./UserProfilePage/UserProfilePage.jsx";
// import MessagesPage from "./MessagesPage/MessagesPage.jsx";



const Navigation = () => {
  return (
    <Routes>

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
      </Route>


      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          {/* <Route path="/messages" element={<MessagesPage />} /> */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/user/:id" element={<UserProfilePage />} />
        </Route>
      </Route>


      <Route path="/reset" element={<ResetPasswordPage />} />
      <Route path="/cookies" element={<CookiesPolicyPage />} />
      <Route path="/learnmore" element={<LearnMorePage />} />
      <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Navigation;
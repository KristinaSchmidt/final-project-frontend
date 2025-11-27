import { Routes, Route} from "react-router-dom";
import HomePage from "./HomePage/HomePage.jsx";
import LoginPage from "./LoginPage/LoginPage.jsx";
import SignUpPage from "./SignUpPage/SignUpPage.jsx";
import NotFoundPage from "./NotFoundPage/NotFoundPage.jsx";
import ResetPasswordPage from "./ResetPasswordPage/ResetPasswordPage.jsx";
import CookiesPolicyPage from "./CookiesPolicyPage/CookiesPolicyPage.jsx";
import LearnMorePage from "./LearnMorePage/LearnMorePage.jsx";
import PrivacyPolicyPage from "./PrivacyPolicyPage/PrivacyPolicyPage.jsx";
import TermsPage from "./TermsPage/TermsPage.jsx";



const Navigation = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/reset" element={<ResetPasswordPage />} />
            <Route path="/cookies" element={<CookiesPolicyPage />} />
            <Route path="/learnmore" element={<LearnMorePage />} />
            <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage/>} />
        </Routes>
    )
}

export default Navigation;
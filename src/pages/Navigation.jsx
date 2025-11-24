import { Routes, Route} from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import LoginPage from "./LoginPage/LoginPage";
import SignUpPage from "./SignUpPage/SignUpPage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import ResetPasswordPage from "./ResetPasswordPage/ResetPasswordPage";
import CookiesPolicyPage from "./CookiesPolicyPage/CookiesPolicyPage";
import LearnMorePage from "./LearnMorePage/LearnMorePage";
import PrivacyPolicyPage from "./PrivacyPolicyPage/PrivacyPolicyPage";
import TermsPage from "./TermsPage/TermsPage";



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
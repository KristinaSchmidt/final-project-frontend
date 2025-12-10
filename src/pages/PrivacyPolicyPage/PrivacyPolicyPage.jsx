import styles from "../TermsPage/TermsPage.module.css";

function PrivacyPolicyPage() {
    return (
    <main className={styles.page}>
      <h1 className={styles.title}>Privacy Policy</h1>
      <p className={styles.updated}>Last updated: [Date]</p>

      <p>
        Welcome to ICHGRAM (“we”, “us”, “our”). These Terms of Service (“Terms”)
        govern your use of our website, mobile site, and any related services
        (collectively, the “Service”).
      </p>

      <p>
        By creating an account or using ICHGRAM, you agree to these Terms. If
        you do not agree, please do not use the Service.
      </p>

      <h2>1. Eligibility</h2>
      <p>
        You must be at least 13 years old to use ICHGRAM. By using the Service,
        you confirm that you have the legal capacity to enter into this
        agreement in your country of residence.
      </p>
    </main>
  );
};
export default PrivacyPolicyPage;
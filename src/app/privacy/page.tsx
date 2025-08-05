
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Learn how Returnprofit.online collects, uses, and protects your data. We are committed to transparency and your privacy.',
  }

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container max-w-4xl py-24 sm:py-32">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Welcome to Returnprofit.online. We are committed to protecting your privacy and handling your data in an open and transparent manner. This privacy policy explains how we collect, use, and share information about you when you use our website, tools, and services (collectively, our "Services").
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              We collect information in the following ways:
            </p>
            <ul>
              <li><strong>Information you provide to us:</strong> This includes data you enter when using our calculators (like ad spend, COGS, etc.), information you provide when you contact us for support, or when you subscribe to our newsletter (such as your name and email address).</li>
              <li><strong>Information we collect automatically:</strong> When you use our Services, we may collect standard log information, including your IP address, browser type, operating system, and pages visited. We use this information to improve our Services and ensure they are functioning correctly. We do not use this data for tracking individuals.</li>
              <li><strong>Cookies and Similar Technologies:</strong> We use cookies to operate and administer our website, and to improve your experience. A "cookie" is a piece of information sent to your browser by a website you visit. You can control cookies through your browser settings.</li>
            </ul>

            <h2>2. How We Use Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Provide, maintain, and improve our Services.</li>
              <li>Perform calculations and generate analysis as requested by you through our tools.</li>
              <li>Communicate with you, including responding to your comments, questions, and requests.</li>
              <li>Send you technical notices, updates, and administrative messages.</li>
              <li>If you opt-in, send you our newsletter and other marketing communications.</li>
            </ul>
             <p>
                <strong>We do not, and will never, sell your personal information or the business data you enter into our tools to third parties.</strong>
            </p>

            <h2>3. How We Share Information</h2>
            <p>
              We do not share your personal information with companies, organizations, or individuals outside of Returnprofit.online except in the following cases:
            </p>
            <ul>
                <li><strong>With your consent:</strong> We will share personal information with third parties when we have your explicit consent to do so.</li>
                <li><strong>For external processing:</strong> We provide personal information to our affiliates or other trusted businesses or persons to process it for us, based on our instructions and in compliance with our Privacy Policy and any other appropriate confidentiality and security measures. For example, we use service providers to help us with email delivery.</li>
                <li><strong>For legal reasons:</strong> We will share personal information if we have a good-faith belief that access, use, preservation, or disclosure of the information is reasonably necessary to meet any applicable law, regulation, legal process, or enforceable governmental request.</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We work hard to protect our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold. We use industry-standard encryption to protect your data in transit and at rest.
            </p>
            
            <h2>5. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. If you have subscribed to our newsletter, you can opt-out at any time by clicking the "unsubscribe" link in the footer of the email. For any other requests, please contact us at info@returnprofit.online.
            </p>
            
            <h2>6. Changes to This Policy</h2>
            <p>
              We may change this Privacy Policy from time to time. We will post any privacy policy changes on this page and, if the changes are significant, we will provide a more prominent notice.
            </p>
            
            <h2>7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:info@returnprofit.online">info@returnprofit.online</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

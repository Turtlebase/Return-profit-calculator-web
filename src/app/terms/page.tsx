import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Use | Returnprofit.online',
    description: 'Read the Terms of Use for using the tools and services offered by Returnprofit.online.',
    alternates: {
      canonical: '/terms',
    },
    robots: {
      index: false,
      follow: true,
    }
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container max-w-4xl py-24 sm:py-32">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Terms of Use
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              By accessing and using Returnprofit.online (the "Website"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this Website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>

            <h2>1. Description of Service</h2>
            <p>
              Returnprofit.online provides a collection of free-to-use calculators and tools designed for e-commerce and direct-to-consumer (D2C) businesses. These tools are provided for informational purposes only and should not be considered financial advice.
            </p>
            
            <h2>2. Accuracy of Information</h2>
            <p>
              The calculations and analyses provided by our tools are based on the data you provide. While we strive for accuracy, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information or calculations on the Website. Your use of the tools and your reliance on any information is solely at your own risk.
            </p>
            
            <h2>3. Intellectual Property</h2>
            <p>
                The Website and its original content, features, and functionality are owned by Returnprofit.online and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>

            <h2>4. User Conduct</h2>
            <p>
              You agree to use the Website only for lawful purposes. You are prohibited from any use of the Website that would constitute an illegal offense, give rise to liability, or otherwise violate any applicable local, state, national, or international law or regulation.
            </p>

            <h2>5. Disclaimer of Warranty</h2>
            <p>
                The services and information on this Website are provided "as is" without warranty of any kind, either express or implied, including but not limited to, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
                In no event shall Returnprofit.online be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to, damages for loss of profits, data, or other intangible losses, resulting from the use or the inability to use the service.
            </p>
            
            <h2>7. Changes to This Agreement</h2>
            <p>
              We reserve the right to modify these Terms of Use at any time. We do so by posting and drawing attention to the updated terms on the Website. Your decision to continue to visit and make use of the Website after such changes have been made constitutes your formal acceptance of the new Terms of Use.
            </p>
            
            <h2>8. Contact Us</h2>
            <p>
              If you have any questions about this agreement, please feel free to contact us at <a href="mailto:info@returnprofit.online">info@returnprofit.online</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

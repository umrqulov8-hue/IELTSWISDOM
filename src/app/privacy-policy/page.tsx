import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
                <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Link>

                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 dark:border-slate-800">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8">
                        Legal Information
                        <span className="text-slate-500 dark:text-slate-400 font-normal block text-xl mt-3">Terms of Use, Privacy Policy, and Copyright Notice</span>
                    </h1>

                    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-8">
                        <p className="text-lg leading-relaxed">
                            Welcome to our website. By accessing and using this platform, you agree to the terms and policies described below. Please read this information carefully.
                        </p>

                        <section className="space-y-3">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">1. Purpose of the Website</h2>
                            <p>This website is created to help students improve their English skills and prepare for the IELTS examination. The platform provides practice materials, exercises, and learning resources intended solely for educational and informational purposes.</p>
                            <p>Our goal is to make learning more accessible by organizing useful materials in one convenient place for students who want to practice and improve their IELTS performance.</p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">2. Educational Use Disclaimer</h2>
                            <p>The materials available on this website are provided strictly for educational and practice purposes. Some resources may be compiled from publicly available sources across the internet and are shared to support learning and exam preparation.</p>
                            <p>We do not claim ownership of all materials unless explicitly stated. All copyrights and intellectual property rights belong to their respective owners.</p>
                            <p>If you are the copyright owner of any content displayed on this website and believe that your material has been used inappropriately, please contact us. We will review the request and, if necessary, remove the content promptly.</p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">3. User Responsibility</h2>
                            <p>Users agree to use this website responsibly and only for lawful purposes. Any attempt to misuse the platform, distribute harmful content, interfere with the functionality of the website, or exploit the system is strictly prohibited.</p>
                            <p>We reserve the right to restrict or terminate access to users who violate these rules.</p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">4. Privacy Policy</h2>
                            <p>We respect the privacy of our users. Any personal information collected through this website, such as during registration or account creation, is used solely to improve the user experience and provide access to the platform's services.</p>
                            <p>We do not sell, trade, or share users' personal information with third parties unless required by law or necessary to operate essential website services.</p>
                            <p>Basic data such as login information, usage statistics, and system logs may be collected to maintain security, improve performance, and enhance the overall functionality of the platform.</p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">5. Third-Party Services</h2>
                            <p>This website may use third-party tools, services, or APIs to provide additional functionality, such as speech recognition, artificial intelligence analysis, or hosting services. These services may process limited data as required to perform their functions.</p>
                            <p>By using this website, you acknowledge that such services may be involved in delivering certain features.</p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">6. Limitation of Liability</h2>
                            <p>While we aim to provide accurate and helpful educational materials, we cannot guarantee that all information on the website is completely error-free or perfectly aligned with official IELTS examination standards.</p>
                            <p>Users should treat the resources as supplementary learning materials and not as official IELTS content.</p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">7. Changes to This Policy</h2>
                            <p>We may update or modify these terms and policies at any time to improve the website or comply with legal requirements. Continued use of the website after changes are made indicates acceptance of the updated policies.</p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">8. Contact</h2>
                            <p>If you have any questions, concerns, or copyright requests regarding the materials on this website, please contact us through the website's contact page.</p>
                            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-sm font-medium">
                                <p>Thank you for using our platform and being part of the learning community.</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

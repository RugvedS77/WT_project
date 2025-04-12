import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

// Social platform logos (replace with actual image paths)
const platformLogos = {
  instagram: '/logos/instagram.png',
  facebook: '/logos/facebook.png',
  youtube: '/logos/youtube.png',
  twitter: '/logos/twitter.png',
  linkedin: '/logos/linkedin.png',
  tiktok: '/logos/tiktok.png',
  pinterest: '/logos/pinterest.png',
  whatsapp: '/logos/whatsapp.png',
  snapchat: '/logos/snapchat.png'
};

// Replace with your actual hero image path
const heroImage = '/images/social-media-dashboard.png';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <i className="fas fa-calendar-alt text-2xl text-blue-600"></i>
          <span className="text-xl font-bold text-gray-800">Social Scheduler</span>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/social-scheduler/login" className="text-gray-700 hover:text-blue-600">Login</Link>
          <Link 
            to="/social-scheduler/register" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section with Image */}
      <section className="container mx-auto px-6 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Unify Your <span className="text-blue-600">Social Presence</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              Schedule, publish, and analyze content across all major platforms from one powerful dashboard
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/social-scheduler/register" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors text-center"
              >
                Start Free Trial
              </Link>
              <div className="bg-white px-8 py-3 rounded-lg text-lg font-medium shadow-sm flex items-center justify-center">
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    // Handle Google auth
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                  text="signup_with"
                  shape="pill"
                />
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src={heroImage} 
              alt="Social media dashboard" 
              className="rounded-xl shadow-xl w-full max-w-2xl mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Platform Logos Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl text-center text-gray-600 mb-8">
            Trusted by brands on all major platforms
          </h2>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {Object.entries(platformLogos).map(([platform, logo]) => (
              <div key={platform} className="p-3 hover:scale-110 transition-transform">
                <img 
                  src={logo} 
                  alt={platform} 
                  className="h-10 w-10 object-contain opacity-70 hover:opacity-100" 
                  title={platform.charAt(0).toUpperCase() + platform.slice(1)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alternating Feature Sections */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row items-center mb-20">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <i className="fas fa-clock text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">10x Efficiency</h3>
              <p className="text-gray-600">
                Reduce social media management time from hours to minutes with our bulk scheduling and automation tools.
                Focus on creating great content while we handle the publishing.
              </p>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <img 
                  src="/images/efficiency-dashboard.png" 
                  alt="Efficiency dashboard" 
                  className="rounded-lg w-full"
                />
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row items-center mb-20">
            <div className="md:w-1/2 mb-10 md:mb-0 md:order-last md:pl-10">
              <div className="bg-purple-100 text-purple-600 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <i className="fas fa-chart-pie text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Data-Driven Results</h3>
              <p className="text-gray-600">
                Our AI analyzes your performance to recommend optimal posting times and content strategies.
                Get actionable insights to grow your audience and engagement.
              </p>
            </div>
            <div className="md:w-1/2 md:pr-10">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <img 
                  src="/images/analytics-dashboard.png" 
                  alt="Analytics dashboard" 
                  className="rounded-lg w-full"
                />
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <i className="fas fa-users text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Team Collaboration</h3>
              <p className="text-gray-600">
                Role-based access, approval workflows, and shared content calendars for seamless teamwork.
                Manage your entire social team from one dashboard.
              </p>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <img 
                  src="/images/team-collab.png" 
                  alt="Team collaboration" 
                  className="rounded-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Trusted by 10,000+ Social Media Professionals
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Join the community of marketers who transformed their social strategy
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Cut our social media workload by 70% while doubling engagement. Game changer!",
                author: "Sarah K.",
                role: "Digital Marketing Director",
                avatar: "/avatars/avatar1.jpg"
              },
              {
                quote: "The cross-platform scheduling alone is worth 10x the price. Incredible value.",
                author: "Michael T.",
                role: "Content Manager",
                avatar: "/avatars/avatar2.jpg"
              },
              {
                quote: "Finally a tool that understands the unique needs of social media teams.",
                author: "Priya M.",
                role: "Social Media Lead",
                avatar: "/avatars/avatar3.jpg"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="text-yellow-400 text-2xl mb-4">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 text-lg">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="rounded-full w-12 h-12 overflow-hidden mr-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA with Different Background */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Social Strategy?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Join the most powerful all-in-one social media management platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/social-scheduler/register" 
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Start Your Free 14-Day Trial
            </Link>
            <Link 
              to="/social-scheduler/demo" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-white hover:text-indigo-600 transition-colors"
            >
              Request Demo
            </Link>
          </div>
          <p className="mt-6 text-indigo-100">
            No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <i className="fas fa-calendar-alt text-2xl text-blue-400"></i>
                <span className="text-xl font-bold">Social Scheduler</span>
              </div>
              <p className="text-gray-400">The complete social media command center for modern teams</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Platforms</h4>
              <ul className="space-y-2 text-gray-400">
                {Object.keys(platformLogos).map(platform => (
                  <li key={platform}>
                    <a href="#" className="hover:text-white transition-colors">
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            &copy; {new Date().getFullYear()} Social Scheduler. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
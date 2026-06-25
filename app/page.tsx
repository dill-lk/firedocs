'use client';

import { useEffect, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await getSupabaseClient().auth.getUser();
    if (user) {
      router.push('/dashboard');
    } else {
      setUser(null);
    }
  };

  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-surface-base">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-primary-text mb-6">
              Generate Developer Docs
              <span className="text-primary-accent"> in Seconds</span>
            </h1>
            <p className="text-xl text-primary-secondary max-w-2xl mx-auto mb-8">
              AI-powered documentation workspace. Type a prompt or paste code, and instantly generate API docs, architecture diagrams, README files, and technical specs.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleGetStarted}
                className="bg-primary-accent text-surface-base px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity duration-fast"
              >
                Get Started Free
              </button>
              <button
                onClick={() => {
                  const featuresSection = document.getElementById('features');
                  featuresSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-surface-raised text-primary-text px-8 py-3 rounded-lg font-medium hover:bg-surface-muted transition-colors duration-fast"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-surface-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary-text mb-4">
              Everything You Need to Document Your Code
            </h2>
            <p className="text-primary-secondary max-w-2xl mx-auto">
              Powerful AI tools designed specifically for developers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-surface-base border border-border-default rounded-lg p-6">
              <div className="w-12 h-12 bg-surface-raised rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-primary-text mb-2">
                AI-Powered Generation
              </h3>
              <p className="text-primary-secondary">
                Generate API docs, README files, technical specs, and more with simple slash commands.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-surface-base border border-border-default rounded-lg p-6">
              <div className="w-12 h-12 bg-surface-raised rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-primary-text mb-2">
                Architecture Diagrams
              </h3>
              <p className="text-primary-secondary">
                Create beautiful Mermaid diagrams with AI - flowcharts, sequence diagrams, ERDs, and more.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-surface-base border border-border-default rounded-lg p-6">
              <div className="w-12 h-12 bg-surface-raised rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-primary-text mb-2">
                Multiple AI Providers
              </h3>
              <p className="text-primary-secondary">
                Choose from Groq, OpenAI, Gemini, Hugging Face, and more with generous free tiers.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-surface-base border border-border-default rounded-lg p-6">
              <div className="w-12 h-12 bg-surface-raised rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-primary-text mb-2">
                Organized Workspaces
              </h3>
              <p className="text-primary-secondary">
                Keep your documentation organized with workspaces, folders, and version history.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-surface-base border border-border-default rounded-lg p-6">
              <div className="w-12 h-12 bg-surface-raised rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-primary-text mb-2">
                Private & Secure
              </h3>
              <p className="text-primary-secondary">
                Your docs are private by default. Share publicly when you're ready with custom URLs.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-surface-base border border-border-default rounded-lg p-6">
              <div className="w-12 h-12 bg-surface-raised rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-primary-text mb-2">
                Auto-Save
              </h3>
              <p className="text-primary-secondary">
                Never lose your work with automatic saving every 30 seconds and full version history.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Commands Section */}
      <div className="py-24 bg-surface-base">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary-text mb-4">
              Simple Slash Commands
            </h2>
            <p className="text-primary-secondary max-w-2xl mx-auto">
              Just type a command and let AI do the rest
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-surface-muted border border-border-default rounded-lg p-6">
              <code className="text-primary-accent font-code text-lg">/api-doc</code>
              <p className="text-primary-secondary mt-2">Generate complete API reference documentation</p>
            </div>
            <div className="bg-surface-muted border border-border-default rounded-lg p-6">
              <code className="text-primary-accent font-code text-lg">/diagram</code>
              <p className="text-primary-secondary mt-2">Create Mermaid architecture diagrams</p>
            </div>
            <div className="bg-surface-muted border border-border-default rounded-lg p-6">
              <code className="text-primary-accent font-code text-lg">/readme</code>
              <p className="text-primary-secondary mt-2">Generate comprehensive README.md files</p>
            </div>
            <div className="bg-surface-muted border border-border-default rounded-lg p-6">
              <code className="text-primary-accent font-code text-lg">/spec</code>
              <p className="text-primary-secondary mt-2">Create detailed technical specifications</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-surface-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary-text mb-4">
            Ready to Document Faster?
          </h2>
          <p className="text-primary-secondary mb-8 text-lg">
            Start generating professional documentation in seconds with our generous free tier.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-primary-accent text-surface-base px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity duration-fast"
          >
            Get Started Free
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="py-12 bg-surface-base border-t border-border-default">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="font-heading text-xl font-bold text-primary-text">Firedocs</h3>
              <p className="text-primary-secondary text-sm">AI-Powered Developer Documentation</p>
            </div>
            <div className="text-primary-secondary text-sm">
              © 2024 Firedocs. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">TaskMaster</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Organize your work, boost your productivity, and achieve more with our
              intuitive task management platform.
            </p>
          </div>

          {/* Features */}
          {/* <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Smart Task Organization
              </h3>
              <p className="text-gray-600">
                Categorize tasks by status and priority for maximum efficiency
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Secure & Private
              </h3>
              <p className="text-gray-600">
                Your data is protected with industry-standard encryption
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Built with Next.js for optimal performance and user experience
              </p>
            </div>
          </div> */}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/signup"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg shadow-purple-500/30 hover:shadow-xl transform hover:-translate-y-0.5 w-full sm:w-auto"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-colors border-2 border-purple-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all w-full sm:w-auto"
            >
              Sign In
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-16 p-8 bg-white rounded-2xl shadow-lg border border-purple-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Why Choose TaskMaster?
            </h2>
            <div className="text-left max-w-2xl mx-auto space-y-4 text-gray-600">
              <p>
                ✨ <strong className="text-gray-800">Intuitive Interface:</strong> Simple, clean design that gets out of your way
              </p>
              <p>
                🔍 <strong className="text-gray-800">Powerful Search:</strong> Find tasks instantly with advanced filtering
              </p>
              <p>
                📱 <strong className="text-gray-800">Responsive Design:</strong> Works seamlessly on all devices
              </p>
              <p>
                🚀 <strong className="text-gray-800">Real-time Updates:</strong> See changes instantly across your workflow
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

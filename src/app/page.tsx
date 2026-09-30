import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Caspian Host</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Premium hosting solutions for your projects. Join our team and help us deliver exceptional service.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link
            href="/staff-application"
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow group"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Join Our Team</h2>
            <p className="text-gray-600">Apply to become part of the Caspian Host staff team</p>
          </Link>

          <Link
            href="/admin/login"
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow group"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Portal</h2>
            <p className="text-gray-600">Access the staff application management dashboard</p>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Join Caspian Host?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div>
              <div className="text-4xl mb-2">🚀</div>
              <h4 className="font-semibold text-gray-900 mb-1">Fast Growth</h4>
              <p className="text-gray-600 text-sm">Work with a rapidly growing hosting company</p>
            </div>
            <div>
              <div className="text-4xl mb-2">💡</div>
              <h4 className="font-semibold text-gray-900 mb-1">Innovation</h4>
              <p className="text-gray-600 text-sm">Be part of cutting-edge hosting solutions</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🤝</div>
              <h4 className="font-semibold text-gray-900 mb-1">Community</h4>
              <p className="text-gray-600 text-sm">Join a supportive and collaborative team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

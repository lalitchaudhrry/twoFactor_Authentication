export default function AuthLayout({ children }) {
    return (
      <div className="min-h-screen flex">
        {/* Left Section */}
        <div className="hidden lg:flex w-1/2 bg-text-primary text-surface-base flex-col justify-center px-16">
          <h1 className="text-4xl font-bold mb-4">
            Secure Access Control
          </h1>
          <p className="text-text-secondary text-lg">
            OTP-based Two-Factor Authentication using Authenticator.
          </p>
        </div>
  
        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-surface-base">
          {children}
        </div>
      </div>
    );
  }
  
export default function GoogleButton() {
    return (
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 border border-border-subtle py-2 rounded-lg hover:bg-surface-base"
        onClick={() => {
          // Later: redirect to backend Google OAuth endpoint
          console.log("Google login clicked");
        }}
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />
        <span className="text-text-primary font-medium">
          Continue with Google
        </span>
      </button>
    );
  }
  
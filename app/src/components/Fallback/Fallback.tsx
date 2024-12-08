// components/Fallback.tsx
const Fallback = ({ error }: { error: Error }) => {
    return (
      <div className="error-boundary">
        <h1>Oops! Something went wrong.</h1>
        <p>{error.message}</p>
      </div>
    );
  };
  
  export { Fallback };
  
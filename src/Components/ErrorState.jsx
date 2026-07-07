function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state">
      <p>⚠️ {message}</p>
      <button onClick={onRetry} className="retry-button">
        Retry
      </button>
    </div>
  );
}
export default ErrorState;
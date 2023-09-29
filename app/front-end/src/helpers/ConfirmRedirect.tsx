import '../styles/helpers/confirmRedirect.css';

interface ConfirmRedirectProps {
  message: string;
  redirectUrl: string;
}

function ConfirmRedirect({ message, redirectUrl }: ConfirmRedirectProps) {
  const handleConfirm = () => {
    window.location.replace(redirectUrl);
  };

  return (
    <div className="confirmation-message">
      <div className="confirmation-content">
        <p>{message}</p>
        <button onClick={handleConfirm} className="btn-visu btn_edit">Ok</button>
      </div>
    </div>
  );
}

export default ConfirmRedirect;






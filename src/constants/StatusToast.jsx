export default function Toast({ type = "success", message }) {
    return (
        <div className="toast-container">
            <div className={`toast ${type}`}>
                {message}
            </div>
        </div>
    );
}

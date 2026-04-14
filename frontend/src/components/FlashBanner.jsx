export function FlashBanner({ flash, onDismiss }) {
  return (
    <div className={`flash flash--${flash.type}`}>
      <div className="flash__copy">
        <p className="eyebrow">System message</p>
        <strong>{flash.title}</strong>
        <p>{flash.message}</p>
      </div>

      <button className="ghost-button" onClick={onDismiss} type="button">
        Dismiss
      </button>
    </div>
  );
}

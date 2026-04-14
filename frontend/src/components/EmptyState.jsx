export function EmptyState({ title, message }) {
  return (
    <div className="empty-state">
      <div className="empty-state__mark" />
      <p className="eyebrow">Nothing here yet</p>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}

type TeamIdentityProps = {
  teamName?: string;
  ownerName?: string;
  fallback?: string;
};

export function TeamIdentity({
  teamName,
  ownerName,
  fallback = "Not listed",
}: TeamIdentityProps) {
  return (
    <span className="team-identity">
      <strong>{teamName ?? fallback}</strong>
      {ownerName ? <small>{ownerName}</small> : null}
    </span>
  );
}

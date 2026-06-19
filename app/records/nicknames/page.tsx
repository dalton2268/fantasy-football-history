import { NicknameExplorer } from "@/components/nickname-explorer";
import { getNicknameArchive } from "@/lib/sleeper";

export default async function NicknamesPage() {
  const owners = await getNicknameArchive();

  return (
    <main className="page-shell">
      <section className="page-heading">
        <p className="eyebrow">Records</p>
        <h1>Player Nicknames</h1>
        <p className="intro-copy">
          Pick an owner to see every saved player nickname Sleeper has for that
          roster, grouped by season.
        </p>
      </section>

      <NicknameExplorer owners={owners} />
    </main>
  );
}

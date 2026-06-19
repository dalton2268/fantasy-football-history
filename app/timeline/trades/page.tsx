import { TradeExplorer } from "@/components/trade-explorer";
import { getTradeArchive } from "@/lib/sleeper";

export default async function TradesPage() {
  const trades = await getTradeArchive();

  return (
    <main className="page-shell">
      <section className="page-heading">
        <p className="eyebrow">League timeline</p>
        <h1>Trade Tracker</h1>
        <p className="intro-copy">
          Every completed Sleeper trade we can find across linked seasons, with
          the managers, players, picks, week, and date.
        </p>
      </section>

      <TradeExplorer trades={trades} />
    </main>
  );
}

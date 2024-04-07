import RankedList from "@/components/RankedList";
import TypesChart from "@/components/TypesChart";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="hero">
        <div className="hero-bg">
          <h1>Join the Pokémon Showdown</h1>
          <Link className="button-30" href={"/battle/all"}>
            Vote Now!
          </Link>
        </div>
      </div>
      <div className="global-stats">
        <RankedList limit={10} />
        <TypesChart />
      </div>
    </div>
  );
}

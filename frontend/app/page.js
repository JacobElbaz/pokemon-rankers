import RankedList from "@/components/RankedList";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="hero">
        <div className="hero-bg">
          <h1>Join the Pokémon Showdown</h1>
          <Link className="button-30" href={"/battle"}>
            Vote Now!
          </Link>
        </div>
      </div>
      <RankedList limit={10} />
    </div>
  );
}

import Heading from "../components/Heading";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Heading>🔱Fitness App🔱</Heading>
      <Link href="/calendar">Calendar</Link>
      <br />
      <Link href="/strength">Strength</Link>
    </main>
  );
}

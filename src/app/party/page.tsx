import Link from "next/link";
import TypeParty from "@/components/TypeParty";

export const runtime = "edge";

export default async function Party() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Link href="/Home">Home</Link>
      <TypeParty />
    </main>
  );
}

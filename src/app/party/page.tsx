import Link from "next/link";
import TypeParty from "@/components/TypeParty";

export const runtime = "edge";

export default async function Party() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100%-60px)]">
      {/* <Link href="/Home">Home</Link> */}
      <TypeParty />
    </div>
  );
}

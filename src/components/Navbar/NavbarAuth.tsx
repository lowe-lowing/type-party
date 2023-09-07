import { getUserAuth } from "@/lib/auth";
import AuthButton from "./AuthButton";

export default async function NavbarAuth() {
  const { session } = await getUserAuth();

  if (session?.user) {
    return (
      <div className="flex gap-1 items-center">
        {session?.user.name}
        <AuthButton user={session?.user} />
      </div>
    );
  }
  return <AuthButton user={session?.user} />;
}

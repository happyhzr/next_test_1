import SignIn from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <SignIn />
      <SignOut />
    </div>
  );
}

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="grid place-items-center p-4">
      <SignIn />
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from "@/auth";
import { LogOut, BadgePlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default async function Navbar() {
    const session = await auth();

    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex items-center justify-between">
                <Link href='/'>
                    <Image src='/panda.webp' alt="logo" width={144} height={30}></Image>
                </Link>
                <div className="flex items-center gap-5">
                    {
                        session && session?.user ? (
                            <div className="flex gap-5">
                                <Link href='/startup/create'>
                                    <span className="max-sm:hidden">Create</span>
                                    <BadgePlus className="size-6 sm:hidden" />
                                </Link>

                                <form
                                    action={async () => {
                                        "use server"
                                        await signOut({ redirectTo: "/" })
                                    }}
                                >
                                    <button type="submit">
                                        <span className="max-sm:hidden">Logout</span>
                                        <LogOut className="size-6 sm:hidden text-red-500" />
                                    </button>
                                </form>
                                <Link href={`/user/${session?.id}`}>
                                    <Avatar>
                                        <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
                                        <AvatarFallback >AV</AvatarFallback>
                                    </Avatar>
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <form
                                    action={async () => {
                                        "use server"
                                        await signIn("github", { redirectTo: "/" })
                                    }}
                                >
                                    <button type="submit">Login</button>
                                </form>
                            </div>
                        )
                    }
                </div>
            </nav>
        </header>
    );
}
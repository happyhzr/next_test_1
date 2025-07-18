import Link from "next/link";
import Image from "next/image";

import { auth, signIn, signOut } from "@/auth";

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
                                    <span>Create</span>
                                </Link>

                                <form
                                    action={async () => {
                                        "use server"
                                        await signOut({ redirectTo: "/" })
                                    }}
                                >
                                    <button type="submit">Logout</button>
                                </form>
                                {/* no session id */}
                                <Link href={`/user/${session?.id}`}>
                                    <span>{session?.user?.name}</span>
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
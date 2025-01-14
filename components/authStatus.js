"use client";

import { useSession, signIn, signOut } from "next-auth/react";

async function keycloakSessionLogOut() {
    try {
        await fetch(`/api/auth/logout`, { method: "GET" })
    } catch (err) {
        console.log(err)
    }
}

export default function AuthStatus() {
    const { data: session, status } = useSession();

    if (status == "loading") {
        return <div className="my-3">Loading...</div>;
    } else if (session) {
        return (
            <div className="my-3">
                Logged in as <span className="text-yellow-100">{session.user.email}</span>{" "}
                <button
                    className="bg-blue-900 font-bold text-white py-1 px-2 rounded border border-gray-500"
                    onClick={() => {
                        // signOut({ callbackUrl: "/" })
                        keycloakSessionLogOut().then(() => signOut({ callbackUrl: '/' }))
                    }}>
                    Log out
                </button>
            </div>
        )
    }

    return (
        <div className="my-3">
            Not logged in.{" "}
            <button
                className="bg-blue-900 font-bold text-white py-1 px-2 rounded border border-gray-500"
                onClick={() => {
                    signIn("keycloak")
                }}>
                Log in
            </button>
        </div>
    )
}
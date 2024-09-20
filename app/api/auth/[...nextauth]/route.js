import NextAuth from 'next-auth'
import keycloakProvider from "next-auth/providers/keycloak"
import { jwtDecode } from "jwt-decode";


import { encrypt } from '../../../../utils/encryption'

export const authOptions = {
    providers: [
        keycloakProvider({
            clientId: `${process.env.DEMO_FRONTEND_CLIENT_ID}`,
            clientSecret: `${process.env.DEMO_FRONTEND_CLIENT_SECRET}`,
            issuer: `${process.env.AUTH_ISSUER}`,
        })
    ],

    callbacks: {
        async jwt({ token, account }) {
            const nowTimeStamp = Math.floor(Date.now() / 1000);
            if (account) {
                // account is on ly available the first time this callback is called on a new session
                token.decoded = jwtDecode(account.access_token);
                token.access_token = account.access_token;
                token.id_token = account.id_token;
                token.expires_at = account.expires_at;
                token.refresh_token = account.refresh_token;
                return token
                // token.accessToken = account.access_token
                // token.userProp = account.userProp;
            }
            else if (nowTimeStamp < token.expires_at) {
                // token has not expired yet, return it
                return token
            } else {
                // token is expired, try t refresh it
                console.log("Token has expired. Will refresh...")
                // TODO
                return token
            }
        },
        async session({ session, token }) {
            // Send properties to the client
            // session.Whatever = "dome"
            // session.userProp = token.userProp;    
            session.access_token = encrypt(token.access_token);
            session.id_token = encrypt(token.id_token);
            session.roles = token.decoded.realm_access.roles;


            return session
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
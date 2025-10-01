import { Metadata } from "next"

export const metadata: Metadata = {
    title: "LinkedIn Login, Sign in"
}

export default function LoginLayout({children}: {children: React.ReactNode}){
    return  (
        <>{children}</>
    )
}
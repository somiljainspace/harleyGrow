import Navbar from "../../components/Navbar"
import GetInTouchButton from "@/components/GetInTouchButton"
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="font-work-sans">
            <Navbar/>
            <GetInTouchButton />
            {children}
        </main>
    )
}
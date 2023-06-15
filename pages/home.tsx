import { useState } from "react"
import Layout from "components/Layout";

export default function Home() {

    const [navbar, setNavbar] = useState(false);

    return (
        <>
        <Layout><h1>Home</h1></Layout>
        
        </>
    )
}
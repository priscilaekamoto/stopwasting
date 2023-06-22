import { useState } from "react"
import Layout from "components/Layout";

export default function Home() {

    const [navbar, setNavbar] = useState(false);

    return (
        <>
        <Layout>
            <div className="m-6 ...">
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-black">
                    Get back to growth with 
                    <span className="text-blue-600 dark:text-blue-500">the s #1</span> 
                    CRM.
                </h1>
                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                    Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.
                </p>
            </div>
        </Layout>
        
        </>
    )
}
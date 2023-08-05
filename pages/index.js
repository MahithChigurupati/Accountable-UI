import Head from "next/head"
import styles from "../styles/Home.module.css"

import Header from "../components/Header"
import Main from "../components/Main"
import CreateAgreement from "../components/CreateAgreement"
import Form from "../components/Form"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Project Accountable</title>
                <meta name="description" content="An Accountability Project" />
            </Head>
            <Header />
            {/* <CreateAgreement /> */}
            {/* <Main /> */}
            <Form />
        </div>
    )
}

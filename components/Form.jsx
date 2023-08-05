import { useState, useEffect, useRef } from "react"

export default function Contact() {
    const formRef = useRef()
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { target } = e
        const { name, value } = target

        setForm({
            ...form,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
    }

    return (
        <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
            <div className="flex-[0.75] bg-black-100 p-8 rounded-2xl">
                <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
                    Create Agreement
                </p>
                {/* <h3 className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
                    Contact.
                </h3> */}

                <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
                    <label className="flex flex-col">
                        <span className="text-red font-medium mb-4">Agreement Title</span>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="What's your agreement title?"
                            className="bg-tertiary py-4 px-6 placeholder:text-secondary text-red rounded-lg outline-none border-none font-medium"
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-red font-medium mb-4">Number of Participants</span>
                        <input
                            type="text"
                            name="particpants"
                            value={form.particpants}
                            onChange={handleChange}
                            placeholder="How many participants?"
                            className="bg-tertiary py-4 px-6 placeholder:text-secondary text-red rounded-lg outline-none border-none font-medium"
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-red font-medium mb-4">Participation Stake</span>
                        <input
                            type="text"
                            name="stake"
                            value={form.stake}
                            onChange={handleChange}
                            placeholder="What's your participant stake?"
                            className="bg-tertiary py-4 px-6 placeholder:text-secondary text-red rounded-lg outline-none border-none font-medium"
                        />
                    </label>

                    <button
                        type="submit"
                        className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-red font-bold shadow-md shadow-primary"
                    >
                        {loading ? "Sending..." : "Send"}
                    </button>
                </form>
            </div>
        </div>
    )
}

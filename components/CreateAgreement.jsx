import { useState, useEffect } from "react"
import { Button } from "web3uikit"

export default function Agreement() {
    const [title, setTitle] = useState("")
    const [participants, setParticipants] = useState("")
    const [participantStake, setParticipantStake] = useState("")

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleParticipantsChange = (event) => {
        setParticipants(event.target.value)
    }

    const handleParticipantStakeChange = (event) => {
        setParticipantStake(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("Form submitted:", { title, participants })
        // You can perform additional actions here, such as sending the data to a server.
    }
    return (
        <div>
            <h1>Create a New Event</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={handleTitleChange} />
                </div>
                <div>
                    <label>Number of Participants:</label>
                    <input
                        type="number"
                        value={participants}
                        onChange={handleParticipantsChange}
                    />
                </div>
                <div>
                    <label>Participant Stake</label>
                    <input
                        type="number"
                        value={participantStake}
                        onChange={handleParticipantStakeChange}
                    />
                </div>
                <button text="Submit" type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

import AudioSynth from "./AudioSynth";

const serverURL = "http://localhost:8080/api/users"

export const getUsers = (() => {
    return fetch(serverURL)
    .then(res => res.json())
})

export default Au
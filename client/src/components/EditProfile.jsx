import { useState } from "react"
import axios from "axios";

function EditProfile({ setEdit, setUserImage }) {

    const [inputs, setInputs] = useState({
        oldUsername: '',
        oldPassword: '',
        newUsername: '',
        profilePic: {},
    })

    const handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData();
        data.append("oldUsername", inputs.oldUsername);
        data.append("oldPassword", inputs.oldPassword);
        data.append("newUsername", inputs.newUsername);
        data.append("profilePic", inputs.profilePic);
        const res = await axios.post('/api/auth/profile/update', data);
        if (res.status == 200) {
            const user = JSON.parse(localStorage.getItem("user"));
            user.username = inputs.newUsername;
            localStorage.setItem("user", JSON.stringify(user));
            setUserImage(inputs.profilePic.name)
        }
    }



    return (
        <div className='edit-profile'>
            <button onClick={() => setEdit(false)} className="X">X</button>
            <form onSubmit={handleSubmit}>
                <label htmlFor="user">username</label>
                <input type="text" name="user" id="user" placeholder="username" max={20}
                    required
                    onChange={e => setInputs({ ...inputs, oldUsername: e.target.value })}
                />
                <br />
                <label htmlFor="pass">Password</label>
                <input type="password" name="pass" id="pass" placeholder="password" max={100}
                    required
                    onChange={e => setInputs({ ...inputs, oldPassword: e.target.value })}
                />
                <br /> <br />
                <label htmlFor="new-user">New username</label>
                <input type="text" name="new-user" id="new-user" placeholder="new username" max={20} onChange={e => setInputs({ ...inputs, newUsername: e.target.value })} />
                <br />
                <label htmlFor="profilePic">Change your profile image</label>
                <input type="file" name="profilePic" id="profilePic" onChange={e => setInputs({ ...inputs, profilePic: e.target.files[0] })} />
                <br />
                <br />
                <button type="submit">Confirm changes</button>

            </form>
        </div>
    )
}

export default EditProfile

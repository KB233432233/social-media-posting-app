import axios from "axios";
import { useState } from "react";
import { useValues } from "../context/useValues";

function PostForm() {

    const { id, setPosts2 } = useValues();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append("author", id);
        data.append("text", values.text);
        data.append("file", values.file);
        const res = await axios.post('/posting', data);
        if (res == true) {
            setPosts2(prev => [...prev, data]);
        }
        window.location.reload();
    }

    const [values, setValues] = useState({
        text: '',
        file: {},
    });

    return (
        <div className='post-form'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="post-text">Post content</label><br />
                    <textarea type="text" maxLength={100} required name="post-text" placeholder="Enter your post text here"
                        value={values.text}
                        onChange={(e) => setValues({ ...values, text: e.target.value })}
                    />
                </div>
                <br />
                <label htmlFor="photo" className="p-label">Photo</label>
                <input type="file" onChange={(e) => setValues({ ...values, file: e.target.files[0] })} name="image" id="photo"/>
                <button type="submit">Post</button>
            </form>
        </div>
    )
}

export default PostForm

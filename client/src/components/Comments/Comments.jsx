import { useState, useEffect, useRef } from "react";
import Comment from "./Comment"
import axios from 'axios'
import { useValues } from "../../context/useValues";


function Comments({ postID, setComments }) {
    const { id } = useValues();
    const [arr, setArr] = useState([])
    const [comment, setComment] = useState('')
    const [refreshComments, setRefreshComments] = useState(false);

    const getComments = async () => {
        const res = await axios.get(`/posting/getPostComments/${postID}`);
        setArr(res.data);
    }

    const submitComment = async (e) => {
        e.preventDefault();
        const data = {
            postID,
            id,
            comment
        }
        const res = await axios.post('/posting/postAComment', data);
        setRefreshComments(!refreshComments);
    }

    useEffect(() => {
        getComments()
    }, [refreshComments])

    return arr && (
        <div className='comments-sec'>
            <button className="comments-x" onClick={() => setComments(false)}>x</button>
            <div className="comments">
                {arr.length > 0 ? arr.map((e, index) => <Comment key={index} setRefreshComments={setRefreshComments}
                    userId={e.userId}
                    name={e.name}
                    img={e.img}
                    content={e.content}
                    _id={e._id}
                    date={e.date}
                />)
                    : <p className="no-comments">No comments yet</p>}
            </div>

            <form className="input-comment" onSubmit={submitComment}>
                <input type="text" name="comment" placeholder="Write your comment here" maxLength={100} onChange={e => setComment(e.target.value)} />
                <button type="submit">Comment</button>
            </form>
        </div>
    )
}

export default Comments

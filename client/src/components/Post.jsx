import { FaRegComment, FaRegHeart, FaTrash } from "react-icons/fa";
import Comments from "./Comments/Comments";
import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Avatar from "./Avatar";
import moment from "moment";



const Post = ({ whomadeit, likes, img, text, postID, authors_pic, home, setUserImage, author, renderDelete, date }) => {

    const [comments, setComments] = useState(false);
    const [likes2, setLikes] = useState(likes);
    const src = img ? `http://localhost:3001/images/${img}` : '';

    const handleLike = async () => {
        const res = await axios.patch("/posting/like", { postID: postID });
        setLikes(res.data);
    }

    const handleDeletion = async () => {
        const res = await axios.delete(`/posting/${postID}`);
        if (res.status == 200) setUserImage({});
    }

    return (
        <div className="post">
            <Link to={`/page/profile/${author}`} className="author">
                <Avatar img={authors_pic} />
                <div className="name-date">
                    <p>{whomadeit}</p>
                    <span>{moment(date).fromNow()}</span>
                </div>
            </Link>
            <p>{text}</p>
            <img src={src} />
            <div className="icons">
                <FaRegComment className="icon" onClick={() => setComments(true)} />
                <div>
                    <span>{likes2 > 0 ? likes2 : ''}</span>
                    <FaRegHeart className="icon" onClick={handleLike} />
                </div>
                {(!home ? renderDelete && <FaTrash className="icon" onClick={handleDeletion} /> : null)}
            </div>
            {comments && <Comments postID={postID} setComments={setComments} />}
        </div>
    )
}

export default Post

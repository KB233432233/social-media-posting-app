import React from 'react'
import Avatar from '../Avatar'
import { FaTrash } from 'react-icons/fa'
import { useValues } from '../../context/useValues'
import axios from 'axios';
import moment from 'moment';

function Comment({ name, img, content, userId, setRefreshComments, _id, date }) {
    const { id } = useValues();

    const handleDelete = async () => {
        const res = await axios.delete(`/posting/deleteAComment/${_id}`);
        if (res.status == 200) setRefreshComments(prev => !prev);
    }

    return (
        <div className='comment'>
            <div className="author">
                <Avatar img={img} />
                <div className="name-date">
                    <p>{name}</p>
                    <span>{moment(date).fromNow()}</span>
                </div>
            </div>
            <p>{content}</p>
            {(id == userId) && <FaTrash onClick={handleDelete} className='trash' />}
        </div>
    )
}

export default Comment

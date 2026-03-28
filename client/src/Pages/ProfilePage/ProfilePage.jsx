import { useEffect, useState } from 'react'
import axios, { formToJSON } from 'axios';
import './ProfilePage.css'
import { useValues } from '../../context/useValues';
import Post from '../../components/Post';
import Follow from '../../components/follow';
import Avatar from '../../components/Avatar';
import EditProfile from '../../components/EditProfile';
import { useParams } from 'react-router-dom';

function ProfilePage() {
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState({});
    const [edit, setEdit] = useState(false);
    const { id } = useValues();
    const { id2 } = useParams();
    const [cover, setCover] = useState({});
    const [follow, setFollow] = useState('Follow');
    const [changeCover, setChangeCover] = useState(false);
    const [skip, setSkip] = useState(0);

    const getPosts = async () => {
        const res = await axios.get(`/posting/getPosts/${id2}/${skip}`);
        setPosts(res.data);
        setSkip(skip + res.data.length);
    }

    const getUserData = async () => {
        const res = await axios.get(`/api/auth/profile/${id2}`);
        setUserData(res.data);
    }

    const handleCoverChange = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('id', id);
        data.append('coverPic', cover);
        const res = await axios.put('/api/auth/profile/update', data);
        if (res.status == 200) {
            setUserData({ ...userData, profilePic: cover })
            setChangeCover(false);
        };
    }

    const getMyData = async () => {
        const res = await axios.get(`/api/auth/profile/${id}`);
        if (res.data.friends.includes(id2)) setFollow('Following!')
    }

    const handleFollow = async () => {
        const res = await axios.post('/api/auth/profile/follow', { id: id, id2: id2 });
        res.status == 200 ? setFollow('Following!') : null
    }

    const renderButtons = id == id2;
    useEffect(() => {
        getPosts();
        getUserData();
        getMyData();
    }, [userData.profilePic, id2, follow]);


    const setUserImage = (img) => {
        setUserData({ ...userData, profilePic: img });
    }

    const handleLoadMore = async () => {
        const res = await axios.get(`/posting/getPosts/${id2}/${skip}`);
        setPosts(prev => [...prev, ...res.data]);
        setSkip(skip + res.data.length)
    }


    return userData && posts && (
        <div className={'home-container'}>
            <div className="profiler">
                <div className="cover-photo">
                    <img src={userData.coverPic ? `http://localhost:3001/images/profileandcoverpics/${userData.coverPic}` : ''} alt="cover photo" />
                </div>
                <div className="p-name-pic">
                    <div className="pic-name" onClick={() => setChangeCover(false)}>
                        <Avatar img={userData.profilePic} />
                        <h2>{userData.username}</h2>
                        {userData.bio && <span>{userData.bio}</span>}
                        <Follow label={'Followers'} value={userData.followers} />
                        <Follow label={'Following'} value={userData.following} />
                    </div>
                    <div className="buttons">
                        {renderButtons && <button onClick={() => setChangeCover(true)}>Change cover photo</button>}
                        {changeCover && <form onSubmit={handleCoverChange} >
                            <label htmlFor="coverPic" className="coverlabel">Change your cover photo</label>
                            <input type="file" name="coverPic" id="coverPic" onChange={e => setCover(e.target.files[0])} />
                            <button type='submit'>Confirm</button>
                        </form>}
                        {renderButtons && <button onClick={() => setEdit(true)}>Edit Profile</button>}
                        {!renderButtons && <button onClick={() => {
                            if (follow == 'Following!') return;
                            handleFollow()
                        }}>{follow}</button>}
                    </div>
                </div>
            </div>
            {edit && <EditProfile setEdit={setEdit} setUserImage={setUserImage} />}
            {posts.map(ele => {
                return <Post
                    author={ele.author}
                    home={false}
                    renderDelete={renderButtons}
                    authors_pic={ele.authors_pic}
                    postID={ele._id}
                    key={ele._id}
                    whomadeit={ele.authors_name}
                    likes={ele.likes}
                    img={ele.content[1]}
                    text={ele.content[0]}
                    setUserImage={setUserImage}
                    date={ele.date}
                />
            })}
            <button onClick={() => handleLoadMore()}>Load more twittes</button>
        </div>
    )
}

export default ProfilePage

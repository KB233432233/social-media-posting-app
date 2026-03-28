import Post from '../../components/Post';
import './HomePage.css';
import logo from '../../assets/react.svg'
import { useEffect, useState } from 'react';
import axios from 'axios'

function HomePage() {

    const [posts, setPosts] = useState([]);
    const [skip, setSkip] = useState(0);

    const getPosts = async () => {
        const res = await axios.get(`/posting/getPosts/home/${skip}`);

        setPosts(res.data);
        setSkip(skip + res.data.length)
    }

    useEffect(() => { getPosts() }, []);

    const handleLoadMore = async () => {
        const res = await axios.get(`/posting/getPosts/home/${skip}`);
        setPosts(prev => [...prev, ...res.data]);
        setSkip(skip + res.data.length)
    }


    return posts && (
        <div className='home-container'>
            {posts.map((ele) => {
                return <Post
                    author={ele.author}
                    home={true}
                    postID={ele._id}
                    authors_pic={ele.authors_pic}
                    key={ele._id}
                    whomadeit={ele.authors_name}
                    likes={ele.likes}
                    img={ele.content[1]}
                    text={ele.content[0]}
                    date={ele.date}
                />
            })}
            <button onClick={handleLoadMore}>Load more</button>
        </div>
    )
}

export default HomePage

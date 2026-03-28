import './PageLayout.css';
import { FaSearch, FaHome, FaRegBell, FaClipboardList, FaRegBookmark, FaUserFriends } from 'react-icons/fa';
import { GoPerson } from 'react-icons/go'
import { MdMailOutline } from 'react-icons/md'
import { PiDotsThreeCircle } from 'react-icons/pi'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { isGuest, getToken } from '../../auth';
import { useEffect } from 'react';
import { useState } from 'react';
import Contacts from '../../components/Contacts';
import PostForm from '../../components/PostForm';
import logo from '../../assets/photo_2024-02-06_11-20-39.jpg';
import { useValues } from '../../context/useValues';



function PageLayout() {
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const [postForm, setPostForm] = useState(false);
    const { updateId, id } = useValues();

    useEffect(() => {
        if (isGuest()) navigate('/');
        else {
            const id = JSON.parse(localStorage.getItem('user')).id;
            updateId(id);
            setLoad(true);
        }
    }, [])


    return load && (
        <div className='page-layout'>
            <div className={`left-bar  ${postForm ? 'opacity-reducer' : ''}`}>
                <div className="logocon">
                    <img src={logo} alt="logo" />
                </div>
                <ul>
                    <li>
                        {/* <FaHome /> */}
                        <Link to='/page' className='nav-link'><FaHome /> <span>Home</span></Link>
                    </li>
                    <li>
                        <FaSearch />
                        <span>Explore</span>
                    </li>
                    <li>
                        <FaRegBell />
                        <span>Nofications</span>
                    </li>
                    <li>
                        <MdMailOutline />
                        <span>Messages</span>
                    </li>
                    <li>
                        <FaClipboardList />
                        <span>Lists</span>
                    </li>
                    <li>
                        <FaRegBookmark />
                        <span>Bookmarks</span>
                    </li>
                    <li>
                        <FaUserFriends />
                        <span>Comuninties</span>
                    </li>
                    <li>
                        {/* <GoPerson /> */}
                        <Link to={`/page/profile/${id}`} className='nav-link'><GoPerson /><span>Profile</span></Link>
                    </li>
                    <li>
                        <PiDotsThreeCircle />
                        <span>More</span>
                    </li>
                    <button onClick={() => setPostForm(true)}>Post</button>
                </ul>
            </div>
            <div className={`middle-page ${postForm ? 'opacity-reducer' : ''}`} onClick={() => setPostForm(false)}>
                <Outlet />
            </div>
            <div className={`right-bar  ${postForm ? 'opacity-reducer' : ''}`} onClick={() => setPostForm(false)}>
                <div className='search-bar'>
                    <FaSearch className='icon' />
                    <input type="text" placeholder='Search' maxLength={20} />
                </div>
                <div className='suggested'>
                    <Contacts />
                </div>
                <div className='trends-for-you'></div>
            </div>
            {postForm && <PostForm />}
        </div>
    )
}

export default PageLayout

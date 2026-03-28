import { RxAvatar } from 'react-icons/rx'

function Avatar({ img }) {
    return (
        <div className='avatar'>
            {img ? <img src={`http://localhost:3001/images/profileandcoverpics/${img}`} alt="img" /> : <RxAvatar className='avatar-icon' />}
        </div>
    )
}

export default Avatar

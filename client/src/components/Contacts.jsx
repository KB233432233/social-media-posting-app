import Contact from './Contact';
import { useValues } from '../context/useValues';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

function Contacts() {
    const { id } = useValues()
    const [contacts, setContacts] = useState([]);
    const fetchContacts = async () => {
        const res = await axios.get(`/api/auth/profile/getContacts/${id}`);
        setContacts(res.data);
    }

    useEffect(() => {
        fetchContacts()
    }, [])

    return (
        <>
            {contacts.map(e => <Contact key={e.username} avatar={e.profilePic} name={e.username} />)}
        </>
    )
}

export default Contacts

import React, {useState, useReducer, useEffect} from 'react';
import Chat from '../Chat/Chat';
import DialogList from '../DialogList/DialogList';
import MessageArea from '../MessageArea/MessageArea';
import styles from './Dashboard.module.css';
import { UserContext } from '../../contexts/userContext';
import { getData } from '../../api';
import CONSTANTS from '../../constants';
const {ACTIONS} = CONSTANTS;


function reducer(state, action) {

}

const Dashboard = () => {
    const [user, setUser] = useState({
        id: 1,
        username: 'c123s',
        imageSrc: 'https://robohash.org/c123s'
    })

    const [state, dispatch] = useReducer(reducer, {
        messages: []
    })

    useEffect(() => {
        getData()
        .then((data) => {
            dispatch({
                type: ACTIONS.DATA_LOAD_SUCCESS,
                payload: {
                    data
                }
            })
        })
        .catch((error) => {
            dispatch({
                type: ACTIONS.DATA_LOAD_ERROR
            })
        })
    }, [])

    return (
        <UserContext.Provider value={user}>
            <main className={styles.container}>
            <DialogList /> {/* row */}
            <section className={styles.wrapper}>
                <Chat /> {/* column */}
                <MessageArea /> {/* column */}
            </section>
        </main>
        </UserContext.Provider>
    );
}

export default Dashboard;

import React, { useContext } from 'react';
import { UserDispatch } from './App';

const User = React.memo(function User({ user }) {
    const dispatch = useContext(UserDispatch);
    return (
        <div id="userlist">
            <b
                style={{
                cursor: 'pointer',
                color: user.active ? 'pink' : 'black'
                }}
                onClick={() => {
                    dispatch({ type: 'TOGGLE_USER', id: user.id });
                }}
            > 
                {user.whattodo} 
            </b>  
            &nbsp;           
            <span>({user.date})</span>
            <button 
                onClick={() => {
                    dispatch({ type: 'REMOVE_USER', id: user.id });
                }}
            >
                삭제
            </button>
        </div>
    );
});

function UserList({ users, onRemove, onToggle }) {
    return (
        <div>
            {users.map(user => (
                <User 
                user={user} 
                key={user.id} 
            />
        ))}
        </div>
    );
}

export default React.memo(UserList);
import React, { useEffect } from 'react';

// 재사용성을 높이기 위해 
function User({user, onRemove, onToggle}) {
    useEffect(() => {
        console.log(user);
    })

    return (
        <div>
            <b style={{
                cursor:'pointer',
                color:user.active? 'green' : 'black'
            }}
            onClick={() => onToggle(user.id)}
            >{user.date}</b>

        
            <span>({user.todo})</span>
            <button onClick={() => onRemove(user.id)}>삭제</button>
            
        </div>
    );
}



function UserList({ users,onRemove , onToggle}){
    return(
        <div>
            {users.map(user => (
                <User 
                user={user} 
                key={user.id} 
                onRemove={onRemove}
                onToggle = {onToggle}
                />
            ))}
        </div>
    );
}


export default UserList;
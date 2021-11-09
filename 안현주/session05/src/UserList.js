import React, { useContext } from 'react';
import { UserDispatch } from './App';

import styled, { ThemeProvider } from 'styled-components';
import Button from './Button'


// 재사용성을 높이기 위해 


const User = React.memo( function User({user}) {
    const dispatch = useContext(UserDispatch);

    return (
        <div>
            <b style={{
                cursor:'pointer',
                color:user.active? 'green' : 'black'
                }}
                onClick={() => {
                    dispatch({ type: 'TOGGLE_USER', id:user.id});
                }}
            >
            
            {user.todo}
            </b>
            &nbsp;
        
            <span>({user.date})</span>


            <>
                <ThemeProvider
                    theme={{
                     palette: {
                       blue: '#228be6',
                       gray: '#495057',
                        pink: '#f06595',
                        green: '#008000'
                     }
                    }}
                >

                <Button size='x-small' color='green' onClick = { ()=> {
                    dispatch({ type: 'REMOVE_USER', id: user.id});
                }}> 
                    삭제    
                </Button>


                 </ThemeProvider>
            </>

            
            
        </div>
    );
});




function UserList({ users }){
    return(
        <div>
            {users.map(user => (
                <User user={user} key={user.id} />
            ))}
        </div>
    );
}

export default React.memo(UserList);
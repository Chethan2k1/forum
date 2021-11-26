import React, { useState } from 'react'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import PostsList from './components/PostsList'
import Navbar from './components/Navbar'
import About from './components/About'
import CreatePost from './components/CreatePost'
import ShowPost from './components/ShowPost'
import Modcontrol from './components/Modcontrol'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Admincontrol from './components/Admincontrol'

function App() {
    const [username, setUsername] = useState('');
    const [points, setPoints] = useState(null);
    const [token, setToken] = useState('')
    const [isloggedin, setIsloggedin] = useState(false);
    // states that stores the previleges of the user
    const [ismod, setIsmod] = useState(false);
    const [isadmin, setIsadmin] = useState(false);

    return (
        <BrowserRouter>
            <Navbar
                isloggedin={isloggedin}
                username={username}
                points={points}
                ismod={ismod}
                isadmin={isadmin}
            />
            <div>
                <Routes>
                    <Route path='/' exact element={<PostsList isloggedin={isloggedin} />} />
                    <Route path='/login' exact element={
                        <SignIn
                            setIsloggedin={setIsloggedin}
                            setUsername={setUsername}
                            setPoints={setPoints}
                            setToken={setToken}
                            setIsmod={setIsmod}
                            setIsadmin={setIsadmin}
                        />}
                    />
                    <Route path='/register' exact element={<SignUp />} />
                    {
                        isloggedin
                            ? <Route path='/createPost' element={
                                <CreatePost
                                    token={token}
                                />}
                            />
                            : <Route />
                    }
                    <Route path='/post/:postid' element={<ShowPost isloggedin={isloggedin} token={token} />} />
                    <Route path='/about/:username' element={<About username={username} />} />
                    {
                        (isloggedin && (ismod || isadmin)) ? (<Route path='/modcontrol' element={
                            <Modcontrol
                                token={token}
                            />}
                        />) : <Route />
                    }
                    {
                        (isloggedin && isadmin) ? (<Route path='/admincontrol' element={
                            <Admincontrol
                                token={token}
                            />}
                        />) : <Route />
                    }
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
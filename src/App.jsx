import React, { useState } from 'react'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import PostsList from './components/PostsList'
import Navbar from './components/Navbar'
import About from './components/About'
import CreatePost from './components/CreatePost'
import ShowPost from './components/ShowPost'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
    const [username, setUsername] = useState('');
    const [points, setPoints] = useState(null);
    const [token, setToken] = useState('')
    const [isloggedin, setIsloggedin] = useState(false);

    return (
        <BrowserRouter>
            <Navbar username={username} points={points} />
            <div>
                <Routes>
                    <Route path='/' exact element={<PostsList isloggedin={isloggedin} />} />
                    <Route path='/login' exact element={
                        <SignIn
                            setIsloggedin={setIsloggedin}
                            setUsername={setUsername}
                            setPoints={setPoints}
                            setToken={setToken}
                        />}
                    />
                    <Route path='/register' exact element={<SignUp />} />
                    {isloggedin
                        ? <Route path='/createPost' element={
                            <CreatePost
                                token={token}
                                username={username}
                            />}
                        />
                        : <Route />}
                    <Route path='/post/:postid' element={<ShowPost />} />
                    <Route path='/about/:username' element={<About username={username} />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
import React from 'react'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import PostsList from './components/PostsList'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
 
function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path='/' exact element={<PostsList />} />
                    <Route path='/login' exact element={<SignIn />} />
                    <Route path='/register' exact element={<SignUp />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
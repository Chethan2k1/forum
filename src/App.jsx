import React from 'react'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
 
function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path='/login' element={<SignIn />} />
                    <Route path='/register' element={<SignUp />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
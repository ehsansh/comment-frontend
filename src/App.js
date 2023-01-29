import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.scss';
import PersistLogin from './components/PersistLogin';
import ProtectedRoute from './components/ProtectedRoute';

const CommentSection = lazy(() => import('./components/CommentSection'));
const Register = lazy(() => import('./components/Register'));
const Login = lazy(() => import('./components/Login'));

function App() {
    return (
        <div className='App'>
            <Suspense>
                <Routes>
                    <Route element={<PersistLogin />}>
                        <Route element={<ProtectedRoute />}>
                            <Route path='/' element={<CommentSection />} />
                        </Route>
                    </Route>

                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;

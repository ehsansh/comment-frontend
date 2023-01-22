import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const CommentSection = lazy(() => import('./components/CommentSection'));

function App() {
    return (
        <div className='App'>
            <Suspense>
                <Routes>
                    <Route path='/' element={<CommentSection />} />
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;

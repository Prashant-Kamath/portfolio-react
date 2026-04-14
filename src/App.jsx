import { Routes, Route } from 'react-router-dom';
import Dock from './components/navbar';
import Works from './pages/Works';
import './App.css';

function App() {
    return (
        <div className="min-h-screen bg-zinc-950">
            <Routes>
                {/* Define the Home route */}
                <Route path="/" element={<div className="text-white p-10">Home Content</div>} />
                
                {/* Define the Works route */}
                <Route path="/works" element={<Works />} />
            </Routes>

            {/* The Dock navigation bar stays fixed at the bottom */}
            <Dock />
        </div>
    );
}

export default App;
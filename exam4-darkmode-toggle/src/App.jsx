import { useState, useEffect } from 'react';

import './App.css';

function App() {
    const storedTheme = localStorage.getItem('theme') || 'light';
    const [theme, setTheme] = useState(storedTheme);
    const [isChecked, setIsChecked] = useState(storedTheme == 'dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        setIsChecked(theme === 'dark');
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    const DarkMode = () => {
        return (
            <div className="flex items-center justify-center p-4">
                <span className="text-4xl">☀️</span>
                <label className="relative inline-block h-8 w-20">
                    <input
                        type="checkbox"
                        className="hidden"
                        checked={isChecked}
                        onChange={toggleTheme}
                    />
                    <div
                        className={`absolute inset-0 cursor-pointer rounded-full 
                transition duration-500 ease-in-out
                ${isChecked ? 'bg-blue-500' : 'bg-gray-300'}`}
                    >
                        <div
                            className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white
                  transition-transform duration-500 ease-in-out
                  ${isChecked ? 'translate-x-12' : 'translate-x-0'}`}
                        />
                    </div>
                </label>
                <span className="text-4xl">🌒</span>
            </div>
        );
    };

    return (
        <>
            <DarkMode />
        </>
    );
}

export default App;

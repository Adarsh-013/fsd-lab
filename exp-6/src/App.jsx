import { useState } from 'react';

import Header from './components/Header.jsx';
import Counter from './components/Counter.jsx';
import StudentForm from './components/StudentForm.jsx';
import StudentList from './components/StudentList.jsx';

import './App.css';

const initialStudents = [
    {
        id: 1,
        name: 'Aarav Mehta',
        coffee: 'Cappuccino'
    },
    {
        id: 2,
        name: 'Isha Shah',
        coffee: 'Cold Coffee'
    }
];

function App() {
    const [students, setStudents] = useState(initialStudents);

    function handleAddStudent(newStudent) {
        const student = {
            ...newStudent,
            id: `${Date.now()}-${Math.random()}`
        };

        setStudents((currentStudents) => [
            ...currentStudents,
            student
        ]);
    }

    function handleRemoveStudent(studentId) {
        setStudents((currentStudents) =>
            currentStudents.filter(
                (student) => student.id !== studentId
            )
        );
    }

    return (
        <div className="app">
            <Header
                title="URBAN BREW"
                subtitle="Fresh Coffee. Fresh Ideas."
            />

            <main className="page-container">
                <section className="welcome-section">
                    <div>
                        <p className="section-label">
                            EXPERIMENT 06 · REACT FUNDAMENTALS
                        </p>

                        <h2>
                            Good coffee.
                            <br />
                            Great company.
                        </h2>

                        <p>
                            Welcome to the Urban Brew Campus Coffee Club.
                            Manage members and explore interactive React
                            components in one place.
                        </p>
                    </div>

                    <div className="welcome-badge">
                        <span>☕</span>
                        <strong>{students.length}</strong>
                        <small>Club Members</small>
                    </div>
                </section>

                <Counter />

                <div className="content-grid">
                    <StudentForm onAddStudent={handleAddStudent} />

                    <StudentList
                        students={students}
                        onRemoveStudent={handleRemoveStudent}
                    />
                </div>
            </main>

            <footer className="site-footer">
                <strong>URBAN BREW</strong>
                <p>Campus Coffee Club · Built with React</p>
                <p>© 2026 Urban Brew Cafe</p>
            </footer>
        </div>
    );
}

export default App;
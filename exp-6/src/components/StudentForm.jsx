import { useState } from 'react';

function StudentForm({ onAddStudent }) {
    const [name, setName] = useState('');
    const [coffee, setCoffee] = useState('Cappuccino');
    const [error, setError] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        const trimmedName = name.trim();

        if (trimmedName.length < 2) {
            setError('Please enter a name with at least 2 characters.');
            return;
        }

        onAddStudent({
            name: trimmedName,
            coffee: coffee
        });

        setName('');
        setCoffee('Cappuccino');
        setError('');
    }

    return (
        <section className="form-card">
            <p className="section-label">CAMPUS COFFEE CLUB</p>
            <h2>Register a Member</h2>

            <p className="muted-text">
                Add a student and their favourite coffee to the club list.
            </p>

            <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label htmlFor="studentName">Student Name</label>

                    <input
                        type="text"
                        id="studentName"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Enter student name"
                        maxLength={60}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="favouriteCoffee">
                        Favourite Coffee
                    </label>

                    <select
                        id="favouriteCoffee"
                        value={coffee}
                        onChange={(event) => setCoffee(event.target.value)}
                    >
                        <option value="Espresso">Espresso</option>
                        <option value="Cappuccino">Cappuccino</option>
                        <option value="Cafe Latte">Cafe Latte</option>
                        <option value="Cold Coffee">Cold Coffee</option>
                    </select>
                </div>

                {error && <p className="form-error">{error}</p>}

                <button type="submit" className="primary-button">
                    ADD MEMBER
                </button>
            </form>
        </section>
    );
}

export default StudentForm;
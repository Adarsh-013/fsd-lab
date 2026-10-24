function StudentList({ students, onRemoveStudent }) {
    return (
        <section className="list-card">
            <div className="list-heading">
                <div>
                    <p className="section-label">MEMBER DIRECTORY</p>
                    <h2>Coffee Club Members</h2>
                </div>

                <span className="member-count">
                    {students.length} members
                </span>
            </div>

            {students.length === 0 ? (
                <p className="empty-state">
                    No members registered yet. Add the first member
                    using the registration form.
                </p>
            ) : (
                <ul className="student-list">
                    {students.map((student) => (
                        <li className="student-item" key={student.id}>
                            <div className="avatar">
                                {student.name.charAt(0).toUpperCase()}
                            </div>

                            <div className="student-details">
                                <strong>{student.name}</strong>
                                <span>{student.coffee}</span>
                            </div>

                            <button
                                type="button"
                                className="remove-button"
                                onClick={() => onRemoveStudent(student.id)}
                                aria-label={`Remove ${student.name}`}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default StudentList;
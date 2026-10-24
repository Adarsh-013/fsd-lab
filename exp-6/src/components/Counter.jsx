import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <section className="counter-card">
            <div>
                <p className="section-label">INTERACTIVE COMPONENT</p>
                <h3>Daily Brew Counter</h3>
                <p className="muted-text">
                    Track cups brewed during today's session.
                </p>
            </div>

            <div className="counter-controls">
                <button
                    type="button"
                    className="counter-button"
                    onClick={() => setCount(Math.max(0, count - 1))}
                    aria-label="Decrease cup count"
                >
                    −
                </button>

                <strong className="counter-value">{count}</strong>

                <button
                    type="button"
                    className="counter-button"
                    onClick={() => setCount(count + 1)}
                    aria-label="Increase cup count"
                >
                    +
                </button>
            </div>
        </section>
    );
}

export default Counter;
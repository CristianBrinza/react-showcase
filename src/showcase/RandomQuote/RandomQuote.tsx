import React, { useState, useEffect } from 'react';
import styles from './RandomQuote.module.css';
import SourceCode from "../../components/source-code/SourceCode";

interface Quote {
    q: string;
    a: string;
}

const RandomQuote: React.FC = () => {
    const [quote, setQuote] = useState<Quote | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRandomQuote = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://thingproxy.freeboard.io/fetch/https://zenquotes.io/api/random');
            if (!response.ok) {
                throw new Error('Failed to fetch a new quote');
            }
            const data = await response.json();
            setQuote(data[0]); // ZenQuotes returns an array with one object
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRandomQuote(); // Fetch a quote when the component mounts
    }, []);

    return (
        <div className={styles.container}>
            <SourceCode link="https://github.com/CristianBrinza/react-showcase/tree/main/src/showcase/RandomQuote" />

            <h1 className={styles.title}>Random Quote Generator</h1>

            {loading && <p className={styles.loading}>Loading...</p>}
            {error && <p className={styles.error}>Error: {error}</p>}

            {!loading && !error && quote && (
                <div className={styles.quoteContainer}>
                    <p className={styles.quote}>"{quote.q}"</p>
                    <p className={styles.author}>- {quote.a}</p>
                </div>
            )}

            <button onClick={fetchRandomQuote} className={styles.newQuoteButton}>
                Get New Quote
            </button>
        </div>
    );
};

export default RandomQuote;

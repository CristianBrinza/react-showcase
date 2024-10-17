// src/showcase/Tabulation/Tabulation.tsx

import React, { useState, useEffect } from 'react';
import data from './data.json';
import styles from './Tabulation.module.css';
import SourceCode from "../../components/source-code/SourceCode";

interface DataItem {
    id: number;
    name: string;
    email: string;
    age: number;
}

const Tabulation: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<keyof DataItem | ''>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [pageSize, setPageSize] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filteredData, setFilteredData] = useState<DataItem[]>([]);

    const totalPages = Math.ceil(filteredData.length / pageSize);

    useEffect(() => {
        let filtered = data as DataItem[];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(
                (item) =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sorting
        if (sortField) {
            filtered.sort((a, b) => {
                const fieldA = a[sortField];
                const fieldB = b[sortField];

                if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
                if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });
        }

        setFilteredData(filtered);
        setCurrentPage(1); // Reset to first page when data changes
    }, [searchTerm, sortField, sortOrder, pageSize]);

    // Pagination logic
    const paginatedData = filteredData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    // Generate page numbers for pagination controls
    const pageNumbers = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    ).slice(
        Math.max(0, currentPage - 3),
        Math.min(totalPages, currentPage + 2)
    );

    // Event handlers
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (field: keyof DataItem) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(Number(e.target.value));
    };

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className={styles.container}>

            <SourceCode link="https://github.com/CristianBrinza/react-showcase/tree/main/src/showcase/tabulation"/>

            <h1>Tabulation Showcase</h1>

            <div className={styles.topBar}>
                <div className={styles.searchSort}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className={styles.searchInput}
                    />

                    <div className={styles.sortBy}>
                        <label>Sort by: </label>
                        <select
                            value={sortField}
                            onChange={(e) =>
                                setSortField(e.target.value as keyof DataItem)
                            }
                        >
                            <option value="">None</option>
                            <option value="id">ID</option>
                            <option value="name">Name</option>
                            <option value="email">Email</option>
                            <option value="age">Age</option>
                        </select>
                        {sortField && (
                            <button
                                onClick={() =>
                                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                                }
                            >
                                {sortOrder === 'asc' ? '▲' : '▼'}
                            </button>
                        )}
                    </div>
                </div>

                <div className={styles.pageSize}>
                    <label>Rows per page: </label>
                    <select value={pageSize} onChange={handlePageSizeChange}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </select>
                </div>
            </div>

            <table className={styles.table}>
                <thead>
                <tr>
                    <th onClick={() => handleSort('id')}>
                        ID {sortField === 'id' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                    <th onClick={() => handleSort('name')}>
                        Name {sortField === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                    <th onClick={() => handleSort('email')}>
                        Email{' '}
                        {sortField === 'email' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                    <th onClick={() => handleSort('age')}>
                        Age {sortField === 'age' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                </tr>
                </thead>
                <tbody>
                {paginatedData.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.age}</td>
                    </tr>
                ))}
                {paginatedData.length === 0 && (
                    <tr>
                        <td colSpan={4} className={styles.noData}>
                            No data found
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            <div className={styles.pagination}>
                <button
                    onClick={() => goToPage(1)}
                    disabled={currentPage === 1}
                    className={styles.pageButton}
                >
                    {'<<'}
                </button>
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={styles.pageButton}
                >
                    {'<'}
                </button>
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => goToPage(number)}
                        className={`${styles.pageButton} ${
                            currentPage === number ? styles.activePage : ''
                        }`}
                    >
                        {number}
                    </button>
                ))}
                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={styles.pageButton}
                >
                    {'>'}
                </button>
                <button
                    onClick={() => goToPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className={styles.pageButton}
                >
                    {'>>'}
                </button>
            </div>
        </div>
    );
};

export default Tabulation;

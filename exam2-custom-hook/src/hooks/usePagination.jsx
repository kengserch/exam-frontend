import { useState, useEffect } from 'react';

const usePagination = (apiUrl, itemsPerPage = 5) => {
    const [allData, setAllData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                const result = await response.json();
                setAllData(result);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [apiUrl]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = allData.slice(startIndex, endIndex);

    const totalPages = Math.ceil(allData.length / itemsPerPage);

    const nextPage = () => setCurrentPage((prev) => prev + 1);
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return { data: currentData,currentPage, totalPages, nextPage, prevPage };
};

export default usePagination;

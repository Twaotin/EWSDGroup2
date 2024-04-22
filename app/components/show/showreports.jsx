"use client"
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { Pagination } from 'react-bootstrap';
import Editreport from '../../components/buttons/reportresolve';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Reports = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const ideasPerPage = 2;
  const { data: reports, error } = useSWR('http://localhost:3000/api/fetch/reports', fetcher, { refreshInterval: 500 });

  if (error) return <div>Error loading reports...</div>;
  if (!reports) return <div>Loading...</div>;

  const totalPages = Math.ceil(reports.length / ideasPerPage);

  const indexOfLastIdea = currentPage * ideasPerPage;
  const indexOfFirstIdea = indexOfLastIdea - ideasPerPage;
  const currentIdeas = reports.slice(indexOfFirstIdea, indexOfLastIdea);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {currentIdeas.map((report) => (
        <div key={report.reportid}>
          <button
            type="button"
            onClick={() => router.push(`/api/idea/${report.reportid}`)}
          >
            Comments
          </button>
          <h3>Report Subject: {report.reportsubject}</h3>
          <div>Body: {report.reporttext}</div>
          <div>Review Status: {report.reviewstatus}</div>
          <div>Review Date: {report.reportdate}</div>
          <div>Report submitted by: User ID {report.userid}</div>
          <div>
            <Editreport reportid={report.reportid} />
          </div>
        </div>
      ))}

      {/* React Bootstrap Pagination */}
      <Pagination>
        <Pagination.First onClick={() => paginate(1)} />
        <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index}
            onClick={() => paginate(index + 1)}
            active={index + 1 === currentPage}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => paginate(totalPages)} />
      </Pagination>
    </div>
  );
};

export default Reports;
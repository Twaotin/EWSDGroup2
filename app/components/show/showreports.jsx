"use client"
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link'
import Editreport from "../../components/buttons/reportresolve"
import { useRouter } from 'next/navigation'

const fetcher = (url) => fetch(url).then((res) => res.json());


const Reports = () => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1);
  const ideasPerPage = 2;
  const { data: reports, error } = useSWR('http://localhost:3000/api/fetch/reports', fetcher, { refreshInterval: 500 });
if (error) return <div>Error loading ideas...</div>;
  if (!reports) return <div>Loading...</div>;

  

  const indexOfLastIdea = currentPage * ideasPerPage;
  const indexOfFirstIdea = indexOfLastIdea - ideasPerPage;
  const currentIdeas = reports.slice(indexOfFirstIdea, indexOfLastIdea);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {currentIdeas.map((report) => (
        <div key={report.reportid}>
    <button type="button" onClick={() => router.push(`/api/idea/${idea.ideaid}`)}>
      Comments
    </button>
          <h3>Report Subject: {report.reportsubject}</h3>
          <div> Body: {report.reporttext}</div>
          <div>Review Status: {report.reviewstatus}</div>
           <div>Review Date: {report.reportdate}</div>
           <div>Report submitted by: Userid{report.userid}</div>
           <div> <Editreport reportid={report.reportid} /> </div>
        </div>
      ))}
      {/* Pagination */}
      <ul className="pagination">
        {Array.from({ length: Math.ceil(reports.length / ideasPerPage) }, (_, index) => (
          <li key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;
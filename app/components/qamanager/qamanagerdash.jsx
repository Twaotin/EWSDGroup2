'use client'
import { useState } from 'react';
import React from 'react'
import useSWR from 'swr';
import Table from 'react-bootstrap/Table';
import Deletdate from "../buttons/deletedate"
import { useRouter } from 'next/navigation'
import Deletcatergory from "../buttons/deletecatergory"


export default function Qamanager() {
const router = useRouter()
     const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data: categories, error : categoriesError } = useSWR('http://localhost:3000/api/fetch/category', fetcher, { refreshInterval: 5000 });

    if (categoriesError) return <div>Error loading data</div>;
       if (!categories) return <div>Loading...</div>;
  return (
     <>

    <div className="categories-table ">
        <h2>Catergories table</h2>
     <Table responsive variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Categorie Name</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
          {categories.map((categorie) => (
            <tr key={categorie.categoryid}>
               <td>{categorie.categoryid}</td>
              <td>{categorie.categoryname}</td>
               <td>
        <button type="button" onClick={() => router.push(`/qamanager/addcategories`)}>
      Add Category
    </button> </td>
    <td><Deletcatergory categoryid={categorie.categoryid} /></td>
            </tr>
          ))}
      </tbody>
    </Table>
     </div>
     </>
  )
}

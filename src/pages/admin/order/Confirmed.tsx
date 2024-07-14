import React, { useState } from 'react'

interface Order {
  id: number;
  name: string;
  price: number;
  createdAt: string;
  status?: "WAITING" | "CONFIRMED" | "DELIVERED" | "SUCCESS" | "CANCEL";
  createDate: string;
  note?: string;
  receiveAddress: string;
  receiveDate: string;
  receiveName: string;
  receivePhone: string;
  serialNumber: string;
  totalPrices: number;
  user_id: number;
}
export default function Confirmed() {
    const [odrer, setOdrert] = useState<Order[]>([
      {
        id: 2,
        name: "2",
        price: 1000,
        createdAt: "2021-09-01",
        createDate: "2021-09-01",
        note: "note",
        receiveAddress: "address",
        receiveDate: "2021-09-01",
        receiveName: "name",
        receivePhone: "phone",
        serialNumber: "serial",
        totalPrices: 1000,
        status: "CONFIRMED",
        user_id: 2,
      },
    ]);
    const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = odrer.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(odrer.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }
   return (
     <>
       <table>
         <thead>
           <tr>
             <th>ID</th>
             <th>Name</th>
             <th>Phone</th>
             <th>Address</th>
             <th>Total</th>
             <th> Shipping Address</th>
             <th>Payment Method</th>
             <th>Order Status</th>
             <th>Created At</th>
             <th>Action</th>
           </tr>
         </thead>
         <tbody>
           {currentItems.map((product) => (
             <tr key={product.id}>
               <td>{product.id}</td>
               <td>{product.name}</td>
               <td>{product.receivePhone}</td>
               <td>{product.receiveAddress}</td>
               <td>{product.totalPrices}</td>
               <td>{product.receiveAddress}</td>
               <td>{product.receiveAddress}</td>
               <td>{product.createdAt}</td>
               <td>{product.status}</td>
               <td>
                 <button className="edit-btn">Edit</button>
                 <button className="delete-btn">Delete</button>
               </td>
             </tr>
           ))}
         </tbody>
       </table>

       <div className="pagination">
         <button
           onClick={() => handlePageChange(currentPage - 1)}
           disabled={currentPage === 1}
         >
           Previous
         </button>
         {Array.from({ length: totalPages }, (_, i) => (
           <button
             key={i + 1}
             onClick={() => handlePageChange(i + 1)}
             className={currentPage === i + 1 ? "active" : ""}
           >
             {i + 1}
           </button>
         ))}
         <button
           onClick={() => handlePageChange(currentPage + 1)}
           disabled={currentPage === totalPages}
         >
           Next
         </button>
       </div>
     </>
   );
}

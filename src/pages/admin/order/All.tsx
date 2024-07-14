import React, { useState } from "react";
import { useTranslation } from "react-i18next";

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
export default function All() {
  const [odrer, setOdrert] = useState<Order[]>([
    {
      id: 1,
      name: "1",
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
      status: "WAITING",
      user_id: 1,
    },
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
    {
      id: 3,
      name: "3",
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
      status: "DELIVERED",
      user_id: 3,
    },
    {
      id: 4,
      name: "4",
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
      status: "SUCCESS",
      user_id: 4,
    },
    {
      id: 5,
      name: "5",
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
      status: "CANCEL",
      user_id: 5,
    },
    // Thêm các danh mục khác vào đây
  ]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = odrer.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(odrer.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  //translate
  const { t } = useTranslation();
  return (
    <>
      <div className="OderAdmin">
        <table>
          <thead>
            <tr>
              <th>{t("idOrder")}</th>
              <th>{t("nameOrder")}</th>
              <th>{t("phoneOrder")}</th>
              <th>{t("addressOrder")}</th>
              <th>{t("totalOrder")}</th>
              <th> {t("shippingAddressOrder")}</th>
              <th>{t("paymentMethod")}</th>
              <th>{t("statusOrder")}</th>
              <th>{t("createDateOrder")}</th>
              <th>{t("actionOrder")}</th>
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
                  <button className="edit-btn">{t("edit")}</button>
                  <button className="delete-btn">{t("delete")}</button>
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
      </div>
    </>
  );
}

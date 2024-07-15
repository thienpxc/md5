import React, { useEffect, useState } from "react";

import "./user-manager.scss";
import { Role, User } from "@/stores/slices/user.slices";
import { useTranslation } from "react-i18next";
import apis from "@/apis";
import { Table } from "react-bootstrap";

import { useSelector } from "react-redux";
import { StoreType } from "@/stores";
import { debounce } from "lodash";
import { Pagination } from "@mui/material";
interface Permission {
  read: boolean;
  create: boolean;
  delete: boolean;
  update: boolean;
}

interface PermissionItem {
  title: string;
  read: boolean;
  create: boolean;
  delete: boolean;
  update: boolean;
}

const ProductAdmin: React.FC = () => {
  const userStore = useSelector((store: StoreType) => store.userStore);

  const [permission, setPermission] = React.useState<Permission>({
    read: false,
    create: false,
    delete: false,
    update: false,
  });

  useEffect(() => {
    setPermission({
      ...permission,
      read:
        userStore.data?.permission?.includes("user.r") ||
        userStore.data?.permission?.includes("user.*") ||
        false,
      create:
        userStore.data?.permission?.includes("user.c") ||
        userStore.data?.permission?.includes("user.*") ||
        false,
      delete:
        userStore.data?.permission?.includes("user.d") ||
        userStore.data?.permission?.includes("user.*") ||
        false,
      update:
        userStore.data?.permission?.includes("user.u") ||
        userStore.data?.permission?.includes("user.*") ||
        false,
    });
  }, []);

  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    apis.user.getAllUser().then((res) => {
      if (res.status == 200) {
        setUsers(res.data);
        console.log("tat ca user", res.data);
      }
    });
  }, []);
  const [selectUser, setSelectUser] = useState<User | null>(null);
  const [perItemList, setPerItemList] = useState<PermissionItem[]>([]);

  useEffect(() => {
    if (selectUser) {
      const tables = ["category", "user"];
      const result: PermissionItem[] = [];
      for (const i in tables) {
        const perItem: PermissionItem = {
          title: tables[i],
          read:
            selectUser.permission?.includes(`${tables[i]}.r`) ||
            selectUser.permission?.includes(`${tables[i]}.*`) ||
            false,
          create:
            selectUser.permission?.includes(`${tables[i]}.c`) ||
            selectUser.permission?.includes(`${tables[i]}.*`) ||
            false,
          delete:
            selectUser.permission?.includes(`${tables[i]}.d`) ||
            selectUser.permission?.includes(`${tables[i]}.*`) ||
            false,
          update:
            selectUser.permission?.includes(`${tables[i]}.u`) ||
            selectUser.permission?.includes(`${tables[i]}.*`) ||
            false,
        };
        result.push(perItem);
      }
      setPerItemList(result);
    }
  }, [selectUser]);

  const { t } = useTranslation();

  function updatePer(type: string, index: number, user: User) {
    const data = perItemList.slice().map((item, i) => {
      if (i == index) {
        const cloneObj = {
          ...item,
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (cloneObj as any)[`${type}`] = !(cloneObj as any)[`${type}`];
        return cloneObj;
      }
      return item;
    });

    let perTemp = ``;
    for (const i in data) {
      if (data[i].create) {
        perTemp += `${data[i].title}.c,`;
      }
      if (data[i].read) {
        perTemp += `${data[i].title}.r,`;
      }
      if (data[i].update) {
        perTemp += `${data[i].title}.u,`;
      }
      if (data[i].delete) {
        perTemp += `${data[i].title}.d,`;
      }
    }

    apis.user
      .update({
        ...user,
        permission: perTemp,
      })
      .then((res) => {
        console.log(res);
        setPerItemList(data);
      });
  }

  // // Pagination
  // const [currentPage, setCurrentPage] = useState(1);
  // const [currentPageData, setCurrentPageData] = useState([]);
  // const limit = 3;

  // useEffect(() => {
  //   const offset = (currentPage - 1) * limit;
  //   apis.product.paginationProduct(offset, limit).then((response) => {
  //     console.log("Category data:", response.data);
  //     const newData = users.slice(offset, offset + limit) ?? [];
  //     setCurrentPageData(newData);
  //   });
  // }, [currentPage, productStore.data]);

  // const totalPage = Math.ceil((users.length ?? 0) / limit);
  // const handlePageChange = (event: any, page: React.SetStateAction<number>) => {
  //   setCurrentPage(page);
  // };

  // //search category (su dung debounce cua lodash)
  // const [search, setSearch] = useState("");
  // const [searchResult, setSearchResult] = useState([]);
  // // Kiểm tra xem có kết quả tìm kiếm không, nếu có thì hiển thị kết quả tìm kiếm, nếu không thì hiển thị dữ liệu trang hiện tại
  // const dataToShow = searchResult.length > 0 ? searchResult : currentPageData;

  // const performSearch = () => {
  //   debouncedSearch(search);
  // };

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearch(event.target.value);
  // };

  // const debouncedSearch = debounce((value: string) => {
  //   console.log("Debounced search called with value:", value);
  //   if (value === "") {
  //     setSearchResult([]);
  //   } else {
  //     apis.user
  //       .searchUser(value)
  //       .then((response) => {
  //         console.log("Search API response:", response);
  //         setSearchResult(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error searching category:", error);
  //       });
  //   }
  // }, 300);

  // useEffect(() => {
  //   return () => {
  //     debouncedSearch.cancel();
  //   };
  // }, [debouncedSearch]);

  return (
    <>
      {/* <div className="search-bar">
        <h1>{t("category")}</h1>
        <div>
          <input
            type="text"
            placeholder="Search for category"
            value={search}
            onChange={handleInputChange}
          />
          <button
            onClick={performSearch}
            style={{
              marginLeft: "10px",
              padding: "5px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              height: "40px",
            }}
          >
            Tìm kiếm
          </button>
        </div>
      </div> */}
      {selectUser && (
        <div className="per_box">
          <div className="per_content">
            <button
              onClick={() => {
                setSelectUser(null);
              }}
              className="btn_close btn btn-danger"
            >
              X
            </button>
            <Table>
              <thead>
                <tr>
                  <th>* {selectUser.userName}</th>
                  <th>Create</th>
                  <th>Read</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {perItemList.map((perItem, index) => {
                  return (
                    <tr key={Date.now() * Math.random()}>
                      <td>{perItem.title}</td>
                      <td>
                        <input
                          onChange={() => {
                            updatePer("create", index, selectUser);
                          }}
                          type="checkbox"
                          defaultChecked={perItem.create}
                        />
                      </td>
                      <td>
                        <input
                          onChange={() => {
                            updatePer("read", index, selectUser);
                          }}
                          type="checkbox"
                          defaultChecked={perItem.read}
                        />
                      </td>
                      <td>
                        <input
                          onChange={() => {
                            updatePer("update", index, selectUser);
                          }}
                          type="checkbox"
                          defaultChecked={perItem.update}
                        />
                      </td>
                      <td>
                        <input
                          onChange={() => {
                            updatePer("delete", index, selectUser);
                          }}
                          type="checkbox"
                          defaultChecked={perItem.delete}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      )}
      {permission.read && (
        <div className="user_manager_box">
          {/* View */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>UserName</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Avatar</th>
                <th>Role</th>
                <th>Status</th>
                <th>isVerified</th>
                <th>createAt</th>
                <th>updateAt</th>
                <th>Permisson</th>
                <th>tools</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index}</td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <img
                      src={user.avatarUrl}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  </td>
                  <td>
                    <select
                      onChange={(e) => {
                        apis.user
                          .update({
                            ...user,
                            role: e.target.value as Role,
                          })
                          .then((res) => {
                            setUsers(
                              users.map((item) => {
                                if (item.id == user.id) {
                                  return res.data;
                                }
                                return item;
                              })
                            );
                          });
                      }}
                      defaultValue={user.role}
                    >
                      <option value={Role.ADMIN}>admin</option>
                      <option value={Role.USER}>user</option>
                    </select>
                  </td>
                  <td>{user.status ? "hoạt động" : "cấm"}</td>
                  <td>
                    {user.isVerified
                      ? "đã xác thực mail"
                      : "chưa xác thực mail"}
                  </td>
                  <td>{`${new Date(Number(user.createAt)).getDate()} - ${
                    new Date(Number(user.createAt)).getMonth() + 1
                  } - ${new Date(Number(user.createAt)).getFullYear()}`}</td>
                  <td>{user.updateAt}</td>
                  <td>
                    <button
                      onClick={() => {
                        setSelectUser(user);
                      }}
                    >
                      Manager
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        const updateDate = {
                          ...user,
                          status: !user.status,
                        };

                        apis.user
                          .update(updateDate)
                          .then((res) => {
                            setUsers(
                              users.map((item) => {
                                if (item.id == user.id) {
                                  return res.data;
                                }
                                return item;
                              })
                            );
                          })
                          .catch((err) => {
                            console.log("err", err);
                          });
                      }}
                      className={`btn btn-${
                        user.status ? "danger" : "success"
                      }`}
                    >
                      {user.status ? "block" : "unlock"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      {/* <Pagination
        count={totalPage} // Use the calculated total pages
        page={currentPage} // Current page
        onChange={handlePageChange} // Handle page change
        shape="rounded"
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      /> */}
    </>
  );
};

export default ProductAdmin;

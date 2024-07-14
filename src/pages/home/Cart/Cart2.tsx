import apis from '@/apis'
import { StoreType } from '@/stores'
import { orderActions } from '@/stores/slices/order.slice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';


export default function Cart2() {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const orderStore = useSelector((store: StoreType) => store.orderStore)
    console.log(orderStore.cart)
    return (
      <div>
        <h1>Your Cart</h1>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>Image</th>
              <th>quantity</th>
              <th>price</th>
              <th>total</th>
            </tr>
          </thead>
          <tbody>
            {orderStore.cart?.details && orderStore.cart.details.length > 0 ? (
              orderStore.cart.details.map((detail, index) => (
                <tr key={detail.id}>
                  <td>{index + 1}</td>
                  <td>{detail.productmodel.name}</td>
                  <td>
                    {detail.productmodel.productImg &&
                      detail.productmodel.productImg.length > 0 && (
                        <img
                          src={detail.productmodel.productImg[0].images}
                          alt=""
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                      )}
                  </td>
                  <td>{detail.quantity}</td>
                  <td>{detail.productmodel.price.toLocaleString()}đ</td>
                  <td>{detail.quantity * detail.productmodel.price}đ</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>Không có sản phẩm nào trong giỏ hàng</td>
              </tr>
            )}
          </tbody>
        </table>
        <h3> Tổng : {orderStore.cart?.totalPrices.toLocaleString()} đ</h3>
        {/* <button
          onClick={() => {
            if (orderStore.cart) {
              apis.order.checkOut(orderStore.cart.id).then((res) => {
                console.log(res);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                dispatch(orderActions.loadDataThunk() as any);
              });
            }
          }}
        >
          Check out
        </button> */}
        <button
          onClick={() => {
            navigate("/checkout");
          }}
        >
          Check out
        </button>
      </div>
    );
}

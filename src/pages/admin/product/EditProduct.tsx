import apis from "@/apis";
import React, { useEffect, useRef, useState } from "react";

import "./product.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "@/stores/slices/product.slices";
import { fireBaseFn } from "@/firebase";

export default function EditProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const quantityInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  // Khởi tạo state cho thông tin sản phẩm

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  useEffect(() => {
    apis.product.getProductById(productId).then((res) => {
      setProduct(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);
 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();

   // Xử lý ảnh cũ
   const oldImages =
     product?.productImg.map((img) => ({
       id: img.id,
       imageUrl: img.images,
     })) ?? [];

  
   

   // Xử lý ảnh mới
   const newImageUploads = await Promise.all(
     Array.from((e.target as any).images.files).map(
       async (file: File, index) => {
         const imageUrl = await fireBaseFn.uploadToStorage(file);
         return {
           id: index + 1,
           imageUrl,
         };
       }
     )
   );

   // Kết hợp ảnh cũ và mới
   const allImages = [...oldImages, ...newImageUploads];

   const formData = {
     product: {
      id: product?.id,
       name: nameInputRef.current?.value,
       price: priceInputRef.current?.value,
       quantity: quantityInputRef.current?.value,
       description: descriptionInputRef.current?.value,
       categoryId: product?.categoryId, // Thêm categoryId nếu cần
     },
     images: allImages,
   };

   console.log(formData);
   apis.product.updateProduct(formData).then((res) => {
     console.log(res);
     navigate(-1);
   });
 };

  const handleDeleteImage = (imageId: string) => {
    apis.product.deleteImage(imageId).then((res) => {
      console.log("hellooo",res);
      // Cập nhật trạng thái để phản ánh việc hình ảnh đã được xóa
      const updatedImages = product?.productImg.filter(
        (img) => img.id !== imageId
      );
      setProduct({ ...product, productImg: updatedImages });
    });
  };

  return (
    <>
      <div id="fui-toast"></div>
      <div className="modal-product">
        <form onSubmit={handleSubmit}>
          <h2>Edit Product</h2>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            ref={nameInputRef}
            defaultValue={product?.name}
            required
          />
          <label htmlFor="price">price:</label>
          <input
            type="number"
            id="price"
            name="price"
            ref={priceInputRef}
            defaultValue={product?.price}
          />
          <label htmlFor="price">quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            ref={quantityInputRef}
            defaultValue={product?.quantity}
          />
          <h4>Hình ảnh sản phẩm</h4>
          <div className="images-container">
            {product?.productImg.map((img, index) => (
              <div key={img.id} className="imgEdits">
                <button
                  className="delete-btns"
                  onClick={() => handleDeleteImage(img.id)}
                >
                  X
                </button>
                <img src={img.images} alt={`Hình ảnh sản phẩm ${index + 1}`} />
              </div>
            ))}
          </div>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageChange}
            multiple
          />
          <div>
            {previewUrls.map((url, index) => (
              <img
                className="image-preview"
                key={Date.now() + Math.random()}
                src={url}
                alt={`Preview ${index + 1}`}
              />
            ))}
          </div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols={30}
            rows={10}
            ref={descriptionInputRef}
            defaultValue={product?.description}
          ></textarea>
          <label htmlFor="category">Category:</label>
          <input
            id="category"
            name="category"
            value={product?.categoryId.name}
            disabled
          ></input>
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            Close
          </button>
          <button type="submit" className="btn btn-primary">
            SAVE
          </button>
        </form>
      </div>
    </>
  );
}

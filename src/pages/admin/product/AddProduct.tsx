/* eslint-disable @typescript-eslint/no-explicit-any */
// import apis from "@/apis";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { fireBaseFn } from "@/firebase";
import "./product.scss";

import apis from "@/apis";
import { Category } from "@/stores/slices/category.slices";

import { showToast } from "@/util/toast";

import { productActions } from "@/stores/slices/product.slices";
import { useAppDispatch } from "@/stores";


export default function AddProduct() {
const dispatch = useAppDispatch();
  const navigate = useNavigate();
const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
 

  useEffect(() => {
    apis.category.findAllCategories()
      .then((res) => {
        setCategories(res.data);
        
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
      });
  }, []);
 
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   
    const formData = {
      product: {
        name: (e.target as any).name.value,
        price: (e.target as any).price.value,
        quantity: (e.target as any).quantity.value,
        description: (e.target as any).description.value,
        categoryId: (e.target as any).category.value,
      },
      images: (
        await Promise.all(
          Array.from((e.target as any).images.files).map((file) =>
            fireBaseFn.uploadToStorage(file as File)
          )
        )
      ).map((imageUrl, index) => ({
        id: index + 1,
        imageUrl: imageUrl,
      })),
    };
    
    console.log(formData);
   dispatch(productActions.addProductThunk(formData))
     .then(() => {
       showToast.success("Add product success");
       setTimeout(() => {
         navigate(-1);
       }, 1000);
     })
     .catch((error) => {
       console.error("Failed to add product:", error);
     });
  };

  
  
  return (
    <>
      <div id="fui-toast"></div>
      <div className="modal-product">
        <form onSubmit={handleSubmit}>
          <h2>Add Product</h2>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
          <label htmlFor="price">price:</label>
          <input type="number" id="price" name="price" />
          <label htmlFor="price">quantity:</label>
          <input type="number" id="quantity" name="quantity" />

          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleImageChange}
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
          ></textarea>
          <label htmlFor="category">Category:</label>
          <select id="category" name="category" required>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            Close
          </button>
          <button type="submit" className="btn btn-primary">
            ADD
          </button>
        </form>
        
      </div>
    </>
  );
}

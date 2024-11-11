import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/common/loading";
import { createProduct } from "@/rtk/admin-slice/product/product-thunnk";
const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.prod);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("salePrice", data.sellprice);
    formData.append("brand", data.brand);
    formData.append("totalStock", data.quantity);
    formData.append("discount", data.discount);
    formData.append("image", data.image[0]);

    dispatch(createProduct({ data: formData }))
      .unwrap()
      .then(() => {
        navigate("/admin/dashboard");
      })
      .catch(() => {
        navigate("#");
      });
  };
  return (
    <Sheet>
      <div className="w-full flex justify-end">
        <SheetTrigger className="w-fit rounded-md dark:bg-white dark:text-black bg-black h-8 p-1 hover:bg-opacity-80 text-white items-center flex text-sm gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M11.5 8.5v-3h-3v-1h3v-3h1v3h3v1h-3v3zM7.308 21.116q-.633 0-1.067-.434t-.433-1.066t.433-1.067q.434-.433 1.067-.433t1.066.433t.434 1.067t-.434 1.066t-1.066.434m9.384 0q-.632 0-1.066-.434t-.434-1.066t.434-1.067q.434-.433 1.066-.433t1.067.433q.433.434.433 1.067q0 .632-.433 1.066q-.434.434-1.067.434M2 3.5v-1h2.448l4.096 8.616h6.635q.173 0 .308-.087q.134-.087.23-.24L19.213 4.5h1.14l-3.784 6.835q-.217.365-.565.573t-.762.208H8.1l-1.215 2.23q-.154.231-.01.5t.433.27h10.884v1H7.308q-.875 0-1.309-.735t-.018-1.485l1.504-2.68L3.808 3.5z"
            />
          </svg>
          <span> Add product</span>
        </SheetTrigger>
      </div>
      <SheetContent className="lg:w-[600px] w-[375px] bg-light-theme overflow-y-auto scrollbar scrollbar-thin h-[100dvh]">
        <SheetHeader>
          <SheetTitle>Create Product</SheetTitle>
          <SheetDescription>
            Bringing your vision to life through products that combine quality,
            creativity, and purpose.
          </SheetDescription>
          <form
            className="flex flex-col md:gap-4 gap-6 md:justify-normal justify-between "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Label htmlFor="title">Product Name</Label>
              <Input
                type="text"
                id="title"
                placeholder="Product Name"
                className="w-full mt-0.5 h-8"
                {...register("title", {
                  required: "Product name is required",
                })}
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                type="text"
                id="description"
                placeholder="Description"
                className="w-ful mt-0.5 h-8"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                type="text"
                id="price"
                placeholder="Price"
                className="w-full mt-0.5 h-8"
                {...register("price", {
                  required: "Price is required",
                })}
              />
              {errors.price && (
                <span className="text-red-500 text-sm">
                  {errors.price.message}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="sellprice">Sell price</Label>
              <Input
                type="text"
                id="sellprice"
                placeholder="Price"
                className="w-full mt-0.5 h-8"
                {...register("sellprice", {
                  required: "Price is required",
                })}
              />
              {errors.sellprice && (
                <span className="text-red-500 text-sm">
                  {errors.sellprice.message}
                </span>
              )}
            </div>
            {/* Category Dropdown */}
            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                className="w-full mt-0.5 h-8 bg-inherit border border-black rounded-md"
                {...register("category", {
                  required: "Category is required",
                })}
              >
                <option value="" className="hover:bg-gray-300">
                  Select Category
                </option>
                <option value="men" className="hover:bg-gray-300">
                  Men
                </option>
                <option value="women" className="hover:bg-gray-300">
                  Women
                </option>
                <option value="kids" className="hover:bg-gray-300">
                  Kids
                </option>
                <option value="accessories" className="hover:bg-gray-300">
                  Accessories
                </option>
                <option value="footware" className="hover:bg-gray-300">
                  Footwear
                </option>
                <option value="shoes" className="hover:bg-gray-300">
                  Shoes
                </option>
              </select>
              {errors.category && (
                <span className="text-red-500 text-sm">
                  {errors.category.message}
                </span>
              )}
            </div>

            {/* Brand Dropdown */}
            <div>
              <Label htmlFor="brand">Brand</Label>
              <select
                id="brand"
                className="w-full mt-0.5 h-8 bg-inherit border border-black rounded-md"
                {...register("brand", {
                  required: "Brand is required",
                })}
              >
                <option value="" className="hover:bg-gray-300">
                  Select Brand
                </option>
                <option value="nike" className="hover:bg-gray-300">
                  Nike
                </option>
                <option value="adidas" className="hover:bg-gray-300">
                  Adidad
                </option>
                <option value="puma" className="hover:bg-gray-300">
                  Puma
                </option>
                <option value="goldstar" className="hover:bg-gray-300">
                  Goldstar
                </option>
                <option value="caliber" className="hover:bg-gray-300">
                  Caliber
                </option>
                <option value="erek" className="hover:bg-gray-300">
                  Erek
                </option>
              </select>
              {errors.brand && (
                <span className="text-red-500 text-sm">
                  {errors.brand.message}
                </span>
              )}
            </div>

            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                type="text"
                id="quantity"
                placeholder="Quantity"
                className="w-full mt-0.5 h-8"
                {...register("quantity", {
                  required: "Quantity is required",
                })}
              />
              {errors.quantity && (
                <span className="text-red-500 text-sm">
                  {errors.quantity.message}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="image">Product image</Label>
              <Input
                type="file"
                id="image"
                className="w-full mt-0.5 h-8"
                accept="image/*"
                multiple
                {...register("image", {
                  required: "Product image is required",
                })}
              />
              {errors.image && (
                <span className="text-red-500 text-sm">
                  {errors.image.message}
                </span>
              )}
            </div>
            <Button
              type="submit"
              className="w-full flex justify-center py-6 px-4   shadow-sm text-base font-medium bg-dark-theme text-white rounded-lg hover:bg-dark-theme"
              disabled={loading}
            >
              {loading ? <Loading width={25} height={25} /> : "Add product"}
            </Button>
          </form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default AddProduct;

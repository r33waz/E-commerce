
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import Loading from "../common/loading";
import {
  eiditProduct,
  getAllProducts,
} from "@/rtk/admin-slice/product/product-thunnk";
const EiditProduct = ({ products }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.prod);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: products?.title,
      description: products?.description,
      category: products?.category,
      price: products?.price,
      sellprice: products?.salePrice,
      brand: products?.brand,
      quantity: products?.totalStock,
      discount: products?.discount,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    const productId = products._id;

    // Append other fields
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("salePrice", data.sellprice);
    formData.append("brand", data.brand);
    formData.append("totalStock", data.quantity);
    formData.append("discount", data.discount);
    formData.append("image", data.image[0]);

    dispatch(eiditProduct({ id: productId, data: formData }))
      .unwrap()
      .then(() => {
        navigate("/admin/products");
        dispatch(getAllProducts());
      })
      .catch(() => {});
  };

  return (
    <Sheet className="h-[100dvh]">
      <div className="w-full flex justify-end">
        <SheetTrigger className="w-full">
          <Button className="w-full dark:bg-white dark:text-black bg-black h-8 p-1 hover:bg-opacity-80 text-white">
            Eidit
          </Button>
        </SheetTrigger>
      </div>
      <SheetContent className="lg:w-[600px] w-[375px] bg-light-theme overflow-y-auto scrollbar scrollbar-thin h-[100dvh]">
        <SheetHeader>
          <SheetTitle>Eidit Product</SheetTitle>
          <SheetDescription>
            Make changes to your product here. Click save when you're done.
          </SheetDescription>
          <form
            className="flex flex-col pt-2 md:gap-4 gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Label htmlFor="title">Product Name</Label>
              <Input
                type="text"
                id="title"
                placeholder="Product Name"
                className="w-full mt-0.5 h-8"
                defaultValues={products?.title}
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
                rows={4}
                defaultValues={products?.description}
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
                defaultValues={products?.price}
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
                defaultValues={products?.salePrice}
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
                placeholder="Category"
                className="w-full mt-0.5 h-8 bg-inherit border border-black rounded-md"
                {...register("category", {
                  required: "Category is required",
                })}
              >
                <option
                  value={products?.category}
                  className="hover:bg-gray-300"
                >
                  {products?.category}
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
                <option value={products?.brand} className="hover:bg-gray-300">
                  {products?.brand}
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
                defaultValues={products?.totalStock}
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
                {...register("image")}
              />
            </div>
            <Button
              type="submit"
              className="w-full flex justify-center py-6 px-4   shadow-sm text-base font-medium bg-dark-theme text-white rounded-lg hover:bg-dark-theme"
              disabled={loading}
            >
              {loading ? <Loading width={25} height={25} /> : "Eidit Product"}
            </Button>
          </form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
export default EiditProduct;

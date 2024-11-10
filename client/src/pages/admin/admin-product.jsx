import EiditProduct from "@/components/admin-comp/admin-eiditProduct";
import Loading from "@/components/common/loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  deleteProduct,
  getAllProducts,
} from "@/rtk/admin-slice/product/product-thunnk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddProduct from "@/components/admin-comp/add-product";

const AdminProduct = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.prod);
  console.log(products);
  useEffect(() => {
    dispatch(getAllProducts());
  }, dispatch);

  const handleDelete = (id) => {
    dispatch(deleteProduct({ id }))
      .unwrap()
      .then(() => {
        dispatch(getAllProducts());
      });
  };

  return (
    <div>
      <AddProduct />
      {loading ? (
        <Loading
          width={100}
          height={100}
          className="flex justify-center items-center h-dvh w-full"
        />
      ) : (
        <div className="grid md:grid-cols-4 grid-cols-1 gap-1 pt-4">
          {products.map((product, idx) => (
            <Card className="w-full pb-2" key={idx}>
              <CardHeader>
                <div className=" relative overflow-hidden rounded-t-lg">
                  <img
                    src={product?.image[0]?.url}
                    alt={product?.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 ease-in-out hover:scale-105 h-60 w-full"
                  />
                </div>
              </CardHeader>
              <CardContent className="px-2">
                <CardTitle className="text-lg mb-1 mt-1">
                  {product?.title.length > 30
                    ? product?.title.slice(0, 30) + "..."
                    : product?.title}
                </CardTitle>
                <CardDescription className="text-sm ">
                  {product.description?.length > 30
                    ? product.description.slice(0, 30) + "..."
                    : product.description}
                </CardDescription>
                <div className="flex w-full justify-between pt-1">
                  <p className="text-sm  font-medium ">
                    Brand : <span className="text-sm ">{product?.brand}</span>
                  </p>
                  <p className="text-sm  font-medium ">
                    Qty :{" "}
                    <span className="text-sm ">{product?.totalStock}</span>
                  </p>
                </div>
                <div className="flex justify-between w-full items-center text-sm pt-2 ">
                  <p className="flex flex-col gap-1">
                    Price<span>Rs:-{product?.price}</span>
                  </p>
                  <p className="flex flex-col gap-1">
                    Sale Price<span>Rs:-{product?.salePrice}</span>
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between px-1.5 gap-1 mt-2">
                <EiditProduct />
                <Button
                  className="w-full dark:bg-white dark:text-black bg-black h-8 p-1 hover:bg-opacity-80 text-white"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProduct;

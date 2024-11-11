import ProductData from "@/components/admin-comp/product-data";
import UserData from "@/components/admin-comp/user-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const AdminDashboard = () => {

  return (
    <>
      <Tabs defaultValue="user" className="w-full">
        <TabsList className="w-full bg-gray-300 dark:bg-gray-600 h-10 px-2">
          <TabsTrigger
            value="user"
            className="w-full dark:data-[state=active]:bg-gray-500 data-[state=active]:bg-dark-theme data-[state=active]:text-white dark:text-white text-black"
          >
            User Data
          </TabsTrigger>
          <TabsTrigger
            value="product"
            className="w-full dark:data-[state=active]:bg-gray-500 data-[state=active]:bg-dark-theme data-[state=active]:text-white dark:text-white text-black"
          >
            Product Data
          </TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <UserData />
        </TabsContent>
        <TabsContent value="product">
          <ProductData/>
        </TabsContent>
      </Tabs>
     
    </>
  );
};

export default AdminDashboard;

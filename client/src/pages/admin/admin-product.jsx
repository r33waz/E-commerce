import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const AdminProduct = () => {
  return (
    <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px] bg-light-theme">
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
    </Sheet>
  );
};

export default AdminProduct;

import cloudinary from "../../config/cloudinary.config.js";
import Product from "../../model/product.model.js";
import stream from "stream";

export const createProduct = async (req, res) => {
  const { title, description, category, brand, price, salePrice, totalStock } =
    req.body;
  console.log("req.files", req.files);
  console.log(
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock
  );
  try {
    if (!title) {
      return res.status(400).json({
        status: false,
        message: "Title is required",
      });
    }

    if (!description) {
      return res.status(400).json({
        status: false,
        message: "Description is required",
      });
    }

    if (!category) {
      return res.status(400).json({
        status: false,
        message: "Category is required",
      });
    }

    if (!brand) {
      return res.status(400).json({
        status: false,
        message: "Brand is required",
      });
    }

    if (!price) {
      return res.status(400).json({
        status: false,
        message: "Price is required",
      });
    }

    if (!salePrice) {
      return res.status(400).json({
        status: false,
        message: "Sale price is required",
      });
    }

    if (!totalStock) {
      return res.status(400).json({
        status: false,
        message: "Total stock is required",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Image is required",
      });
    }

    // Array to store image upload results
    const imageUploads = [];

    // Loop through each file in req.files
    for (const file of req.files) {
      const bufferStream = new stream.PassThrough();
      bufferStream.end(file.buffer);

      // Use a promise to handle the async upload stream
      const result = await new Promise((resolve, reject) => {
        cloudinary.v2.uploader
          .upload_stream({ folder: "products" }, (error, result) => {
            if (error) return reject(error);
            resolve({ public_id: result.public_id, url: result.secure_url });
          })
          .end(file.buffer);
      });

      imageUploads.push(result);
    }

    // Create product with uploaded images
    const product = await Product.create({
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      image: imageUploads,
    });

    return res.status(201).json({
      status: true,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const getAdminProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(404).json({
        status: false,
        message: "Products not found",
      });
    }
    return res.status(200).json({
      status: true,
      data: products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

//eidit product

export const editProduct = async (req, res) => {
  const { id } = req.params;
  console.log("id",id)
  const { title, description, category, brand, price, salePrice, totalStock } =
    req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }

    if (!req.files || req.files.length === 0) {
      // Update product without changing the image
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { ...req.body, image: product?.image },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(400).json({
          status: false,
          message: "Failed to update product",
        });
      }

      return res.status(200).json({
        status: true,
        message: "Product updated successfully",
      });
    } else {
      // Destroy old images from Cloudinary
      if (product.image && product.image.length > 0) {
        for (const img of product.image) {
          await cloudinary.v2.uploader.destroy(img.public_id);
        }
      }

      // Upload new images to Cloudinary
      const imageUploads = [];
      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const bufferStream = new stream.PassThrough();
          bufferStream.end(file.buffer);

          cloudinary.v2.uploader
            .upload_stream({ folder: "products" }, (error, result) => {
              if (error) reject(error);
              else
                resolve({
                  public_id: result.public_id,
                  url: result.secure_url,
                });
            })
            .end(file.buffer);
        });

        imageUploads.push(result);
      }

      // Update product with new image and other fields
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          title,
          description,
          category,
          brand,
          price,
          salePrice,
          totalStock,
          image: imageUploads,
        },
        { new: true }
      );

      return res.status(200).json({
        status: true,
        message: "Product updated successfully",
      });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};



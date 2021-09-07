const { Product } = require("../models");

module.exports = {

    product_listController: async (req, res) => {
        const products = await Product.findAll();
        res.render("product_list", {products: products});
    },

    newProductController: (req, res) => {
        res.render("new_product");
    },

    // ADDING NEW PRODUCT
    uploadProductController: async (req, res) => {
        const {name, category, price, description, stock} = req.body;
        if(!name || !category || !price || !description || !stock){ //if no name or no category or no description or no..., redirect to same page(dont submit)
            return res.redirect('/products/new');
        }
        
            const nameExist = await Product.findOne({
                where: {
                  name: req.body.name
                }
              })
    
    
            if(nameExist) {
              // return res.status(400).send("Item already exists")
              return res.render("new_product", {message: "item already exists"});
            }
    
            const product = await Product.create({
                name,
                category,
                price,
                description,
                stock
            });
            console.log(req.body);
            res.redirect('/products');
    },

    // WHEN YOU CLICK ON EDIT
    editProductController: async (req, res) => {
        const id = req.params.id;
        const product = await Product.findAll({
          where: {
            id: id,
          },
        });
    
        console.log(product[0]);
    
        res.render("edit_product", { product: product[0] });
      },

    // AFTER EDIT
      updateProductController: async (req, res) => {
        const {id, name, category, price, description, stock} = req.body;
    
        const product = await Product.update(
            {id, name, category, price, description, stock} ,
          {
            where: {
              id: id,
            },
          }
        );
    
        res.redirect("/products");
      },

      //**** DELETE *********//

      // THIS IS FOR THE DELETE PAGE
      delete_viewProductController: async (req, res) => {
        const id = req.params.id;
        const product = await Product.findAll({
          where: {
            id: id,
          },
        });
    
        res.render("delete_product", { product: product[0] });
      },

      // THIS IS THE DELETE CONTROLLER
      deleteProductController: async (req, res) => {
        const {id} = req.body;
    
        const product = await Product.destroy(
          {
            where: {
              id: id,
            },
          }
        );
    
        res.redirect("/products");
      },

      sortProductController: async (req, res) => {
        const category = req.params.category;
        const product = await Product.findAll({
          where: {
            category: category,
          },
        });
    
        res.redirect("product_list", { product: product[0] });
      },

}
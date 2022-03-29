const router = require('express').Router();
const res = require('express/lib/response');
const { Category, Product } = require('../../models');


// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll()
    .then(productData=>res.json(productData))
    .catch(err=>{
      console.log(err);
      res.status(500).json(err);
    });
  // be sure to include its associated Products
  
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: { 
      id: req.params.id
    }
  })
    .then(productData=>res.json(productData))
    .catch(err => {
      console.log(err)
      res.status(500).json(err);
    })
    });
  // find one category by its `id` value
  // be sure to include its associated Products

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(productData=> res.json(productData))
    .catch(err=> {
      console.log(err);
      res.status(500).json(err);
    });
  // create a new category
});

router.put('/:id', (req, res) => {
    Category.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id
      }
  })
    .then(productData => {
      if(!productData[0]) {
      res.status(404).json({ message: 'No Category found with this ID'});
      return;
    }
    res.json(productData);
  // update a category by its `id` value
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: { 
      id: req.params.id
    }
  })
    .then(productData=>{
      if(!productData) {
        res.status(404).json({ message: 'No Category found with this ID'});
        return;
      }
      res.json(productData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  // delete a category by its `id` value
});

module.exports = router;

const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [
        {
          model: Product,
        }
      ]
    });
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
        },
      ],
    });
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id);
    await categoryData.update(req.body);
    if (!categoryData) {
      return res.status(404).json({ error: 'Category not found'});
    }
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id);
    if (!categoryData) {
      return res.status(404).json({ error: 'Category not found' });
      }
    await categoryData.destroy();
    res.status(200).json(categoryData);
    }
    catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();


const User = require("../models/user.js");

router.get('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);  
      // console.log(currentUser)
      res.render('foods/index.ejs', {
        foods: currentUser.pantry,
      });
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }
  });
  

router.get('/new', async (req, res) => {
    res.render('foods/new.ejs');
  });
  

router.post('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.pantry.push(req.body);
      await currentUser.save();

      res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });
  
  // controllers

router.get('/:foodId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const food = currentUser.pantry.id(req.params.foodId);
    console.log(food)
    // console.log(currentUser.pantry)
    res.render('foods/show.ejs', {
      foods: food,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

router.delete('/:foodId', async (req, res) => {
  try {
   const currentUser = await User.findById(req.session.user._id);
   const food= currentUser.pantry.id(req.params.foodId);
   await food.deleteOne();
   await currentUser.save();
   res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

router.get('/:foodId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const food = currentUser.pantry.id(req.params.foodId);
    res.render('foods/edit.ejs', {
      foods: food,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

router.put('/:foodId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const food = currentUser.pantry.id(req.params.foodId);
    food.set(req.body);
    await currentUser.save();
    
    res.redirect(
      `/users/${currentUser._id}/foods/${req.params.foodId}`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

  
module.exports = router;

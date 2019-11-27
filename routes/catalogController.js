var express= require('express');
var router = express.Router();
var utility=require('../models/itemUtil')
var profileController=require('./profileController')

var app = express();
router.get('/index',function(req,res){
  res.render('index')
})
router.get('/',function(req,res){
  res.render('index')
})

app.use('/myItems',profileController);

//app.use(require('../controls/ProfileController.js'))
//------------------------------------------#Categories page ---------------------------------------------------------
router.get('/categories',function(req,res)
{
  var categories=utility.getItems();
//console.log(categories,'this is app.js page data')
console.log(req.query.category,'is the req')
//console.log(req.query.length)
if(Object.keys(req.query).length!=0){
  //console.log('entered length as 0')
  catergory=req.query.category;
  var specificCategoryItems=utility.getSpecificCategoryItems(catergory);
  res.render('categories',{data:specificCategoryItems});
  console.log('----------------------------------------------')
  //console.log(specificCategoryItems,'is specific item list');
  console.log('----------------------------------------------')
  //console.log(categories);
}
  else{

  res.render('categories',{data:categories});
  }

});

//----------------------------------------#Item page ----------------------------------------------------------------------
router.get('/categories/item', function(req,res){
  var itemCode=req.query.itemCode;
  //console.log(itemCode)

  var allItems=utility.getItems();
  //console.log(allItems)
  var item=utility.getItem(itemCode);

   if(item=="error")
   {var categories=utility.getItems();
      res.render('categories',{data:categories})
   }
   else{
      res.render('item',{data:item});
   }


  /*console.log(item,'--------------------------------')
  if(itemCode.length===0){
    res.render('categories',{data:categories})
  }
  else if(item.length===0){
    res.render('categories','We cannot find the item you ar looking for')
  }
  else{
    res.render('item',{data:item});
  }*/
});


//----------------------------------------#contact page ----------------------------------------------------------------------
router.get('/contact',function(req,res){
  res.render('contact')
})
//----------------------------------------#myItems page ----------------------------------------------------------------------


//----------------------------------------#feedback page ----------------------------------------------------------------------

router.get('/feedback',function(req,res){
  res.render('feedback')
});
//----------------------------------------#about page ----------------------------------------------------------------------
router.get('/about',function(req,res){
  res.render('about')
});



//----------------------------------------# any random URL page ----------------------------------------------------------------------
router.get('/*',function(req,res){
  res.render('404')
});



module.exports=router;

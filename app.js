var express= require('express');

var app=express();

app.set('view engine','ejs');
app.use('/assets',express.static('assets'));
app.use('/public',express.static('public'))

var utility=require('./models/itemUtil.js')
//var catalogController=require('./routes/catalogController')
var profileController=require('./routes/profileController')
var session=require('express-session')
app.use(session({secret:"This is assignment 3",resave: false,saveUninitialized: true}));

//app.use('/',catalogController);

app.use('/',profileController);


app.listen(8080);
//------------------------------------------#index page ---------------------------------------------------------
app.get('/index',function(req,res){
  var Session_User=req.session.theUser;
  if(Session_User==undefined){
  res.render('index',{start:[]})
}
  else{
      res.render('index',{firstname:req.session.theUser.FirstName,start:[1]})
  }
})
app.get('/',function(req,res){
  var Session_User=req.session.theUser;
  if(Session_User==undefined){
  res.render('index',{start:[]})
}
  else{
      res.render('index',{start:[1],firstname:req.session.theUser.FirstNam,})
  }
})
//------------------------------------------#Categories page ---------------------------------------------------------
app.get('/categories',function(req,res)
{
  var categories=utility.getItems();
  var Session_User=req.session.theUser;
//console.log(categories,'this is app.js page data')
console.log(req.query.category,'is the req')
//console.log(req.query.length)
if(Object.keys(req.query).length!=0){
  //console.log('entered length as 0')
  catergory=req.query.category;
  var specificCategoryItems=utility.getSpecificCategoryItems(catergory);
  if(Session_User==undefined){
  res.render('categories',{data:specificCategoryItems,firstname:req.session.theUser.FirstName, start:[]});
}
else {
    res.render('categories',{data:specificCategoryItems, firstname:req.session.theUser.FirstName,start:[1]});
}
  console.log('----------------------------------------------')
  //console.log(specificCategoryItems,'is specific item list');
  console.log('----------------------------------------------')
  //console.log(categories);
}
  else{
if(Session_User==undefined){
  res.render('categories',{data:categories,start:[]});
}
else {
    res.render('categories',{data:categories, firstname:req.session.theUser.FirstName,start:[1]});
}
  }

});

//----------------------------------------#Item page ----------------------------------------------------------------------
app.get('/item', function(req,res){
  var itemCode=req.query.itemCode;
  var Session_User=req.session.theUser;
  //console.log(itemCode)
//var categories=utility.getItems();
  var allItems=utility.getItems();
  //console.log(allItems)
  var item=utility.getItem(itemCode);

   if(item=="error")
   {var categories=utility.getItems();
     console.log('hsahdsjgjahshj')
     if(Session_User==undefined){
      res.render('categories',{data:categories, start:[]})
    }
    else {
        res.render('categories',{data:categories, firstname:req.session.theUser.FirstName,start:[1]})
    }
   }
   else{
      if(Session_User==undefined){
      res.render('item',{data:item,allItems:allItems,message:'', start:[]});
    }
    else {
      res.render('item',{data:item,allItems:allItems,message:'',firstname:req.session.theUser.FirstName, start:[1]});
    }
      //console.log(allItems,'kdlfkle')
      //console.log(req.session.theUser);
      console.log(item,'--------------------------------')
   }

  if(itemCode.length===0){
      if(Session_User==undefined){
    res.render('categories',{data:categories, start:[]})
  }
  else {
    res.render('categories',{data:categories,firstname:req.session.theUser.FirstName, start:[1]})
  }
  }
  else if(item.length===0){
      if(Session_User==undefined){
    res.render('categories','We cannot find the item you ar looking for')
  }
  else {
    res.render('categories','We cannot find the item you ar looking for')
  }
  }
  /*else{console.log(item,'--------------------------------hghjhgjgj')
    res.render('item',{data:item});
  }*/
});


//----------------------------------------#contact page ----------------------------------------------------------------------
app.get('/contact',function(req,res){
    var Session_User=req.session.theUser;
    if(Session_User==undefined){
  res.render('contact', {start:[]})
}
else {
  res.render('contact', {start:[1],firstname:req.session.theUser.FirstName})
}
})
//----------------------------------------#myItems page ----------------------------------------------------------------------

app.get('/myItems',function(req,res){
  var Session_User=req.session.theUser;
      if(Session_User==undefined){
  res.render('myItems', {start:[]});
}
else {
  res.render('myItems', {start:[1],firstname:req.session.theUser.FirstName});
}
});

//----------------------------------------#feedback page ----------------------------------------------------------------------

app.get('/feedback',function(req,res){
  var Session_User=req.session.theUser;
        if(Session_User==undefined){
  res.render('feedback',{start:[]})
}
else {
  res.render('feedback',{start:[1],firstname:req.session.theUser.FirstName})
}
});
//----------------------------------------#about page ----------------------------------------------------------------------
app.get('/about',function(req,res){
  var Session_User=req.session.theUser;
  if(Session_User==undefined){
  res.render('about', {start:[]})
}
else {
    res.render('about', {start:[1],firstname:req.session.theUser.FirstName})
}
});

//----------------------------------------# any random URL page ----------------------------------------------------------------------
app.get('/*',function(req,res){
  var Session_User=req.session.theUser;
  if(Session_User==undefined){
  res.render('404',{start:[]})
}
else {
  res.render('404',{start:[1],firstname:req.session.theUser.FirstName})
}
});

var express=require('express')
var app=express();
var router =express.Router();
var userItem=require('../models/userItem.js');
var item=require('../models/item.js')
var bodyParser= require('body-parser');
var urlencodedParser= bodyParser.urlencoded({extended:false});
var UserDB = require('../models/UserDB.js');
var UserProfile=UserDB.UserProfile;
var userItemProfile=require('../models/userProfile.js');
var itemUtil=require('../models/itemUtil')
var allItems=itemUtil.getItems();
var listofitems=itemUtil.itemcodes();
var allUsers=UserDB.getUsers(UserDB.allUsers);
var getUserProfile=UserDB.getUserProfile;
var userProfile=new userItemProfile();
var theUser=function(req,res,next){
  req.session.listofitems=listofitems;
  req.session.save();
  next()
  //console.log("hbsjhadhd");
}

router.use(theUser);

router.get('/myItems',function(req,res,next){
console.log("Entered profile controller")
var action=req.query.action
console.log(action ,'is the requested action')
var Session_User=req.session.theUser;
console.log(Session_User)
if(Session_User==undefined){
console.log("entered no session")
  if( action==undefined){

      console.log('1st on my items')
      req.session.theUser=allUsers[0]
      //console.log(allUsers[0],"hellooooooo")
      var UserId= req.session.theUser.UserId;
    //  console.log(UserId)
      var currentProfile=getUserProfile(UserId);
var message='';
      req.session.currentProfile=currentProfile;
       var allItems=req.session.currentProfile.UserItems;
      //console.log(allItems)
      req.session.save();

      if (allItems==undefined)
      {
          res.render('myItems',{allItems:[],firstname:req.session.theUser.FirstName,message:message, start:[1]})
      }
      else{

          res.render('myItems',{allItems:allItems,firstname:req.session.theUser.FirstName,message:message, start:[1]});
      }
  }
  else if(action=='SaveIt'){
    console.log('entered save it')
  //  res.send("Please SignIn to save items")
 var itemCode=req.query.theItem
  //  console.log(allItems, 'is the current profile in saveiT code');
  //var allItems=req.session.currentProfile.UserItems;
var allItems
  allDBItems=itemUtil.getItems();
  for(i=0;i<allDBItems.length;i++){
    if(allDBItems[i]._itemCode==itemCode){

      allItems=allDBItems[i];
      //allItems[i].Rating=0;
    }
  }

  console.log(allItems,'is the allItems data after adding')
  if(allItems.length==0){
  res.render('item',{data:allItems,message:'Added', start:[]});
  }
  else if(allItems.length!=0) {console.log('length=0')
       res.render('item',{data:allItems,message:'Please signIn to add an product to your Items', start:[]});
  }
  }
  else if(action=='RateIt'){
    console.log('entered save it')
  //  res.send("Please SignIn to save items")
 var itemCode=req.query.theItem

var allItems
  allDBItems=itemUtil.getItems();
  for(i=0;i<allDBItems.length;i++){
    if(allDBItems[i]._itemCode==itemCode){
      //var UserItem=new userItem(allDBItems[i],allDBItems[i]._rating,'NO');
      //allItems.push(allDBItems[i]);
      allItems=allDBItems[i];
    }
  }

  console.log(allItems,'is the allItems data after adding')
  if(allItems.length==0){
  res.render('item',{data:allItems,message:'Added', start:[]});
  }
  else if(allItems.length!=0) {console.log('length=0')
       res.render('item',{data:allItems,message:'Please add the product to your page before rating the product', start:[]});
  }
  }
  else if(action=='RateIt'){
    console.log('entered update')
  var itemCode=req.query.theItem

  var allItems=req.session.currentProfile.UserItems;
  var allItem=[]
  //allDBItems=itemUtil.getItems();
  for(i=0;i<allItems.length;i++){
    if(allItems[i].Item._itemCode==itemCode){
      //console.log('adding')
      //var UserItem=new userItem(allDBItems[i],allDBItems[i]._rating,'NO');
      allItem.push(allItems[i]);
    }
  }
    //console.log(allItem,'is all item');

  if(allItem.length!=0){
    for(i=0;i<allItem.length;i++){
   //console.log(allItem[i]._itemName,'is item name');
  }
  res.render('item',{allItems:allItem,firstname:req.session.theUser.FirstName, start:[1],message:'Please add the item before rating it'});
  }
  else {console.log('length=0')
       res.render('item',{allItems:[],firstname:req.session.theUser.FirstName, start:[1],message:'Please add the item before rating it'});
  }
  }
}
//This below part executes when session is already present
else

{ var message='';
  if(action=='delete'){
  console.log("entered delete")
  itemCode=req.query.theItem

  var stored=0;
  var allItems=req.session.currentProfile.UserItems;
  console.log(allItems,'before call')
  console.log(userProfile.removeUserItem(itemCode,allItems));
  console.log(allItems,'after call')
  /*for(i=0;i<allItems.length;i++){
    if(allItems[i].Item._itemCode==itemCode){
  var stored=1;
    }
  }
   for(i=0;i<allItems.length;i++){
     //console.log(allItems[i].Item._itemCode,'abd code is',itemCode)
     if(allItems[i].Item._itemCode==itemCode){
       req.session.currentProfile.UserItems.splice(i,1);
       req.session.sessionProfile= req.session.currentProfile;
       req.session.save();
     }
   }
   if(stored==0){
     res.send('Item not present in your myItems page')
   }*/
   //else{
   //allItems=req.session.currentProfile.UserItems;
   //console.log(allItems,'after delete')
   if(allItems.length!=0){
 res.render('myitems',{allItems:allItems,firstname:req.session.theUser.FirstName,message:message, start:[1]});
   }
   else {console.log('length=0')
        res.render('myitems',{allItems:[],firstname:req.session.theUser.FirstName,message:message, start:[1]});
   }
//}
}

else if(action==undefined){
  console.log('session active ')
 var allItems=req.session.currentProfile.UserItems;
userProfile.getUserItems(allItems);
 if(allItems.length!=0){
res.render('myitems',{allItems:allItems,firstname:req.session.theUser.FirstName,message:message, start:[1]});
 }
 else {console.log('length=0')
      res.render('myitems',{allItems:[],firstname:req.session.theUser.FirstName,message:message, start:[1]});
 }
}


else if(action=='SaveIt'){
  console.log('entered save it')
var itemCode=req.query.theItem
var stored=0;
var allItems=req.session.currentProfile.UserItems;
console.log(userProfile.addUserItem(itemCode,allItems))
for(i=0;i<allItems.length;i++){
  if(allItems[i].Item._itemCode==itemCode){
var stored=1;

  }
}
if(stored==0){
userProfile.addUserItem(itemCode,allItems)
}
if(stored==1){
  message='The item is already saved to your page!!! Please find it in the below list'
}

req.session.currentProfile.UserItems=allItems;
console.log(req.session.currentProfile.UserItems,'is the session data after adding')
console.log(allItems,'is the allItems data after adding')
if(allItems.length!=0){
res.render('myitems',{allItems:allItems,firstname:req.session.theUser.FirstName,message:message, start:[1]});
}
else {console.log('length=0')
     res.render('myitems',{allItems:[],firstname:req.session.theUser.FirstName,message:message, start:[1]});
}

}
else if(action=='update'){
  console.log('entered update')
var itemCode=req.query.theItem

var allItems=req.session.currentProfile.UserItems;

//allDBItems=itemUtil.getItems();
/*for(i=0;i<allItems.length;i++){
  if(allItems[i].Item._itemCode==itemCode){
    //console.log('adding')
    //var UserItem=new userItem(allDBItems[i],allDBItems[i]._rating,'NO');
    allItem.push(allItems[i]);
  }
}*/
  //console.log(allItem,'is all item');
allItem=userProfile.updateUserItem(itemCode,allItems);
if(allItem.length!=0){
  for(i=0;i<allItem.length;i++){
 //console.log(allItem[i]._itemName,'is item name');
}
res.render('feedback',{allItems:allItem,firstname:req.session.theUser.FirstName, start:[1]});
}
else {console.log('length=0')
     res.render('feedback',{allItems:[],firstname:req.session.theUser.FirstName, start:[1]});
}
}
else if(action=='feedback'){
  console.log('entered feedback')
var itemCode=req.query.theItem
var Rating=req.query.Rating;
console.log(Rating ,'is the new rating');

var allItems=req.session.currentProfile.UserItems;
var allItem=[]
//allDBItems=itemUtil.getItems();
for(i=0;i<allItems.length;i++){
  if(allItems[i].Item._itemCode==itemCode){
    //console.log('adding')
    //var UserItem=new userItem(allDBItems[i],allDBItems[i]._rating,'NO');
    //allItem.push(allItems[i]);

    allItems[i].Rating=Rating;
  }
}
  console.log(allItems,'is all item');

if(allItems.length!=0){
  for(i=0;i<allItem.length;i++){
 //console.log(allItem[i]._itemName,'is item name');
}
res.render('myItems',{allItems:allItems,firstname:req.session.theUser.FirstName,message:message, start:[1]});
}
else {console.log('length=0')
     res.render('myItems',{allItems:[],firstname:req.session.theUser.FirstName,message:message, start:[1]});
}
}
else if(action=='RateIt'){
  console.log('entered RateIt')
var itemCode=req.query.theItem

var allItems=req.session.currentProfile.UserItems;
var allItem=[]
//allDBItems=itemUtil.getItems();
for(i=0;i<allItems.length;i++){
  if(allItems[i].Item._itemCode==itemCode){
    //console.log('adding')
    //var UserItem=new userItem(allDBItems[i],allDBItems[i]._rating,'NO');
    allItem.push(allItems[i]);
  }
}
items=itemUtil.getItems();
for(i=0;i<items.length;i++){
//  console.log(items[i],'is the item')
  if(items[i]._itemCode==itemCode){

    item=items[i]
  }
}console.log(item,'is item')
  //console.log(allItem,'is all item');

if(allItem.length!=0){
  for(i=0;i<allItem.length;i++){
 //console.log(allItem[i]._itemName,'is item name');
}
res.render('feedback',{allItems:allItem,firstname:req.session.theUser.FirstName, start:[1],message:''});
}
else {console.log('length=0')
     res.render('item',{data:item,firstname:req.session.theUser.FirstName, start:[1],message:'Add the Item before rating'});
}
}

}
});

router.post('/action*',urlencodedParser,function(req,res,next){
console.log('in post as action');
    var itemcodeobj=req.session.listofitems;
    var theItem=req.query.theItem;
     var action=req.query.action;
     console.log('requested action: '+action);

      if(action=='feedback'){
       console.log('entered feedback')
     var itemCode=req.query.theItem
     //var Rating=req.query.Rating;
     //console.log(Rating ,'is the new rating');

     var allItems=req.session.currentProfile.UserItems;

    // var allItem=[]
     //allDBItems=itemUtil.getItems();
     for(i=0;i<allItems.length;i++){
       console.log('in loop');
       var itemCode=req.query.theItem
       console.log(itemCode,'is the item')
       if(allItems[i].Item._itemCode==itemCode){
         console.log('adding')
         //var UserItem=new userItem(allDBItems[i],allDBItems[i]._rating,'NO');
         //allItem.push(allItems[i]);
         console.log(allItems[i].Item.Rating,'before')
         if(req.body.rating!=undefined){
         allItems[i].Rating=req.body.rating;
       }
         console.log(req.body.Made,'is made value passed');
         if(req.body.madeIt!=undefined){
         allItems[i].madeIt=req.body.madeIt;}
          console.log(allItems[i].Rating,'after')
       }
     }
       console.log(allItems,'is all item');

     if(allItems.length!=0){
       for(i=0;i<allItems.length;i++){
      //console.log(allItem[i]._itemName,'is item name');
     }
     res.render('myItems',{allItems:allItems,firstname:req.session.theUser.FirstName,message:'', start:[1]});
     }
     else {console.log('length=0')
          res.render('myItems',{allItems:[],firstname:req.session.theUser.FirstName,message:'The item code is not valid', start:[1]});
     }
     }
  else{
      res.send('There are no items in profile to view');
   }
 });

router.get('/login', function(req,res,next){
  console.log(req.session.theUser,'enterd login');
    if(req.session.theUser==undefined){
        req.session.theUser=allUsers[0]
        var UserId= req.session.theUser.UserId;
        var currentProfile=getUserProfile(UserId);
        req.session.currentProfile=currentProfile;
        req.session.save();
    res.render('index',{start:[1],firstname:req.session.theUser.FirstName})
    }

})

router.get('/logout',function(req,res,next){
    req.session.destroy();
    console.log('session ended');
    res.render('index',{start:[]})

})

 module.exports= router;

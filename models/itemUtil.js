var itemData=require("../models/itemDB.js")
var Item=require("../models/item.js")

var getItems=function()  {

  var allItems=[]

for(i=0;i<itemData['items'].length;i++){

data=itemData['items'][i]
let item = new Item(data.itemCode,
    data.itemName,
    data.catalogCategory,
    data.description,
    data.rating,
    data.getImageURL);
//console.log("--------------------------------------")
//console.log(item)
//console.log(data['itemCode'],'this is item code in getAllItems')

allItems.push(item)
}

    return allItems;
};


var getItem=function(Code){
  var specificItem;
  var i = 0;
  for(i=0;i<itemData['items'].length;i++){
//console.log("--------------------------------------")
//console.log(itemData)
//console.log("--------------------------------------")
data=itemData['items'][i]

//console.log(data['itemCode'],Code)
if(data['itemCode']===Code){
//  console.log('entered')
//  console.log(data)
  let item = new Item(data.itemCode,
      data.itemName,
      data.catalogCategory,
      data.description,
      data.rating,
      data.getImageURL);
      //console.log(item)
      specificItem=item;
      return specificItem;
}


  }

  if(i==itemData['items'].length){

    return "error";
  }



}

var getSpecificCategoryItems=function(category){
  var categoryItems=[]
  for(i=0;i<itemData['items'].length;i++){
  //console.log("--------------------------------------")
  //console.log(itemData)
  //console.log("--------------------------------------")
  data=itemData['items'][i]

  console.log(data['catalogCategory'],category)
  if(data['catalogCategory']===category){
  //  console.log('entered')
  //  console.log(data)
  let item = new Item(data.itemCode,
      data.itemName,
      data.catalogCategory,
      data.description,
      data.rating,
      data.getImageURL);
      //console.log(item)
      categoryItems.push(item)
  }


  }

  return categoryItems;
}

var itemcodes=function(){
  allitems=getItems();
  var itemcodeobj=[];
  for(var i=0;i<allitems.length;i++){
    itemcodeobj.push(allitems[i].itemCode);
  }
  return itemcodeobj;
}
//itemcodes(allItems);

module.exports.getItems=getItems;
module.exports.getItem=getItem;
module.exports.getSpecificCategoryItems=getSpecificCategoryItems;
module.exports.itemcodes=itemcodes;

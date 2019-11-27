var itemUtil=require('../models/itemUtil');
var userItem=require('../models/userItem.js');
class UserProfile{

//var UserItems=req.session.currentProfile.UserItems;

  constructor(UserId, UserItems){
    this.UserId= UserId;
    this.UserItems=UserItems;
  }

  addUserItem(itemCode,allItems){
      var stored=0
    var allDbItems=itemUtil.getItems();
    for(i=0;i<allItems.length;i++){
      if(allItems[i].Item._itemCode==itemCode){
     stored=1;

      }
    }
    if(stored==0){
    allDbItems=itemUtil.getItems();
    for(i=0;i<allDbItems.length;i++){
      if(allDbItems[i]._itemCode==itemCode){

        var UserItem=new userItem(allDbItems[i],0,'NO');
        allItems.push(UserItem);

      }
    }
  }return allItems;

  };
removeUserItem(ItemID,allItems){
    //this.ItemID=ItemID;
    var ItemIdobj=[];var stored=0;
    for (i=0;i<allItems;i++){
      ItemIdobj.push(allItems);
    }

      for (i=0;i<allItems.length;i++){
        if(allItems[i].Item._itemCode==ItemID){
          allItems.splice(i,1);
          console.log(allItems,'remove  ')
          return 'the following'+ ItemID +' is removed';
          stored=1;
        }
      }

    if(stored==0){
      return 'there are no such '+ ItemID+' in profile';
    }


}
getUserItems(allItems){
  return allItems;

}

updateUserItem(itemCode,allItems){
  var allItem=[];
  for(i=0;i<allItems.length;i++){
    if(allItems[i].Item._itemCode==itemCode){
      //console.log('adding')
      //var UserItem=new userItem(allDBItems[i],allDBItems[i]._rating,'NO');
      allItem.push(allItems[i]);
    }
  }
  return allItem;
};

emptyProfile(){
var allItems=[];
return allItems;
}
}
module.exports=UserProfile;

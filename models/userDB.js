var userItem=require('./userItem.js');
var user=require('./user.js');
//var userProfile=('../models/UserProfile.js');
var itemUtil=require('./itemUtil.js');

var allItems=itemUtil.getItems();

var user1=new user('lchennar','Lakshmi','Chennareddy','lakshmi.ch@gmail.com','419 Barton Creek Drive','Apt2', 'Charlotee','NC','28262','USA');
var user2=new user( 'schennar932','Sowmya',  'Chennareddy',  'sowmya.ch@gmail.com','219 Barton Creek Drive','Apt N',  'Charlotee',  'NC',  '28262','USA')
var UserItem1=new userItem(allItems[0],'4','YES');
var UserItem2=new userItem(allItems[4],'4.8','NO');
var UserItem3=new userItem(allItems[6],'4.8','NO');

function UserProfile(UserId, UserItems) {
  this.UserId = UserId;
  this.UserItems = UserItems;
};
var userItem1=[UserItem1,UserItem3];
var userItem2=[UserItem1,UserItem2,UserItem3]
var UserProfile1=new UserProfile(user1.UserId,userItem1)
var UserProfile2=new UserProfile(user2.UserId,userItem2)
var allUsers=[user1,user2];
var allUserItems= [UserItem1,UserItem2,UserItem3];
var allUserProfiles= [UserProfile1,UserProfile2];


var userList=[];

var userList=function(allUserProfiles){
  for (i=0;i<allUserProfiles.length;i++){
    userList.push(allUserProfiles[i].UserId);
  }
  return userList;
}

function getUsers(allUsers){
  return allUsers;
}

var getUserProfile=function(UserId){
  //console.log(allUserProfiles,'gkugukggyygy ')
  for(i=0;i<allUserProfiles.length;i++){
//console.log(allUserProfiles[i]['UserId'],'fffffffffffff')
    if(allUserProfiles[i].UserId===UserId){
return allUserProfiles[i];
    }
    else{
      return "No such User Found in our Data"
    }
  }
}

module.exports.allUsers=allUsers;
module.exports.allUserItems=allUserItems;
module.exports.allUserProfiles=allUserProfiles;
module.exports.getUsers=getUsers;
module.exports.UserProfile=UserProfile;
module.exports.getUserProfile=getUserProfile;

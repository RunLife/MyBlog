var mongodb=require('./db');
function User(user){
	this.name=user.name;
	this.password=user.password;
};
module.exports=User;
//保存数据到数据库中
User.prototype.save=function save(callback){
	var user={
		name:this.name,
		password:this.password
	};
	mongodb.close();
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		db.collection('users',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			//添加name属性
			collection.ensureIndex('name',{
				unique:true
			},function(err,user){});
			//写入user文档
			collection.insert(user,{safe:true},function(err,user){
				callback(err,user);
			});

		});
	});
};
//查询数据
User.get=function get(username,callback){
	mongodb.close();
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		db.collection('users',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.findOne({name:username},function(err,doc){
				mongodb.close();
				if(doc){
					var user=new User(doc);
					callback(err,user);
				}
				else{
					callback(err,null);
				}
			});
		});
	});
};

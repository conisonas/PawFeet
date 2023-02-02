# 发布送养 release
```http
POST http://localhost:3000/release HTTP/1.1
{
  "img": "",   ---宠物照片
  "name":"",---宠物昵称
  “star”:"",    ---宠物星球（狗 猫 其他）
  "variety":"",---宠物品种
  "sex":"", ---宠物性别
  "age":"", ---宠物年龄
  "health":"", ---宠物健康
  "desc":"",   ---宠物描述你的宝贝
  "condition":"",----宠物领养条件
  "owner":"", ---宠物-主人
  "tel":"", ---宠物电话号码
  "area":"" ---宠物所在地区
}
```
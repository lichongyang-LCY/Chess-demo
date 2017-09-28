# cccGame


一款扎金花游戏  客户端是 cocos creator 1.3.3  服务器是pomelo

暂时 就细节没写完 基本功能都有了 已经可以玩

改代码详解 见 http://blog.sina.com.cn/s/articlelist_2808783193_14_1.html

效果 http://119.29.99.205:8000  (服务器加载很慢,要耐心等)

`服务器欠费，被收回了

# 环境配置:

`1 cccGame/assets/resources/data/protocol.json  内修改 http地址 为服务器地址`  默认是127.0.0.1

`2 server/game-server/app/consts/consts.js  修改host地址 为服务器地址`    默认是127.0.0.1

`3 导入 tools/mysql/cccGame.sql`

`4 配置  server/game-server/mysql.json 为自己 mysql 账户密码`

### 注:
server代码 需要执行 npm-install.sh 然后再 node app.js （ubuntu 执行 nodejs app.js）

## 也可以进qq群一起讨论：275348123



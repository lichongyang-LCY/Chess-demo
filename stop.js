/**
 * Created by Class on 2016/6/7.
 */
var cmd='lsof -i :';
var exec = require('child_process').exec;

var servers=require("./game-server/config/servers")["production"];
var master = require("./game-server/config/master")["production"];


for(var sname in servers)
{
    var say = servers[sname];
    for(var i=0;i<say.length;i++)
    {
        var port = say[i].port;
        cmd +=(port+",");
    }
}

cmd += master.port;


console.log(JSON.stringify(cmd));

var killed = {};
exec(cmd, function(err, stdout, stderr) {
    if(err){ return console.log(err); }
    stdout.split('\n').filter(function(line){
        var p=line.trim().split(/\s+/);
        var address=p[1];

        if(!killed[address] && address == parseInt(address))
        {
            killed[address] = true;
            console.log("kill address:"+address);

            exec("kill -9 "+address,function(err,stdout, stderr)
            {
                if(err)
                    return console.log(err);
            })
        }
    });
});
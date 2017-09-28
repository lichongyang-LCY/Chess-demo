var consts = require('../../../consts/consts');
var enums = require('../../../consts/enums');
var Token = require('../../../util/token');
var secret = require('../../../../config/session').secret;
require('../../../base/CBaseHandler');


Class({
	ClassName:"CPomelo.Handler.CEntryHandler",
	Base:"CPomelo.Handler.CBaseHandler",
	entry:function(msg, session, next)
	{
		var tokenInfo = Token.parse(msg.token,secret);
		if(tokenInfo)
		{
			var timestamp = Date.parse(new Date()) / 1000;
			if(timestamp - tokenInfo.timestamp > enums.TOKEN.TIMEOUT){
				next(null, {code: consts.LOGIN.TOKEN_OUT_TIME});
				return;
			}

			var uid = tokenInfo.userid;
			var self = this;
			self.app.rpc.db.dbRemote.GetUser(session,uid,function(err,data)
			{
				if(err)
				{
					next(null, {code: consts.LOGIN.LOGIN_TOKEN_ERR});
					return;
				}

				if(!self.UserAdd(uid,msg.token,data.name,session))
				{
					next(null,{code: consts.LOGIN.LOGIN_TOKEN_ERR});
					return ;
				}

				data.userid = uid;
				next(null, data);

			});
			return;
		}
		next(null, {code: consts.LOGIN.LOGIN_TOKEN_ERR});
	},
	UserAdd : function(uid,token,name,session)
	{
		var sessionService = this.app.get('sessionService');

		//duplicate log in
		var oldsession = sessionService.getByUid(uid);
		var sid = this.app.getServerId();
		if (!! oldsession){
			return false;
		}
		session.bind(uid);
		session.set('token',token);
		session.set('name',name);
		session.pushAll(function(err,data){});
		session.on('closed', this.onUserLeave.bind(null, this.app));


		return true;
	},
	onUserLeave:function(app,session)
	{
		if(!session || !session.uid) {
			return;
		}

		var uid = session.uid;




		app.rpc.db.dbRemote.onUserLeave(uid, uid, function(err, res){

		});

		app.rpc.zjh.gameRemote.onUserLeave(session, uid, function(err, res){

		});


	}
})

module.exports = function(app) {
	return new CPomelo.Handler.CEntryHandler(app);
};


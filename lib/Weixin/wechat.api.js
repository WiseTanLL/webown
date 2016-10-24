
var Wechat = (function(){
	var data ={};
	var obj = new Object();
	obj.chooseImage = function(callback){
	    wx.chooseImage({
		    success: function (res) {
		        var localIds = res.localIds;// 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
		        if(callback!=undefined){
		        	callback(localIds);
		        }
		    }
	  	});
 	}

	obj.uploadImage = function(id,callback){
	    wx.uploadImage({
		    localId:id.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
		    isShowProgressTips: 1, // 默认为1，显示进度提示
		    success: function (res) {
		        var serverId = res.serverId; // 返回图片的服务器端ID
		        if(callback!=undefined){
		       		callback(serverId);
		    	}
	        }
	    });
	}

	obj.downloadImage = function(id,callback){
	    wx.downloadImage({
		    serverId: id.toString(), // 需要下载的图片的服务器端ID，由uploadImage接口获得
		    isShowProgressTips: 1, // 默认为1，显示进度提示
		    success: function (res) {
		        var localId = res.localId; // 返回图片下载后的本地ID
		        if(callback!=undefined){
		       		callback(serverId);
		    	}
	    	}
		});
	}
	obj.share = function(opt,mode,callback,cancelFunc){
		//分享朋友圈
	    switch(mode){
	    //分享朋友圈
	    case 0:wx.onMenuShareTimeline({
	          title: opt.title, // 分享标题
	          link: opt.link, // 分享链接
	          imgUrl:opt.imgurl, // 分享图标
	          success: callback,
	          cancel: cancelFunc
	      });
		//分享微博
		  case 1:  wx.onMenuShareWeibo({
		        title: opt.title, // 分享标题
		        link: opt.link, // 分享链接
		        desc: opt.desc, // 分享描述
		        imgUrl:opt.imgurl, // 分享图标
		        success: callback,
	            cancel: cancelFunc
		    });
		    //分享朋友
		    //分享QQ
		  case 2:  wx.onMenuShareQQ({
		        title: opt.title, // 分享标题
		        link: opt.link, // 分享链接
		        desc: opt.desc, // 分享描述
		        imgUrl:opt.imgurl, // 分享图标
		        success: callback,
	         	cancel: cancelFunc
		    });
		    case 3: wx.onMenuShareAppMessage({
		        title: opt.title, // 分享标题
		        link: opt.link, // 分享链接
		        desc: opt.desc, // 分享描述
		        imgUrl: opt.imgurl, // 分享图标
		        type: '', // 分享类型,music、video或link，不填默认为link
		        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		        success: callback,
	          	cancel: cancelFunc
		    });
	  	}
	}
	return obj;

})();
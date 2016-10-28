var keystone = require('keystone');
var Types = keystone.Field.Types;;
  
var Movie = new keystone.List('Movie',{
	nocreate: true,
    track:{
        updatedAt:"update_time",
    }
});

Movie.set('perPage', 10);
// console.log(Movie);

// Movie.paginate({
// 		page: req.query.page || 1,
// 		perPage: 10,
// 		maxPages: 10
// 	})
// 	.sort('-publish_date')
// 	.exec(function(err, results) {
// 		locals.data.movies = results;
// 		next(err);
// 	})

Movie.add({
    name: { type: String, required: true ,label:"名称"},
    other_name:{type: String,label:"别称"},
    audience_num: { type: Number ,label:"评分人数"},
    grade: { type: Number ,label:"评分"},
    download_page_url:{ type: Types.Url ,label:"下载地址"},
    show_year: { type: Number ,label:"上映年份"},
    publish_date:{ type: Date ,label:"资源发布日期",format:'YYYY-MM-DD'},
    desc:{ type: Types.Html ,label:"描述"},
    douban_url:{ type: Types.Url ,label:"豆瓣地址"},
    pic_url:{
        type: Types.Url,label:"配图",
    },
    create_time:{ type: Types.Datetime,noedit:true,label:"创建时间",format:'YYYY-MM-DD HH:mm:ss' },
    update_time:{ type: Types.Datetime,noedit:true,label:"更新时间",format:'YYYY-MM-DD HH:mm:ss' },
    is_hd:{
        label:"清晰程度",
        type: Types.Select, numeric: true, options: [{ value: 1, label: '清晰' }, { value: 0, label: '非清晰' }]
    },
    is_seen:{
        label:"看过没",
        type: Types.Select, numeric: true, options: [{ value: 1, label: '看过' }, { value: 0, label: '没看过' }]
    },
    is_good:{
        label:"推荐程度",
        type: Types.Select, numeric: true, options: [{ value: 0, label: '有待考证' }, { value: 1, label: '值得观看' }, { value: 2, label: '不推荐观看' }]
    },

    staff:{type:String,label:"参演阵容"},
});

Movie.defaultColumns = 'name,grade, audience_num,is_good,is_hd,is_seen,douban_url,download_page_url, show_year,publish_date,create_time,update_time';
Movie.defaultSort = '-update_time';
Movie.register();
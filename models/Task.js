var keystone = require('keystone');
var Types = keystone.Field.Types;;
  
var Task = new keystone.List('Task',{
	nocreate: true,
    noedit:true,
    track:{
        updatedAt:"update_time",
    }
});

Task.set('perPage', 10);
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

Task.add({
    name: { type: String, required: true ,label:"名称"},
    start_time:{ type: Types.Datetime,noedit:true,label:"开始时间"},
    end_time:{ type: Types.Datetime,noedit:true,label:"结束时间"},
    update_time:{ type: Types.Datetime,noedit:true,label:"更新时间"},
    status:{
        label:"状态",
        type: Types.Select, numeric: true, options: [{ value: 1, label: '已完成' }, { value: 0, label: '未完成' }]
    },
    time_cost:{
        type: Number ,label:"耗时（单位：秒）"
    }
});

Task.defaultColumns = 'name,status,time_cost,start_time';
Task.defaultSort = '-start_time';
Task.register();
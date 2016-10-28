var keystone = require('keystone');


 
exports = module.exports = function(req, res) {
  	
  	var view = new keystone.View(req, res);
  	var locals = res.locals;
  	
  	// locals.section is used to set the currently selected
  	// item in the header navigation.
 	locals.section = 'movie';
 	var theUrl=req.url.split("?")[0];
 	
	locals.filters = {
		cate: req.params.cate,
		path: theUrl,
		search_word: req.query.search_word,
	};

	locals.data = {
		movies: [],
	};


     
     // Load all tickets
 	view.on('init', function(next) {
 
 		// var q = keystone.list('Movie').model.find();
 		 
 		// q.exec(function(err, results) {
 		// 	locals.data.movies = results;
 		// 	next(err);
 		// });
 		if (req.method == 'POST'&&req.body.search_word) {
 			return res.redirect(theUrl+"?search_word="+req.body.search_word);
		}


		var q = keystone.list('Movie').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
		})
		if (req.params.cate) {
			switch(req.params.cate)
			{
				case "1":
					q.where('is_hd',1).where('is_good',1)
				  	break;
				case "2":
					q.where("is_hd",0).where('is_good',1)
				  	break;
				case "3":
					q.where('is_good',0)
				  	break;
				default:
					q.where('is_good').in([0,1])
				  	break;
			}
		}else{
			q.where('is_good').in([0,1])
		}
		if(req.query.search_word) {
  			var regex = new RegExp(req.query.search_word,'i');
			q.where('name',regex);
		}
		// var regex = new RegExp('/hanzhan/','i');
		// q.where('name',regex);

		q.sort('-update_time')


		q.exec(function (err, results) {
			// console.log(results);
			locals.data.movies = results;
			next(err);
		});
 	}); 
 	// Render the view
 	view.render('movie');
 	
};

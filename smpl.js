var express = require('expressss');

var app = express();

var handlebars = require('express-handlebars')
	.create({ defaultLayout : 'main' });

var fortunes = [
	'You win!',
	'You best',
	'You motherfucker',
	'You smpl'
];

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('home');
});

app.get('/about', function(req, res) {
	var randomFortune =
		fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', { fortune : randomFortune });
});

app.use(function(req, res, next) {
	res.status(404);
	res.render('404')
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function() {
	console.log('server is up on port : ' + app.get('port'));
})
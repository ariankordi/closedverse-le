// Dependencies
const
	fs = require('fs'),
	express = require('express'),
	nunjucks = require('nunjucks'),
	Sequelize = require('sequelize'),
	csrf = require('csurf'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	responseTime = require('response-time'),
	cookieSession = require('cookie-session'),
	multer = require('multer'),
	upload = multer({
		dest: 'uploads/'
	}),
	validUrl = require('valid-url'),
	uuidv4 = require('uuid/v4'),

	util = require('./utils');

// Load config from ./config.json
var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

// DB, we will set this later
var db;

if(config.pg) {
	// If config.pg, load Postgres Sequelize database
	db = new Sequelize(config.pg.dbname, config.pg.user, config.pg.password, {
		host: config.pg.host,
		dialect: 'postgres',
		operatorsAliases: false,
		// This can only be a function or false, if config.pg.log is true, then logging is console.log.
		logging: config.pg.log && console.log
	});
}
// Else, if config.my,
else if(config.my) {
	// Load MySQL Sequelize database
	db = new Sequelize(config.my.dbname, config.my.user, config.my.password, {
		host: config.my.host,
		dialect: 'mysql',
		operatorsAliases: false,
		logging: config.my.log && console.log
	});
}


Array.prototype.asyncforEach = async function(callback) {
	for(let i = 0; i < this.length; i++) {
		await callback(this[i], i, this);
	}
}

const Op = Sequelize.Op;
const DataTypes = Sequelize.DataTypes;
var Community = db.define('community', {
	unique_id: {
		type: DataTypes.UUID,
		defaultValue: function() {
			return uuidv4().replace(/-/g, '');
		},
	},
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: Sequelize.STRING,
	description: Sequelize.TEXT,
	icon: {
		type: Sequelize.STRING,
		field: 'ico'
	},
	banner: Sequelize.STRING,
	allowed_users: Sequelize.TEXT,
	//forbidden_users: Sequelize.TEXT,
	tags: Sequelize.STRING,
	is_rm: Sequelize.BOOLEAN,
	is_feature: Sequelize.BOOLEAN,
	type: Sequelize.INTEGER,
	platform: Sequelize.INTEGER,
	created: Sequelize.DATE,
	updated: Sequelize.DATE,
}, {
	paranoid: true,
	freezeTableName: true,
	tableName: 'closedverse_main_community',
	timestamps: false,
});
Community.prototype.setupIcon = function() {
	if(!this.icon) {
		this.icon = '/s/img/title-icon-default.png';
	}
	switch(this.platform) {
		case 1:
			this.platform_icon = '3ds'
			this.platform_txt = '3DS Games'
			break;
		case 2:
			this.platform_icon = 'wiiu'
			this.platform_txt = 'Wii U Games'
			break;
		case 3:
			this.platform_icon = 'wiiu-3ds'
			this.platform_txt = 'Wii U Games\u30FB3DS Games'
			break;
	}
	switch(this.type) {
		case 0:
			this.type_txt = 'General community'
			break;
		case 1:
			this.type_txt = 'Game community'
			break;
		case 2:
			this.type_txt = 'Special community'
			break;
	}
}
Community.prototype.canPost = function(user) {
	if(!user.is_authenticated) {
		return false;
	}
	if(this.allowed_users) {
		var allowed = this.allowed_users.split(',');
		if(allowed.includes(String(user.id))) {
			return true;
		}
		return false;
	}
	/*else if(this.forbidden_users) {
		var forbidden = this.forbidden_users.split(',');
		if(forbidden.includes(String(user.id))) {
			return false;
		}
		return true;
	}*/
	return true;
}
Community.prototype.clickable = function() {
	if(this.is_rm) {
		return false;
	}
	// If this is activity feed
	if(this.type == 3 || this.tags == 'activity') {
		return false;
	}
	return true;
}
var User = db.define('user', {
	unique_id: {
		type: DataTypes.UUID,
		defaultValue: function() {
			return uuidv4().replace(/-/g, '');
		},
	},
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	username: Sequelize.STRING,
	nickname: Sequelize.STRING,
	password: Sequelize.STRING,
	avatar: Sequelize.STRING,
	email: Sequelize.STRING,
	is_rm: Sequelize.BOOLEAN,
	has_mh: Sequelize.BOOLEAN,
	level: Sequelize.INTEGER,
	role: Sequelize.INTEGER,
	created: Sequelize.DATE,
	addr: Sequelize.STRING,
	hide_online: Sequelize.BOOLEAN,
	active: Sequelize.BOOLEAN,
	color: Sequelize.STRING,
	staff: Sequelize.BOOLEAN,
	last_login: Sequelize.DATE,
}, {
	paranoid: true,
	freezeTableName: true,
	tableName: 'closedverse_main_user',
	timestamps: false,
});
User.prototype.is_authenticated = true;
User.prototype.isMe = function(user) {
	if(this.id == user.id) {
		return true;
	}
	return false;
}
// Make an avatar to display, returns URL
User.prototype.doAvatar = function(feeling = 0) {
	// TODO: Do away with has_mh and check http prefix or something
	if(this.has_mh) {
		var feel;
		switch(feeling) {
			case 1:
				feel = '_happy_face';
				break;
			case 2:
				feel = '_like_face';
				break;
			case 3:
				feel = '_surprised_face';
				break;
			case 4:
				feel = '_frustrated_face';
				break;
			case 5:
				feel = '_puzzled_face';
				break;
			default:
				feel = '_normal_face';
		}
		return 'https://mii-secure.cdn.nintendo.net/' + this.avatar + feel + '.png';
	}
	return this.avatar;
}
// Returns a CSS class for this user if type is 0, returns title if type is 1
User.prototype.doClass = function(type = 0) {
	if(!type) {
		var css;
		switch(this.role) {
			case 1:
				css = 'tester';
				break;
			case 2:
				css = 'administrator';
				break;
			case 3:
				css = 'moderator';
				break;
			case 4:
				css = 'openverse';
				break;
			case 5:
				css = 'donator';
				break;
			case 6:
				css = 'tester';
				break;
			case 7:
				css = 'urapp';
				break;
			case 8:
				css = 'developer';
				break;
			default:
				css = '';
		}
		if(css) {
			return 'official ' + css;
		}
		return css;
	} else {
		var title;
		switch(this.role) {
			case 1:
				title = 'Tester';
				break;
			case 2:
				title = 'Administrator';
				break;
			case 3:
				title = 'Moderator';
				break;
			case 4:
				title = 'Openverse Man';
				break;
			case 5:
				title = 'Donator';
				break;
			case 6:
				title = 'Tester';
				break;
			case 7:
				title = 'urapp';
				break;
			case 8:
				title = 'I don\'t like Python anymore';
				break;
			default:
				title = '';
		}
		return title;
	}
}
User.prototype.onlineStatus = function() {
	// do this later
	return null;
}
User.prototype.hasPostWait = async function(time) {
	// Time is the amount of time between posts
	var post = await Post.findOne({
		order: [['created', 'DESC']],
		where: {
			created: {
				[Op.gt]: new Date(new Date().getTime() - (time * 1000)),
			}
		},
	});
	if(post) {
		return true;
	}
	return false;
}
User.prototype.getProfile = function(favorite = false) {
	var include = [];
	if(favorite) {
		include = [{
			model: Post,
			as: 'favorite',
		}, ];
	}
	return Profile.findOne({
		where: {
			user_id: this.id,
		},
		include: include
	});
}
User.prototype.gethasFollow = async function(user) {
	if(!user.is_authenticated) {
		return false;
	}
	var follow = await Follow.count({
		where: {
			source_id: user.id,
			target_id: this.id,
		}
	});
	if(follow) {
		return true;
	}
	return false;
}
User.prototype.gethasFriendship = async function(user) {
	if(!user.is_authenticated) {
		return false;
	}
	var friendship = await Friendship.count({
		where: {
			[Op.or]: [
				[{source_id: this.id}, {target_id: user.id}],
				[{target_id: this.id}, {source_id: user.id}],
			],
		}
	});
	if(friendship) {
		return true;
	}
	return false;
}
User.prototype.getfriendsCount = function() {
	return Friendship.count({
		where: {
			[Op.or]: [{source_id: this.id}, {target_id: this.id}],
		},
	});
}
User.prototype.getfollowingCount = function() {
	return Follow.count({
		where: {
			source_id: this.id,
		},
	});
}
User.prototype.getfollowersCount = function() {
	return Follow.count({
		where: {
			target_id: this.id,
		},
	});
}
User.prototype.getpostsCount = function() {
	return Post.count({
		where: {
			creator_id: this.id,
		},
	});
}
User.prototype.getcommentsCount = function() {
	return Comment.count({
		where: {
			creator_id: this.id,
		},
	});
}
User.prototype.getyeahsCount = function() {
	return Yeah.count({
		where: {
			by_id: this.id,
		},
	});
}

var Profile = db.define('profile', {
	unique_id: {
		type: DataTypes.UUID,
		defaultValue: function() {
			return uuidv4().replace(/-/g, '');
		},
	},
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	comment: Sequelize.TEXT,
	origin_id: {
		type: Sequelize.STRING,
		defaultValue: null,
	},
	origin_info: {
		type: Sequelize.STRING,
		defaultValue: null,
	},
	country: {
		type: Sequelize.STRING,
		defaultValue: null,
	},
	id_visibility: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
	pronoun_is: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
	let_friendrequest: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
	yeahs_visibility: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
	comments_visibility: {
		type: Sequelize.INTEGER,
		defaultValue: 2,
	},
	weblink: {
		type: Sequelize.STRING,
		defaultValue: '',
	},
	external: {
		type: Sequelize.STRING,
		defaultValue: '',
	},
	let_yeahnotifs: {
		type: Sequelize.BOOLEAN,
		defaultValue: true,
	},
	let_freedom: {
		type: Sequelize.BOOLEAN,
		defaultValue: true,
	},
	cannot_edit: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	email_login: {
		type: Sequelize.INTEGER,
		defaultValue: 1,
	},
	limit_post: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
}, {
	paranoid: true,
	freezeTableName: true,
	tableName: 'closedverse_main_profile',
	timestamps: false,
});
Profile.belongsTo(User, {as: 'user', foreignKey: 'user_id'});
Profile.prototype.gethasFriendship = async function(user) {
	if(!user.is_authenticated) {
		return false;
	}
	var friendship = await Friendship.count({
		where: {
			[Op.or]: [
				[{source_id: this.user_id}, {target_id: user.id}],
				[{target_id: this.user_id}, {source_id: user.id}],
			],
		}
	});
	if(friendship) {
		return true;
	}
	return false;
}
Profile.prototype.getyeahsVisible = async function(user) {
	if(this.user_id == user.id) {
		return true;
	}
	if(this.yeahs_visibility == 2) {
		return false;
	}
	if(this.yeahs_visibility == 1) {
		if(user.is_authenticated) {
			var hasFriendship = await this.gethasFriendship(user);
			if(hasFriendship) {
				return true;
			}
		}
	}
	return true;
}
Profile.prototype.getcommentsVisible = async function(user) {
	if(this.user_id == user.id) {
		return true;
	}
	if(this.comments_visibility == 2) {
		return false;
	}
	if(this.comments_visibility == 1) {
		if(user.is_authenticated) {
			var hasFriendship = await this.gethasFriendship(user);
			if(hasFriendship) {
				return true;
			}
		}
	}
	return true;
}
Profile.prototype.getpublicOriginId = async function(user) {
	if(this.user_id == user.id) {
		return this.origin_id;
	}
	if(this.id_visibility == 2) {
		return 1;
	}
	if(this.id_visibility == 1) {
		if(user.is_authenticated) {
			var hasFriendship = await this.gethasFriendship(user);
			if(hasFriendship) {
				return this.origin_id;
			}
		}
	}
	if(!this.origin_id) {
		return null;
	}
	return this.origin_id;
}
Profile.prototype.getPronoun = function() {
	var text;
	switch(this.pronoun_is) {
		case 0:
			text = '';
			break;
		case 1:
			text = 'He/him';
			break;
		case 2:
			text = 'She/her';
			break;
		case 3:
			text = 'He/she';
			break;
		case 4:
			text = 'It';
			break;
		default:
			text = '';
			break;
	}
	return text;
}

var Follow = db.define('follow', {
	unique_id: {
		type: DataTypes.UUID,
		defaultValue: function() {
			return uuidv4().replace(/-/g, '');
		},
	},
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	created: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
	},
}, {
	paranoid: true,
	freezeTableName: true,
	tableName: 'closedverse_main_follow',
	timestamps: false,
});
Follow.belongsTo(User, {as: 'source', foreignKey: 'source_id'});
Follow.belongsTo(User, {as: 'target', foreignKey: 'target_id'});

var Friendship = db.define('follow', {
	unique_id: {
		type: DataTypes.UUID,
		defaultValue: function() {
			return uuidv4().replace(/-/g, '');
		},
	},
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	created: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
	},
	latest: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
	},
}, {
	paranoid: true,
	freezeTableName: true,
	tableName: 'closedverse_main_friendship',
	timestamps: false,
});
Friendship.belongsTo(User, {as: 'source', foreignKey: 'source_id'});
Friendship.belongsTo(User, {as: 'target', foreignKey: 'target_id'});

var Post = db.define('post', {
	unique_id: {
		type: DataTypes.UUID,
		defaultValue: function() {
			return uuidv4().replace(/-/g, '');
		},
	},
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	feeling: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
	body: Sequelize.TEXT,
	drawing: {
		type: Sequelize.STRING,
		defaultValue: '',
	},
	screenshot: {
		type: Sequelize.STRING,
		defaultValue: '',
	},
	url: {
		type: Sequelize.STRING,
		defaultValue: null,
	},
	spoiler: {
		type: Sequelize.BOOLEAN,
		field: 'spoils'
	},
	created: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
	},
	edited: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
	},
	befores: {
		type: Sequelize.TEXT,
		defaultValue: null,
	},
	has_edit: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	is_rm: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	// Todo?
	poll_id: {
		type: Sequelize.INTEGER,
		defaultValue: null,
	},
	want_opinion: {
		type: Sequelize.INTEGER,
		defaultValue: false,
	},
	topic_tag: {
		type: Sequelize.INTEGER,
		defaultValue: null,
	},
	status: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
}, {
	paranoid: true,
	freezeTableName: true,
	tableName: 'closedverse_main_post',
	timestamps: false,
});
Post.belongsTo(User, {as: 'creator', foreignKey: 'creator_id'});
Post.belongsTo(Community, {as: 'community', foreignKey: 'community_id'});
Profile.belongsTo(Post, {as: 'favorite', foreignKey: 'favorite_id'});
Post.prototype.isReply = false;
Post.prototype.belongsTo = function(user) {
	if(!user.is_authenticated) {
		return false;
	}
	if(this.creator_id == user.id) {
		return true;
	}
	return false;
}
Post.prototype.yt = function() {
	var test = /(?:http(?:s)?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi)\/))([^\?&\"'<> #]+)/.exec(this.url);
	if(test) {
		return test[1];
	}
	return false;
}
Post.prototype.hasLineTrun = function() {
	if(this.body) {
		var lines = this.body.split('\n').length;
		if(lines > 17) {
			return true;
		}
		return false;
	}
	return false;
}
Post.prototype.trun = function() {
	if(this.is_rm) {
		return 'deleted';
	} if(this.drawing) {
		return 'drawing';
	}
	return this.body;
}

Post.prototype.gethasYeah = async function(user) {
	if(!user.is_authenticated) {
		return false;
	}
	var yeahs = await Yeah.count({
		where: {
			post_id: this.id,
			by_id: user.id,
		}
	});
	if(yeahs) {
		return true;
	}
	return false;
}
Post.prototype.canYeah = function(user) {
	if(!user.is_authenticated) {
		return false;
	}
	if(this.creator_id == user.id) {
		return false;
	}
	return true;
}

Post.prototype.getnumYeahs = function() {
	return Yeah.count({
		where: {
			post_id: this.id,
		}
	});
}
Post.prototype.getnumComments = function() {
	return Comment.count({
		where: {
			original_post_id: this.id,
			is_rm: false,
		}
	});
}

Post.prototype.canRemove = function(user) {
	if(!user.is_authenticated) {
		return false;
	}
	if(this.creator_id == user.id) {
		return true;
	}
	if(user.level > this.creator.level) {
		return true;
	}
	if(this.creator.staff) {
		return false;
	}
	if(user.staff) {
		return true;
	}
	return false;
}


var Comment = db.define('comment', {
	unique_id: {
		type: DataTypes.UUID,
		defaultValue: function() {
			return uuidv4().replace(/-/g, '');
		},
	},
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	feeling: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
	body: Sequelize.TEXT,
	drawing: {
		type: Sequelize.STRING,
		defaultValue: '',
	},
	screenshot: {
		type: Sequelize.STRING,
		defaultValue: '',
	},
	spoiler: {
		type: Sequelize.BOOLEAN,
		field: 'spoils'
	},
	created: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
	},
	edited: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
	},
	befores: {
		type: Sequelize.TEXT,
		defaultValue: null,
	},
	has_edit: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	is_rm: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	status: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
}, {
	paranoid: true,
	freezeTableName: true,
	tableName: 'closedverse_main_comment',
	timestamps: false,
});
Comment.belongsTo(User, {as: 'creator', foreignKey: 'creator_id'});
Comment.belongsTo(Community, {as: 'community', foreignKey: 'community_id'});
Comment.belongsTo(Post, {as: 'original_post', foreignKey: 'original_post_id'});
Comment.prototype.isReply = true;
Comment.prototype.belongsTo = function(user) {
	if(!user.is_authenticated) {
		return false;
	}
	if(user.id == this.creator_id) {
		return true;
	}
	return false;
}

Comment.prototype.trun = function() {
	if(this.is_rm) {
		return 'deleted';
	} if(this.drawing) {
		return 'drawing';
	}
	return this.body;
}

Comment.prototype.gethasYeah = async function(user) {
	if(!user.is_authenticated) {
		return false;
	}
	var yeahs = await Yeah.count({
		where: {
			comment_id: this.id,
			by_id: user.id,
		}
	});
	if(yeahs) {
		return true;
	}
	return false;
}
Comment.prototype.canYeah = function(user) {
	if(!user.is_authenticated) {
		return false;
	}
	if(this.creator_id == user.id) {
		return false;
	}
	return true;
}

Comment.prototype.getnumYeahs = function() {
	return Yeah.count({
		where: {
			comment_id: this.id,
		}
	});
}

Comment.prototype.canRemove = function(user) {
	if(!user.is_authenticated) {
		return false;
	}
	if(this.creator_id == user.id) {
		return true;
	}
	if(user.level > this.creator.level) {
		return true;
	}
	if(this.creator.staff) {
		return false;
	}
	if(user.staff) {
		return true;
	}
	return false;
}


var Yeah = db.define('yeah', {
	id: {
		// This is actually a UUID
		type: DataTypes.UUID,
		defaultValue: function() {
			return uuidv4().replace(/-/g, '');
		},
		primaryKey: true,
		autoIncrement: true,
	},
	created: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
	},
	type: Sequelize.INTEGER,
}, {
	freezeTableName: true,
	tableName: 'closedverse_main_yeah',
	timestamps: false,
});
Yeah.belongsTo(User, {as: 'by', foreignKey: 'by_id'});
Post.hasMany(Yeah, {as: 'postYeahs', foreignKey: 'post_id'});
Yeah.belongsTo(Post, {foreignKey: 'post_id'});
Yeah.belongsTo(Comment, {as: 'comment', foreignKey: 'comment_id'});

// Finally, load Express
var app = express();

// remove this
app.get('/alive', function(req, res){res.send()});
// \/remove this

// Middlewares


// Use public for static directory in /s/
app.use('/s/', express.static('public'));
// Parsers and stuff
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
// Multer, for multipart forms when we submit them
app.use(upload.single('form'));
// Use csrf protection too
app.use(csrf({cookie: true}));
// Sessions
app.set('trust proxy', 1);
app.use(cookieSession({
	name: 'cl-sessionid',
	secret: config.secret
	//cookie: {secure: true}
}));
// Middleware to log in
app.use(async function(req, res, next) {
	// If there's a user_id,
	req.user = {is_authenticated: false};
	if(req.session.user_id) {
		// then find the user
		var user = User.findById(req.session.user_id)
		.then(function(user) {
			// and set req.user to user
			if(user) {
				req.user = user;
			}
			next();
		})
		.catch(function() {
			next();
		});
	} else {
		next();
	}

});

// Configure Nunjucks, use views as directory
var django = nunjucks.configure('views', {
	autoescape: true,
	express: app
});
// Response time, available in template as time
app.use(responseTime(function(req, res, time) {
	django.addGlobal('time', time);
}));

// Middleware to add globals to nunjucks and some headers
app.use(function(req, res, next) {
	django.addGlobal('req', req);
	// XSS vulnerability but no HTML is going to get in here.. right?
	django.addGlobal('csrf_token', '<input type="hidden" name="_csrf" value="' + req.csrfToken() + '">');
	django.addGlobal('csrf_token_raw', req.csrfToken());
	// pjax: Returns true if the request is PJAX
	django.addGlobal('pjax', Boolean(req.headers['x-pjax']));
	//django.addGlobal('pjax_container', req.get('X-PJAX-Container') || 'container');
	req.url = req.protocol + '://' + req.get('host') + req.originalUrl;

	// Nunjucks custom tags
	function ClosedExtension() {
		this.tags = ['time', 'user_icon_container', 'yeah_button', ];

		this.parse = function(parser, nodes, lexer) {
			var tok = parser.nextToken();
			var args = parser.parseSignature(null, true);
			parser.advanceAfterBlockEnd(tok.value);
			return new nodes.CallExtension(this, tok.value, args);
		}
		this.time = function(context, args) {
			return new nunjucks.runtime.SafeString(args);
		}
		this.user_icon_container = function(context, args) {
			return new nunjucks.runtime.markSafe(nunjucks.renderString('<a href="/users/{{ user.username }}" class="icon-container {{ user.doClass(0) }} {% if user.onlineStatus() == true %}online{% elif user.onlineStatus() == 2 %}afk{% elif user.onlineStatus() == false %}offline{% endif %}"><img src="{{ user.doAvatar(feeling) }}" class="icon"></a>', {
				user: args.user,
				feeling: args.feeling
			}));
		}
		this.yeah_button = function(context, args) {
			var yeah_text;
			if(args.appear == true) {
				yeah_text = 'Unyeah';
			} else {
				switch(args.feeling) {
					case 2:
						yeah_text = 'Yeah\u2665';
						break;
					case 3:
						yeah_text = 'Yeah!?';
						break;
					case 4:
						yeah_text = 'Yeah...';
						break;
					case 5:
						yeah_text = 'Yeah...';
						break;

					default:
						yeah_text = 'Yeah!';
				}
			}
			return new nunjucks.runtime.SafeString(yeah_text);
		}
	}
	django.addExtension('ClosedExtension', new ClosedExtension());


	// Set X-Powered-By header
	res.setHeader('X-Powered-By', 'Sony Computer Entertainment Inc.');
	next();
});

// Start routes
// Login
async function loginPage(req, res) {
	res.render('login.html');
}
async function loginForm(req, res) {
	await User.findOne({
		where: {
			username: req.body.username
		}
	}).then(async function(user) {
		var verify = await util.bcrypt_sha256.verify(req.body.password, user.password);
		if(!verify) {
			res.status(401).send('Invalid password.');
		} else {
			// Success, set session
			req.session.user_id = user.id;
			// Send back 202
			res.status(202).send();
		}
	}).catch(function() {
		res.status(404).send('That user doesn\'t exist.');
	});
}

// Login required middleware
function loginRequired(req, res, next) {
	if(!req.user.is_authenticated) {
		res.status(401).send();
		return;
	}
	next();
}

// Communities
async function displayCommunities(req, res) {
	var general, game, special, featured;
	var prepareCommunities = function(result) {
		result.forEach(function(community) {
			community.setupIcon();
		});
	};
	await Community.findAll({
		order: [['created', 'DESC']],
		group: ['id', 'is_feature', 'type'],
		where: {
			is_rm: false,
		},
		// NO LIMIT. This should be fixed soon, but I'm too lazy.
		//limit: 8,
	}).then(function(communities) {
		prepareCommunities(communities);
		// general var: filters communities for type = 0
		general = communities.filter(function(a) {return a.type == 0}).slice(0, 8);
		// game: type 1
		game = communities.filter(function(a) {return a.type == 1}).slice(0, 8);
		// game: type 2
		special = communities.filter(function(a) {return a.type == 2}).slice(0, 8);
		// featured communities
		featured = communities.filter(function(a) {return a.is_feature == true}).slice(0, 8);
	})
	.catch(function() {
		throw404(req, res);
	});
	/*
	await Community.findAll({
		order: [['created', 'DESC']],
		limit: 8,
		where: {type: 0, is_rm: false},
		raw: true
	}).then(function(communities) {
		general = communities;
		prepareCommunities(communities);
	});
	await Community.findAll({
		order: [['created', 'DESC']],
		limit: 8,
		where: {type: 1, is_rm: false},
		raw: true
	}).then(function(communities) {
		game = communities;
		prepareCommunities(communities);
	});
	await Community.findAll({
		order: [['created', 'DESC']],
		limit: 8,
		where: {type: 2, is_rm: false},
		raw: true
	}).then(function(communities) {
		special = communities;
		prepareCommunities(communities);
	});
	await Community.findAll({
		order: [['created', 'DESC']],
		limit: 8,
		where: {is_feature: true, is_rm: false},
		raw: true
	}).then(function(communities) {
		featured = communities;
		prepareCommunities(communities);
	});
	*/

	res.render('index.html', {
		title: "Communities",
		memo_title: config.memo_title,
		memo_msg: config.memo_msg,
		general: general,
		game: game,
		special: special,
		featured: featured,
	});
}
async function displayAllCommunities(req, res) {
	var type;
	switch(req.params[0]) {
		case 'general':
			type = 0;
			break;
		case 'game':
			type = 1;
			break;
		case 'special':
			type = 2;
			break;

		default:
			throw404(req, res);
			return;
	}
	var prepareCommunities = function(result) {
		result.forEach(function(community) {
			community.setupIcon();
		});
	};
	await Community.findAll({
		order: [['created', 'DESC']],
		where: {
			is_rm: false,
			type: type,
		},
		limit: 20,
		offset: req.query.offset,
	}).then(function(communities) {
		var offset, next_offset, back_offset;
		communities.forEach(function(community) {
			community.setupIcon();
		});
		// Offset will be 0 if req.query.offset is false
		offset = Number(req.query.offset) || 0;
		if(communities.length > 19) {
			next_offset = 20 + offset;
		} else {
			next_offset = 0;
		}

		if(offset && offset > 0) {
			back_offset = offset - 20;
		} else {
			back_offset = undefined;
		}

		res.render('communities-all.html', {
			title: "View all communities",
			communities: communities,
			type: type,
			next_offset: next_offset,
			back_offset: back_offset,
		});
	})
	.catch(function() {
		throw404(req, res);
	});

}
async function searchCommunities(req, res) {
	if(!req.query.q) {
		throw404(req, res);
		return;
	}
	var communities;
	// Escape query string
	var inputRaw = req.query.q.replace(/(_|%|\\)/g, '\\$1');
	var inputEscaped = db.escape('%' + inputRaw + '%').toLowerCase();
	var input = db.literal(inputEscaped + ' ESCAPE \'\\\\\'');
	await Community.findAll({
		order: [['name', 'ASC']],
		where: {
			is_rm: false,
			[Op.or]: [{
				name: {
					[Op.like]: input,
				}
			}, {
				description: {
					[Op.like]: input,
				}
			}]
		},
		limit: 20
	}).then(function(communities) {
		communities.forEach(function(community) {
			community.setupIcon();
		});
		res.render('communities-search.html', {
			title: "Search communities",
			classes: ['search'],
			communities: communities,
		});
	})
	.catch(function() {
		throw404(req, res);
	});
}
async function communityPosts(req, res) {
	var community = await Community.findById(req.params['id']);
	if(!community) {
		throw404(req, res);
		return;
	}
	if(community.is_rm) {
		throw404(req, res);
		return;
	}
	community.setupIcon();
	var posts;
	await Post.findAll({
		order: [['created', 'DESC']],
		where: {
			community_id: community.id,
			is_rm: false,
		},
		include: [{
				model: User,
				as: 'creator',
		}, ],
			limit: 50,
			offset: req.query.offset,
	}).then(function(result) {
		posts = result;
		posts.asyncforEach(async function(post) {
			post.num_yeahs = await post.getnumYeahs();
			post.num_comments = await post.getnumComments();
			post.has_yeah = await post.gethasYeah(req.user);
		}).then(function() {
			res.render('community-posts.html', {
				title: community.name,
				community: community,
				posts: posts,
			});
		});
	});
}
// Posts
async function createPost(req, res) {
	await Community.findById(req.body.community)
	.then(async function(community) {
		// Validate user for posting
			if(!community.canPost(req.user)) {
				rres.status(403).send();
				return;
			}
			if(await req.user.hasPostWait(10)) {
				jsonErr(req, res, "You're posting too fast, please wait and try again.");
				return;
			}
		// Now validate the actual post
			if(req.body.url) {
				if(!validUrl.isWebUri(req.body.url)) {
					jsonErr(req, res, "Invalid URL.");
					return;
				}
			}
			if(req.body.body) {
				if(req.body.body.length > 2200) {
					jsonErr(req, res, "Your post is too long.");
					return;
				}
			} else {
				jsonErr(req, res, "Your post is blank.");
				return;
			}
		// Upload images .. ???
			if(req.body.screenshot) {
				jsonErr(req, res, "image upload");
				return;
			}

		// Make the post
		await Post.create({
			community_id: community.id,
			creator_id: req.user.id,
			body: req.body.body,
			feeling: Number(req.body.feeling_id),
			spoiler: Boolean(req.body.is_spoiler),
			url: req.body.url,
		}).then(function(post) {
			var singlePost = [post];
			singlePost[0].creator = req.user;
			singlePost[0].community = community;
			singlePost[0].num_yeahs = 0;
			singlePost[0].num_comments = 0;
			res.render('elements/post-list.html', {
				posts: singlePost,
				type: 0,
				withCommunityContainer: false,
				me: req.user,
			});
		})
		.catch(function() {
			res.status(500).send();
		});

	})
	.catch(function() {
		res.status(404).send();
	});
}
async function createComment(req, res) {
	await Post.findById(req.params['id'], {
		where: {
			is_rm: false,
		}
	})
	.then(async function(post) {
		// Validate user for posting
			if(await req.user.hasPostWait(10)) {
				jsonErr(req, res, "You're posting too fast, please wait and try again.");
				return;
			}
		// Now validate the actual post
			if(req.body.body) {
				if(req.body.body.length > 2200) {
					jsonErr(req, res, "Your comment is too long.");
					return;
				}
			} else {
				jsonErr(req, res, "Your comment is blank.");
				return;
			}
		// Upload images .. ???
			if(req.body.screenshot) {
				jsonErr(req, res, "image upload");
				return;
			}

		// Make the post
		await Comment.create({
			original_post_id: post.id,
			community_id: post.community_id,
			creator_id: req.user.id,
			body: req.body.body,
			feeling: Number(req.body.feeling_id),
			spoiler: Boolean(req.body.is_spoiler),
		}).then(function(comment) {
			var singleComment = [comment];
			singleComment[0].creator = req.user;
			singleComment[0].num_yeahs = 0;
			res.render('elements/comment-list.html', {
				comments: singleComment,
			});
		})
		.catch(function() {
			res.status(500).send();
		});

	})
	.catch(function() {
		res.status(404).send();
	});
}
async function postYeah(req, res) {
	var post = await Post.findById(req.params['id']);
	if(!post) {
		throw404(req, res);
		return;
	}
	var canYeah = post.canYeah(req.user);
	var hasYeah = await post.gethasYeah(req.user);
	if(!canYeah) {
		jsonErr(req, res, "You cannot give a Yeah to this post.");
		return;
	}
	if(hasYeah) {
		jsonErr(req, res, "You have already given a Yeah to this post.");
		return;
	}
	await Yeah.create({
		by_id: req.user.id,
		type: 0,
		post_id: post.id,
	}).then(function() {
		res.send();
		return;
	})
	.catch(function() {
		res.status(500).send();
		return;
	});
}
async function postUnyeah(req, res) {
	var post = await Post.findById(req.params['id']);
	if(!post) {
		throw404(req, res);
		return;
	}
	var hasYeah = await post.gethasYeah(req.user);
	if(!hasYeah) {
		jsonErr(req, res, "You have not given a Yeah to this post.");
		return;
	}
	await Yeah.findOne({
		where: {
			by_id: req.user.id,
			post_id: post.id,
		}
	}).then(function(yeah) {
		yeah.destroy();
		res.send();
		return;
	})
	.catch(function() {
		res.status(404).send();
		return;
	});
}

async function commentYeah(req, res) {
	var comment = await Comment.findById(req.params['id']);
	if(!comment) {
		throw404(req, res);
		return;
	}
	var canYeah = comment.canYeah(req.user);
	var hasYeah = await comment.gethasYeah(req.user);
	if(!canYeah) {
		jsonErr(req, res, "You cannot give a Yeah to this comment.");
		return;
	}
	if(hasYeah) {
		jsonErr(req, res, "You have already given a Yeah to this comment.");
		return;
	}
	await Yeah.create({
		by_id: req.user.id,
		type: 0,
		comment_id: comment.id,
	}).then(function() {
		res.send();
		return;
	})
	.catch(function() {
		res.status(500).send();
		return;
	});
}
async function commentUnyeah(req, res) {
	var comment = await Comment.findById(req.params['id']);
	if(!comment) {
		throw404(req, res);
		return;
	}
	var hasYeah = await comment.gethasYeah(req.user);
	if(!hasYeah) {
		jsonErr(req, res, "You have not given a Yeah to this comment.");
		return;
	}
	await Yeah.findOne({
		where: {
			by_id: req.user.id,
			comment_id: comment.id,
		}
	}).then(function(yeah) {
		yeah.destroy();
		res.send();
		return;
	})
	.catch(function() {
		res.status(404).send();
		return;
	});
}

async function postView(req, res) {
	var post = await Post.findById(req.params['id'], {
		include: [{
				model: User,
				as: 'creator',
		}, {
				model: Community,
				as: 'community',
		}, ],
	});
	if(!post) {
		throw404(req, res);
		return;
	}
	if(post.is_rm) {
		throw404(req, res);
		return;
	}
	post.num_yeahs = await post.getnumYeahs();
	post.num_comments = await post.getnumComments();
	post.has_yeah = await post.gethasYeah(req.user);
	post.community.setupIcon();

	var yeahs = await Yeah.findAll({
		attributes: [],
		order: [['created', 'DESC']],
		include: [{
				model: User,
				as: 'by',
		}],
		where: {
			post_id: post.id
		},
		limit: 50
	});
	await Comment.findAll({
		order: [['created', 'ASC']],
		where: {
			original_post_id: post.id,
			is_rm: false,
		},
		include: [{
				model: User,
				as: 'creator',
		}, ],
			limit: 20,
			offset: req.query.offset,
	}).then(function(result) {
		comments = result;
		comments.asyncforEach(async function(comment) {
			comment.num_yeahs = await comment.getnumYeahs();
			comment.has_yeah = await comment.gethasYeah(req.user);
		}).then(function() {
			res.render('post-view.html', {
				title: post.creator.nickname + "'s post",
				post: post,
				yeahs: yeahs,
				comments: comments,
			});
		});
	});
}
async function commentView(req, res) {
	var comment = await Comment.findById(req.params['id'], {
		include: [{
				model: User,
				as: 'creator',
		}, {
				model: Community,
				as: 'community',
		},
		{
				model: Post,
				as: 'original_post',
				include: [{
					model: User,
					as: 'creator',
				}, ]
		}, ],
	});
	if(!comment) {
		throw404(req, res);
		return;
	}
	if(comment.is_rm) {
		throw404(req, res);
		return;
	}
	comment.num_yeahs = await comment.getnumYeahs();
	comment.has_yeah = await comment.gethasYeah(req.user);
	comment.community.setupIcon();

	var yeahs = await Yeah.findAll({
		attributes: [],
		order: [['created', 'DESC']],
		include: [{
				model: User,
				as: 'by',
		}],
		where: {
			comment_id: comment.id
		},
		limit: 50
	});
	res.render('comment-view.html', {
		title: comment.creator.nickname + "'s comment on " + comment.original_post.creator.nickname + "'s post'",
		comment: comment,
		yeahs: yeahs,
	});
}

async function postRemove(req, res) {
	var post = await Post.findById(req.params['id'], {
		include: [{
				model: User,
				as: 'creator',
		}, ],
	});
	if(!post) {
		throw404(req, res);
		return;
	}
	if(post.is_rm) {
		jsonErr(req, res, "This post has already been deleted.");
		return;
	}
	if(!post.canRemove(req.user)) {
		jsonErr(req, res, "You cannot delete this post.");
		return;
	}
	// "Delete"
	var status = 0;
	if(req.user.id == post.creator_id) {
		// Delete by user
		status = 1;
	} else {
		// Delete by authority
		status = 2;
	}
	await post.update({
		is_rm: true,
		status: status,
	}).then(function() {
		res.send();
		return;
	})
	.catch(function() {
		res.status(500).send();
		return;
	});
}
async function commentRemove(req, res) {
	var comment = await Comment.findById(req.params['id'], {
		include: [{
				model: User,
				as: 'creator',
		}, ],
	});
	if(!comment) {
		throw404(req, res);
		return;
	}
	if(comment.is_rm) {
		jsonErr(req, res, "This comment has already been deleted.");
		return;
	}
	if(!comment.canRemove(req.user)) {
		jsonErr(req, res, "You cannot delete this comment.");
		return;
	}
	// "Delete"
	var status = 0;
	if(req.user.id == comment.creator_id) {
		// Delete by user
		status = 1;
	} else {
		// Delete by authority
		status = 2;
	}
	await comment.update({
		is_rm: true,
		status: status,
	}).then(function() {
		res.send();
		return;
	})
	.catch(function() {
		res.status(500).send();
		return;
	});
}

async function userView(req, res) {
	var user = await User.findOne({
		where: {
			username: req.params['id'],
		},
	});
	if(!user) {
		throw404(req, res);
		return;
	}
	if(user.is_rm) {
		throw404(req, res);
		return;
	}
	user.profile = await user.getProfile(true);

	user.has_follow = await user.gethasFollow(req.user);
	user.friends_count = await user.getfriendsCount(req.user);
	user.following_count = await user.getfollowingCount(req.user);
	user.followers_count = await user.getfollowersCount(req.user);
	user.posts_count = await user.getpostsCount(req.user);
	user.comments_count = await user.getcommentsCount(req.user);
	user.yeahs_count = await user.getyeahsCount(req.user);
	user.profile.yeahs_visible = await user.profile.getyeahsVisible(req.user);
	user.profile.comments_visible = await user.profile.getcommentsVisible(req.user);
	user.profile.origin_id_public = await user.profile.getpublicOriginId(req.user);

	var posts = await Post.findAll({
		order: [['created', 'DESC']],
		where: {
			creator_id: user.id,
			is_rm: false,
		},
		include: [{
				model: Community,
				as: 'community',
		}, ],
		limit: 10

	});
	/*var yeahedPosts = await Yeah.findAll({
		where: {
			by_id: user.id,
		},
		where: db.where(db.col('post.is_rm'), false),
		include: [{
				model: Post,
				as: 'post',
				include: [{
					model: Community,
					as: 'community',
				}, ],
		}, ],
		limit: 10
	});*/
	await posts.asyncforEach(async function(post) {
		post.creator = user;
		post.num_yeahs = await post.getnumYeahs();
		post.num_comments = await post.getnumComments();
		post.has_yeah = await post.gethasYeah(req.user);
	});
	/*await yeahedPosts.asyncforEach(async function(post) {
		post = post.post;
		post.creator = user;
		post.num_yeahs = await post.getnumYeahs();
		post.num_comments = await post.getnumComments();
		post.has_yeah = await post.gethasYeah(req.user);
	});*/
	res.render('user-view.html', {
		title: user.nickname + "'s profile",
		user: user,
		profile: user.profile,
		posts: posts,
		yeahedPosts: []
		//yeahedPosts: yeahedPosts,
	});
}

app.get('/login', loginPage);
app.post('/login', loginForm);

app.get('/', displayCommunities);
app.get('/communities', displayCommunities);
app.get(/^\/communities\/all\/(general|game|special+)$/, displayAllCommunities);
app.get('/communities/search', searchCommunities);
app.get('/communities/:id', communityPosts);
app.post('/posts', loginRequired, createPost);
app.post('/posts/:id/comments', loginRequired, createComment);
app.post('/posts/:id/yeah', loginRequired, postYeah);
app.post('/posts/:id/yeah.destroy', loginRequired, postUnyeah);
app.post('/comments/:id/yeah', loginRequired, commentYeah);
app.post('/comments/:id/yeah.destroy', loginRequired, commentUnyeah);
app.get('/posts/:id', postView);
app.get('/comments/:id', commentView);
app.post('/posts/:id.destroy', loginRequired, postRemove);
app.post('/comments/:id.destroy', loginRequired, commentRemove);

app.get('/users/:id', userView);

// Middleware to send a JSON error
async function jsonErr(req, res, message, title = 0) {
	res.status(400).json({success: false, errors: [{message: message, error_code: title}], code: 400});
}
// CSRF error handler
app.use(function(err, req, res, next) {
	if(err.code !== 'EBADCSRFTOKEN') return next(err);
	res.status(403).send('invalid csrf token');
});
// 404 handler, also used for rejected query promises
async function throw404(req, res) {
	res.status(404).render('404.html');
}
app.use(throw404);
// 500 handler?
async function throw500(req, res) {
	res.status(500).render('500.html');
}

app.listen(3000, function() {console.log('Example app listening on port 3000!')});

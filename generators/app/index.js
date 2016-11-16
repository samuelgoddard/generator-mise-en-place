'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var miseEnPlaceGenerator = yeoman.generators.Base.extend({
	init: function () {
		this.on('end', function () {
			if (!this.options['skip-install']) {
				this.installDependencies();
        this.log(chalk.green('...All done! Thanks for generating me! :)'));
			}
		});
	},

	askFor: function () {
		var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Oh hi... Welcome to the ' + chalk.red('Mise-En-Place Generator')
    ));

		var prompts = [
			{
				name: 'user_name',
				message: 'What is your name? [used for bower etc] - default (user_name)',
				default: 'user_name'
			},
			{
				name: 'rootDirectory',
				message: 'What is your project name? [used for root file structure]',
				default: 'new-project'
			},
			{
				type: 'confirm',
				name: 'fontawesome',
				message: 'Do you use font-awesome? default(Yes)',
				default: 'Y/n'
			},
			{
				name: 'jqueryversion',
				message: 'jQuery version? default(latest)'
			}
		];

		this.prompt(prompts, function (props) {
			this.user_name = props.user_name;
			this.rootDirectory = props.rootDirectory;
			this.fontawesome = props.fontawesome;
			this.jqueryversion = props.jqueryversion;
			done();
		}.bind(this));
	},

	app : function () {

		this.mkdir(this.rootDirectory);
		this.mkdir(this.rootDirectory + '/assets');
		this.mkdir(this.rootDirectory + '/assets/styles');
		this.mkdir(this.rootDirectory + '/assets/js');

		if(this.fontawesome){
			this.mkdir(this.rootDirectory + '/assets/fonts');
		}

    this.copy('_index.html', this.rootDirectory + '/index.html');

		this.mkdir(this.rootDirectory + '/assets/styles/atoms');
    this.mkdir(this.rootDirectory + '/assets/styles/config');
    this.mkdir(this.rootDirectory + '/assets/styles/forms');
    this.mkdir(this.rootDirectory + '/assets/styles/layout');
    this.mkdir(this.rootDirectory + '/assets/styles/lib');
    this.mkdir(this.rootDirectory + '/assets/styles/molecules');
    this.mkdir(this.rootDirectory + '/assets/styles/quarks');
    this.mkdir(this.rootDirectory + '/assets/styles/state');
    this.mkdir(this.rootDirectory + '/assets/styles/tools');
    this.mkdir(this.rootDirectory + '/assets/styles/utilities');
    this.mkdir(this.rootDirectory + '/assets/styles/webfonts');
    this.copy('assets/styles/_debug.scss', this.rootDirectory + '/assets/styles/_debug.scss');
    this.copy('assets/styles/_imports.scss', this.rootDirectory + '/assets/styles/_imports.scss');
    this.copy('assets/styles/_normalise.scss', this.rootDirectory + '/assets/styles/_normalise.scss');
    this.copy('assets/styles/_shame.scss', this.rootDirectory + '/assets/styles/_shame.scss');
    this.copy('assets/styles/ie8.scss', this.rootDirectory + '/assets/styles/ie8.scss');
    this.copy('assets/styles/main.scss', this.rootDirectory + '/assets/styles/main.scss');

		this.template('_Gruntfile.js', this.rootDirectory + '/Gruntfile.js');
		this.template('_package.json', this.rootDirectory + '/package.json');
		this.template('_bower.json', this.rootDirectory + '/bower.json');
		this.template('bowerrc', this.rootDirectory + '/.bowerrc');
	},

});

module.exports = miseEnPlaceGenerator;

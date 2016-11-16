'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var miseEnPlaceGenerator = yeoman.generators.Base.extend({
  init: function () {
		this.pkg = require('../package.json');

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
				message: 'What is your name? default (user_name)',
				default: 'user_name'
			},
			{
				name: 'project_name',
				message: 'What is your project name?',
				default: 'project-name'
			},
			{
				type: 'confirm',
				name: 'fontawesome',
				message: 'Do you use font-awesome? default(Yes)',
				default: 'Y/n'
			}
		];

		this.prompt(prompts, function (props) {
			this.user_name = props.user_name;
			this.project_name = props.project_name;
			this.fontawesome = props.fontawesome;
			done();
		}.bind(this));
	},

	app: function () {

		this.mkdir('assets');
		this.mkdir('assets/styles');
		this.mkdir('assets/js');

		if(this.fontawesome){
			this.mkdir('assets/fonts');
		}

    this.copy('_index.html', 'index.html');

		this.mkdir('assets/styles/atoms');
    this.mkdir('assets/styles/config');
    this.mkdir('assets/styles/forms');
    this.mkdir('assets/styles/layout');
    this.mkdir('assets/styles/lib');
    this.mkdir('assets/styles/molecules');
    this.mkdir('assets/styles/quarks');
    this.mkdir('assets/styles/state');
    this.mkdir('assets/styles/tools');
    this.mkdir('assets/styles/utilities');
    this.mkdir('assets/styles/webfonts');
    this.template('assets/styles/_debug.scss','assets/styles/_debug.scss');
    this.template('assets/styles/_imports.scss','assets/styles/_imports.scss');
    this.template('assets/styles/_normalise.scss','assets/styles/_normalise.scss');
    this.template('assets/styles/_shame.scss','assets/styles/_shame.scss');
    this.template('assets/styles/ie8.scss','assets/styles/ie8.scss');
    this.template('assets/styles/main.scss','assets/styles/main.scss');

		this.template('_Gruntfile.js', 'Gruntfile.js');
		this.template('_package.json', 'package.json');
	},
});

module.exports = miseEnPlaceGenerator;

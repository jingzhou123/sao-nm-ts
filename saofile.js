const superb = require('superb')

module.exports = {
  description: 'Scaffolding out a ts module.',
  prompts() {
    return [
      {
        name: 'name',
        message: 'What is the name of the new project',
        default: this.outFolder
      },
      {
        name: 'description',
        message: 'How would you describe the new project',
        default: `my ${superb()} project`
      },
      {
        name: 'author',
        message: 'What is your name',
        default: this.gitUser.name,
        store: true,
        required: true
      },
      {
        name: 'username',
        message: 'What is your GitHub username',
        default: ({ author }) => this.gitUser.username || author.toLowerCase(),
        store: true
      },
      {
        name: 'email',
        message: 'What is your GitHub email',
        default: this.gitUser.email,
        store: true,
        validate: v => /.+@.+/.test(v)
      }
    ]
  },
  actions() {
    return [
      {
        type: 'add',
        files: '**'
      },
      {
        type: 'move',
        patterns: {
          // We keep `.gitignore` as `gitignore` in the project
          // Because when it's published to npm
          // `.gitignore` file will be ignored!
          gitignore: '.gitignore',
          '_package.json': 'package.json'
        }
      },
      {
        type: 'modify',
        files: 'package.json',
        handler: data => require('./lib/update-pkg')(this.answers, data)
      }
    ]
  },
  async completed() {
    await this.gitInit()
    await this.npmInstall({ packageManager: this.answers.pm })
    this.showProjectTips()
  }
}

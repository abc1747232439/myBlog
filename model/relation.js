// 这是用来处理关系的
const Article = require('./tables/article')
const User = require('./tables/user')
const ArticleWord = require('./tables/articleword')
const MyWord = require('./tables/myword')
const Classify = require('./tables/classify')

//用户喜欢的文章 多对多
Article.belongsToMany(User, { through: 'like', foreignKey:'articleId' })
User.belongsToMany(Article, { through: 'like', foreignKey:'userId' })

// 文章分类 一对多
Classify.hasMany(Article, {
    foreignKey: 'classifyId',
})
Article.belongsTo(Classify)

// 一篇文章可以有多个评论
Article.hasMany(ArticleWord, {
    foreignKey: 'articleId',
    onDelete:"CASCADE"
}) 
ArticleWord.belongsTo(Article)

User.hasMany(ArticleWord, {
    foreignKey: 'userId'
})
ArticleWord.belongsTo(User)

// 一个用户可以留言多次
User.hasMany(MyWord, {
    foreignKey: 'userId',
    onDelete:"CASCADE"
})
MyWord.belongsTo(User)

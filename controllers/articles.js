const Article = require('../models/articles')

exports.getAllArticles = (req, res) => {
    res.json(Article.getAllArticles())
}

exports.getArticleById = (req, res) => {
    const article = Article.getArticle(parseInt(req.params.id))
    if (!article)
        res.status(404).json({ error: 'Article not found' })
    res.json(article)
}

exports.createArticle = (req, res) => {
    const { title, content } = req.body
    if (!title || !content)
    return res.status(400).json({ error: 'Title and content required' })

    const newArticle = Article.createArticle(title, content)
    res.status(201).location(`/api/articles/${newArticle.id}`).end()
}

exports.patchArticle = (req, res) => {
  const id = parseInt(req.params.id);
  const article = Article.getArticle(id);

  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }

  const { title, content } = req.body;

  if (title !== undefined) article.title = title;
  if (content !== undefined) article.content = content;

  res.json(article);
}

// DELETE (מחיקה)
exports.deleteArticle = (req, res) => {
  const id = parseInt(req.params.id);
  const success = Article.deleteArticle(id);

  if (!success) {
    return res.status(404).json({ error: 'Article not found' });
  }

  res.status(204).end(); 
}


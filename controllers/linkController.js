const linkService = require('../services/linkService');

async function getLinks(req, res) {
  try {
    const links = await linkService.getLinks(req.query.url);
    res.status(200).json(links);
  } catch (error) {
    res.status(500).json({ ErrorMessage: 'Error fetching links', error });
  }
}

async function createLink(req, res) {
  try {
    const newLink = await linkService.createLink(req.body.url);
    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ ErrorMessage: 'Error creating link', error });
  }
}

async function deleteLink(req, res) {
  try {
    const deletedLink = await linkService.deleteLink(req.body.url);
    if (!deletedLink) {
      return res.status(404).json({ ErrorMessage: 'Link not found' });
    }
    res.status(204).json({ success: 'Link deleted successfully.' });
  } catch (error) {
    res.status(500).json({ ErrorMessage: 'Error deleting link', error });
  }
}

async function redirectShortURL(req, res) {
  try {
    const link = await linkService.getLongURLAndIncreaseVisits(
      req.params.shortURL
    );
    if (!link) {
      return res.status(404).json({ ErrorMessage: 'Short URL not found' });
    }

    return res.status(302).redirect(link.longURL);
    // return res.json({ hi: 'lol' });
  } catch (error) {
    return res
      .status(500)
      .json({ ErrorMessage: 'Error redirecting URL', error });
  }
}

module.exports = {
  getLinks,
  createLink,
  deleteLink,
  redirectShortURL,
};

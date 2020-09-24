const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
router.use(cookieSession({ name: 'session', keys: ['userId'] }));

const {
  getAllResourceCategories,
  getResourcesByCategoryType,
  getResourcesById,
  getResourcesByHighestRated,
  getResourcesByLowestRated,
  getResourcesByMostLiked,
  getResourcesByLeastLiked,
  getResourcesByMostCommented,
  getResourcesByLeastCommented,
  getResourcesByNewest,
  getResourcesByOldest,
  editResourceTitle,
  editResourceUrl,
  editResourceDescription,
  addNewComment,
  addNewRating,
  addNewLike,
  deleteLike,
  deleteRating,
  deleteResource,
  addNewCategory,
  deleteCategory
} = require('../Queries-helpers/resource-queries.js');

router.get("/categories", (req, res) => {
  getAllResourceCategories()
    .then((categories) => {
      res.json(categories);
    })
    .catch((e) => console.log("error:", e));
});

router.get("/categories/:type", (req, res) => {
  console.log("req params type", req.params.type)
  getResourcesByCategoryType(req.params.type)
    .then((resources) => {
      res.json(resources);
    })
    .catch((e) => console.log("error:", e));
});

router.get("/ratings-descending", (req, res) => {
  getResourcesByHighestRated()
    .then((resources) => {
      res.json(resources);
    })
    .catch((e) => console.log("error:", e));

});

router.get("/ratings-ascending", (req, res) => {
  getResourcesByLowestRated()
    .then((resources) => {
      res.json(resources);
    })
    .catch((e) => console.log("error:", e));

});

router.get("/most-liked", (req, res) => {
  getResourcesByMostLiked()
    .then((resources) => {
      res.json(resources);
    })
    .catch((e) => console.log("error:", e));

});

router.get("/least-liked", (req, res) => {
  getResourcesByLeastLiked()
    .then((resources) => {
      res.json(resources);
    })
    .catch((e) => console.log("error:", e));

});

router.get("/most-commented", (req, res) => {
  getResourcesByMostCommented()
    .then((resources) => {
      res.json(resources);
    })
    .catch((e) => console.log("error:", e));

});

router.get("/least-commented", (req, res) => {
  getResourcesByLeastCommented()
    .then((resources) => {
      res.json(resources);
    })
    .catch((e) => console.log("error:", e));

});

router.get("/sort-newest", (req, res) => {
  getResourcesByNewest()
    .then((resources) => {
      res.json(resources);
    })
    .catch((e) => console.log("error:", e));

});

router.get("/sort-oldest", (req, res) => {
  getResourcesByOldest()
    .then((resources) => {
      res.json(resources);
    })
    .catch((e) => console.log("error:", e));

});

router.get("/:resourceId", (req, res) => {
  const resourceId = req.params.resourceId;
  getResourcesById(resourceId)
    .then((resources) => {
      res.json(resources);
    })
    .catch((e) => console.log("error:", e));

});

router.patch("/:resourceId/edit-title", (req, res) => {
  const newTitleString = req.body.newTitleString;
  const resourceId = req.params.resourceId;
  editResourceTitle(newTitleString, resourceId)
    .then(() => {
      res.redirect("/");
    })
    .catch((e) => console.log("error:", e));
});

router.patch("/:resourceId/edit-url", (req, res) => {
  const newUrlString = req.body.newUrlString;
  const resourceId = req.params.resourceId;
  editResourceUrl(newUrlString, resourceId)
    .then(() => {
      res.redirect("/");
    })
    .catch((e) => console.log("error:", e));
});

router.patch("/:resourceId/edit-description", (req, res) => {
  const newText = req.body.newText;
  const resourceId = req.params.resourceId;
  editResourceDescription(newText, resourceId)
    .then(() => {
      res.redirect("/");
    })
    .catch((e) => console.log("error:", e));
});

router.post("/:resourceId/add-category", (req, res) => {
  const newCategoryString = req.body.newCategoryString;
  const resourceId = req.params.resourceId;
  const categoryFields = { resourceId, newCategoryString };
  addNewCategory(categoryFields)
    .then((resources) => {
      res.json(resources);
    })
    .catch((e) => console.log("error:", e));
});

router.post("/:resourceId/add-new-comment", (req, res) => {
  console.log("reqbody", req.body);
  const authorId = req.session.userId;
  const resourceId = req.params.resourceId;
  const comment = req.body.comment;
  const newCommentFields = { authorId, resourceId, comment };
  addNewComment(newCommentFields)
    .then((resources) => {
      res.redirect("/");
    })
    .catch((e) => console.log("error:", e));
});

router.delete("/:resourceId/delete-comment", (req, res) => {
  const authorId = req.session.userId;
  const resourceId = req.params.resourceId;
  const commentId = req.body.commentId;
  const commentFields = { authorId, resourceId, commentId };
  addNewComment(commentFields)
    .then((resources) => {
      res.redirect("/");
    })
    .catch((e) => console.log("error:", e));
});

router.post("/:resourceId/add-new-rating", (req, res) => {
  const resourceId = req.params.resourceId;
  const raterId = req.session.userId;
  const rating = req.body.rating;

  const newRatingFields = { resourceId, raterId, rating };
  addNewRating(newRatingFields)
    .then((resources) => {
      res.redirect("/");
    })
    .catch((e) => console.log("error:", e));
});

router.delete("/:resourceId/delete-rating", (req, res) => {
  const resourceId = req.params.resourceId;
  const raterId = req.session.userId;
  const ratingFields = { resourceId, raterId };
  deleteRating(ratingFields)
    .then((resources) => {
      res.redirect("/");
    })
    .catch((e) => console.log("error:", e));
});

router.post("/:resourceId/add-new-like", (req, res) => {
  const userId = req.session.userId;
  const resourceId = req.params.resourceId;
  const likeFields = { userId, resourceId };
  addNewLike(likeFields)
    .then((resources) => {
      res.redirect("/");
    })
    .catch((e) => console.log("error:", e));
});

router.delete("/:resourceId/delete-like", (req, res) => {
  const likeId = req.body.likeId;
  const resourceId = req.params.resourceId;
  const likeFields = { likeId, resourceId };
  deleteLike(likeFields)
    .then((resources) => {
      res.redirect("/");
    })
    .catch((e) => console.log("error:", e));
});

router.delete("/:resourceId/delete", (req, res) => {
  const userId = req.session.userId;
  const resourceId = req.params.resourceId;
  const resourceFields = { userId, resourceId };
  deleteResource(resourceFields)
    .then((resources) => {
      res.redirect("/");
    })
    .catch((e) => console.log("error:", e));
});

router.delete("/:resourceId/delete-category/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;
  const resourceId = req.params.resourceId;
  const categoryFields = { categoryId, resourceId };
  deleteCategory(categoryFields)
    .then(() => {
      res.redirect("/");
    })
    .catch((e) => console.log("error:", e));
});


module.exports = router;



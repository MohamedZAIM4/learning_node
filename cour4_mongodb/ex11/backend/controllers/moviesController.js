const Movie = require("../models/Movie");

module.exports.list = (req, res) => {
  Movie.find() // récupère tous les Movie
    .sort({ title: "asc" }) // trie par 'title' ascendant
    .then((movies) => {
      res.render("pages/moviesList", { movies });
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
      if (
        req.xhr ||
        (req.headers.accept && req.headers.accept.indexOf("json") !== -1)
      ) {
        return res
          .status(500)
          .json({ error: "Erreur serveur lors de la récupération des films." });
      }
      res.status(500).send("Erreur serveur lors de la récupération des films.");
    }); // amélioration: log et message utilisateur
};

// Afficher le formulaire d'ajout
module.exports.addForm = (req, res) => {
  // on demande à res.render d'afficher le fichier views/pages/movieAdd.ejs
  res.render("pages/movieAdd");
};

// Traiter les données du formulaire et sauvegarder en BD
module.exports.addSubmit = (req, res) => {
  // 1. On récupère les données envoyées par le formulaire via req.body
  // Les noms correspondants aux attributs 'name' des <input> dans le html
  const titre = req.body.title;
  const synopsis = req.body.synopsis;

  // 2. On crée un nouveau document Mongoose basé sur notre Modèle Movie
  const newMovie = new Movie({
    title: titre,
    synopsis: synopsis
  });

  // 3. On sauvegarde ce document dans la base de données MongoDB
  newMovie.save()
    .then(() => {
      // 4. Si la sauvegarde réussit, on redirige l'utilisateur vers la liste des films
      res.redirect("/movies");
    })
    .catch((error) => {
      console.error("Erreur lors de l'ajout d'un film:", error);
      res.status(500).send("Erreur serveur lors de la création du film.");
    });
};

// Afficher le formulaire de modification (pré-rempli)
module.exports.editForm = (req, res) => {
  // 1. On récupère l'ID du film depuis l'URL (ex: /movies/edit/12345)
  const movieId = req.params.id;

  // 2. On cherche le film correspondant dans la base de données
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return res.status(404).send("Film non trouvé");
      }
      // 3. On affiche la page 'movieEdit.ejs' en lui passant les données du film
      res.render("pages/movieEdit", { movie: movie });
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération du film pour édition:", error);
      res.status(500).send("Erreur serveur.");
    });
};

// Traiter les données modifiées et mettre à jour en BD
module.exports.editSubmit = (req, res) => {
  // 1. L'ID est toujours dans l'URL
  const movieId = req.params.id;
  
  // 2. Les nouvelles données viennent du formulaire
  const updatedData = {
    title: req.body.title,
    synopsis: req.body.synopsis
  };

  // 3. findByIdAndUpdate(id, data) cherche par ID et applique les modifications
  Movie.findByIdAndUpdate(movieId, updatedData)
    .then(() => {
      // 4. Si la mise à jour réussit, on retourne à la liste
      res.redirect("/movies");
    })
    .catch((error) => {
      console.error("Erreur lors de la modification du film:", error);
      res.status(500).send("Erreur serveur lors de la mise à jour.");
    });
};

// Supprimer un film
module.exports.delete = (req, res) => {
  // 1. On récupère l'ID du film depuis l'URL (le paramètre dynamique :id)
  const movieId = req.params.id;

  // 2. findByIdAndDelete(id) cherche le document par ID et le supprime de MongoDB
  Movie.findByIdAndDelete(movieId)
    .then(() => {
      // 3. Une fois supprimé, on redirige vers la liste des films
      res.redirect("/movies");
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression:", error);
      res.status(500).send("Erreur serveur lors de la suppression du film.");
    });
};

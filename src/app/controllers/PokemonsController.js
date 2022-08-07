const Pokemon = require('../models/Pokemon')
const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../utils/mongoose')

class PokemonsController {
    // [GET] /pokemons
    index(req, res, next) {
        Pokemon.find({})
            .then((pokemons) => {
                res.render('pokemons', {
                    pokemons: multipleMongooseToObject(pokemons),
                })
            })
            .catch(next)
    }

    // [GET] /pokemons/:slug
    show(req, res, next) {
        Pokemon.findOne({ slug: req.params.slug })
            .then((pokemon) => {
                res.render('pokemons/details', {
                    pokemon: mongooseToObject(pokemon),
                })
            })
            .catch(next)
    }

    // [GET] /pokemons/add
    add(req, res, next) {
        res.render('pokemons/add')
    }

    // [POST] /pokemons/store
    store(req, res, next) {
        Pokemon.create(req.body)
            .then((pokemon) => res.redirect(`/pokemons/${pokemon.slug}`))
            .catch(next)
    }

    // [GET] /pokemons/:id/edit
    edit(req, res, next) {
        Pokemon.findById(req.params.id)
            .then((pokemon) =>
                res.render('pokemons/edit', {
                    pokemon: mongooseToObject(pokemon),
                })
            )
            .catch(next)
    }

    // [PUT] /pokemons/:id
    update(req, res, next) {
        Pokemon.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/user/stored/pokemons'))
            .catch(next)
    }
}

module.exports = new PokemonsController()

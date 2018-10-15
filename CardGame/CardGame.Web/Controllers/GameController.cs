using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CardGame.Application.Interfaces;
using CardGame.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace CardGame.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class GameController : Controller
    {
        #region Fields

        private readonly IGameServices _gameServices;

        #endregion Fields

        #region Constructors

        public GameController(IGameServices gameServices)
        {
            _gameServices = gameServices;
        }

        #endregion Constructors

        #region API Methods

        /// <summary>
        /// Create Card Game based on params and return it as Json Object
        /// </summary>
        /// <param name="playersCount">count of players</param>
        /// <param name="maxOfRounds">if passed, it will specify specific number of rounds esle it will calculate rounds of game based on number of players</param>
        /// <returns>Card Game with Shuffled Deck</returns>
        /// <example>https://localhost:44329/api/game/get-new-card-game?playersCount=2&maxOfRounds=3</example>
        [HttpGet("get-new-card-game")]
        public Game GetNewCardGame([FromQuery] int playersCount, [FromQuery] int? maxOfRounds = null)
        {
            //First Create the Deck and Shuffle it
            var deck = _gameServices.CreateDeck();
            var shuffledDeck = _gameServices.ShuffleDeck(deck);
            //Then Creat the Game
            var game = _gameServices.CreateCardGame(playersCount, shuffledDeck, maxOfRounds);
            return game;
        }

        #endregion API Methods
    }
}
using CardGame.Application.Extensions;
using CardGame.Application.Interfaces;
using CardGame.Domain;
using System;
using System.Collections.Generic;

namespace CardGame.Application.Services
{
    /// <summary>
    /// Responsible for all services of the cards game like creating deck , shuffling deck and creating game
    /// Contains Game Settings like NumberOfCards
    /// </summary>
    public class GameServices : IGameServices
    {

        #region Properites
        public GameSettingsModel GameSettings
        {
            get;private set;
        }
        #endregion

        #region Constructors
        public GameServices()
        {
            GameSettings = new GameSettingsModel();
        }
        public GameServices(GameSettingsModel gameSettings)
        {
            GameSettings = gameSettings;
        }
        #endregion

        #region Functions
        /// <summary>
        /// Creating Deck and fill it with the 52 cards
        /// </summary>
        /// <returns></returns>
        public Deck CreateDeck()
        {
            var cards = new List<Card>();
            Card card = null;
            for (int i = 1; i <= GameSettings.NumberOfCards; i++)
            {
                card = new Card(i);
                cards.Add(card);
            }
            var deck = new Deck(cards);
            return deck;
        }

        /// <summary>
        /// Shuffle the list of cards in the deck based on Fisher–Yates shuffle
        /// </summary>
        /// <param name="deck"></param>
        /// <returns></returns>
        public Deck ShuffleDeck(Deck deck)
        {
            if (deck == null)
            {
                throw new ArgumentException("deck is required");
            }
            if (deck.Cards == null || deck.Cards.Count == 0)
            {
                throw new ArgumentException("deck can't have empty cards");
            }
            var shuffledDeck = (Deck)deck.Clone();
            shuffledDeck.Cards.Shuffle();
            return shuffledDeck;
        }

        /// <summary>
        /// Create Card Game
        /// </summary>
        /// <param name="playersCount">number of players</param>
        /// <param name="shuffledDeck">deck with shuffled cards</param>
        /// <param name="maxOfRounds">if passed then set number of rounds with it else calculate number of rounds based on number of players</param>
        /// <returns>Card Game</returns>
        public Game CreateCardGame(int playersCount, Deck shuffledDeck, int? maxOfRounds)
        {
            //Check Game Params and throw exception if any param not valid
            CheckCreateCardGameParams(playersCount,shuffledDeck,maxOfRounds);

            //Create Card Game Instance
            var game = new Game(playersCount, shuffledDeck);

            //set number of rounds based on passed param (maxOfRounds)
            if (maxOfRounds != null)
            {
                game.RoundsCount = maxOfRounds.Value;
            }
            else //calculate number of rounds based on players count
            {
                game.RoundsCount = GameSettings.NumberOfCards / playersCount;
            }
            return game;
        }

        #region Helpers
        public void CheckCreateCardGameParams(int playersCount, Deck shuffledDeck, int? maxOfRounds)
        {
            //check if number of players less than MinimumNumberOfPlayers, then set it with the minimum number of players 
            if (playersCount < GameSettings.MinimumNumberOfPlayers)
            {
                throw new ArgumentException($"playersCount must be at least {GameSettings.MinimumNumberOfPlayers} players");
            }
            //number of players can't exceed number of cards
            if (playersCount > GameSettings.NumberOfCards)
            {
                throw new ArgumentException($"playersCount can't exceed number of cards which is {GameSettings.NumberOfCards}");
            }
            //check deck (can't be null or have empty cards)
            if (shuffledDeck == null)
            {
                throw new ArgumentException("shuffledDeck is required");
            }
            if (shuffledDeck.Cards == null || shuffledDeck.Cards.Count == 0)
            {
                throw new ArgumentException("shuffledDeck can't have empty cards");
            }

        }
        #endregion

        #endregion
    }
}

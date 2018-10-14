using NUnit.Framework;
using CardGame.Application.Interfaces;
using CardGame.Application.Services;
using CardGame.Domain;

namespace CardGame.Application.Tests
{
    /// <summary>
    /// Test methods in Game Services
    /// </summary>
    [TestFixture]
    public class GameServicesTests
    {
        #region Fields
        private IGameServices _gameServices;
        #endregion

        /// <summary>
        /// Test Create Deck Method
        /// </summary>
        [Test]
        public void ShouldCreateDeck()
        {
            //Arrange
            _gameServices = new GameServices();

            //Act
            var deck = _gameServices.CreateDeck();

            //Assert
            Assert.IsNotNull(deck);
            Assert.IsNotNull(deck.Cards);
            Assert.AreEqual(deck.Cards.Count, _gameServices.GameSettings.NumberOfCards);
        }

        /// <summary>
        /// Test ShuffleDeck Method
        /// </summary>
        [Test]
        public void ShouldShuffleDeck()
        {
            //Arrange
            _gameServices = new GameServices();

            //Act
            var deck = _gameServices.CreateDeck();
            var card1 = deck.Cards[0];
            var shuffledDeck = _gameServices.ShuffleDeck(deck);
            var card2 = shuffledDeck.Cards[0];

            //Assert
            Assert.That(() => _gameServices.ShuffleDeck(null), Throws.ArgumentException);
            Assert.That(() => _gameServices.ShuffleDeck(new Deck()), Throws.ArgumentException);
            Assert.AreNotEqual(card1, card2);
        }

        /// <summary>
        /// Test CreateCardGame Method
        /// </summary>
        [Test]
        public void ShouldCreateCardGame()
        {
            //Arrange
            _gameServices = new GameServices();

            //Act
            int specifiedRounds = 3;
            var deck = _gameServices.CreateDeck();
            var shuffledDeck = _gameServices.ShuffleDeck(deck);
            var game = _gameServices.CreateCardGame(2, shuffledDeck, null);
            var gameWithSpecifiedRounds = _gameServices.CreateCardGame(5, shuffledDeck, specifiedRounds);

            //Assert
            Assert.That(() => _gameServices.CreateCardGame(0,shuffledDeck,null), Throws.ArgumentException);
            Assert.That(() => _gameServices.CreateCardGame(1000, shuffledDeck, null), Throws.ArgumentException);
            Assert.That(() => _gameServices.CreateCardGame(2, null, null), Throws.ArgumentException);
            Assert.That(() => _gameServices.CreateCardGame(2, new Deck(), null), Throws.ArgumentException);
            Assert.IsNotNull(game);
            Assert.AreEqual(game.RoundsCount, _gameServices.GameSettings.NumberOfCards / game.PlayersCount);
            Assert.AreEqual(gameWithSpecifiedRounds.RoundsCount, specifiedRounds);
        }
    }
}

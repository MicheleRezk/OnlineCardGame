using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardGame.Domain
{
    /// <summary>
    /// Holder of Cards
    /// </summary>
    public class Deck : ICloneable
    {
        #region Properites

        public List<Card> Cards { get; private set; }

        #endregion Properites

        #region Constructors

        public Deck()
        {
            Cards = new List<Card>();
        }

        public Deck(List<Card> cards)
        {
            Cards = cards;
        }

        /// <summary>
        /// Clone Deck
        /// </summary>
        /// <returns></returns>
        public object Clone()
        {
            var newDeck = MemberwiseClone() as Deck;
            newDeck.Cards = new List<Card>(this.Cards);
            return newDeck;
        }

        #endregion Constructors
    }
}
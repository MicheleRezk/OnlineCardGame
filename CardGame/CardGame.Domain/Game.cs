using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardGame.Domain
{
    /// <summary>
    /// Card Game
    /// </summary>
    public class Game
    {
        #region Properites
        public Deck Deck { get; set; }
        public int PlayersCount { get; set; }
        public int RoundsCount { get; set; }
        #endregion

        #region Constructors
        public Game(int playersCount, Deck deck)
        {
            PlayersCount = playersCount;
            Deck = deck;
        }
        #endregion
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardGame.Domain
{
    /// <summary>
    /// Card Game Settings
    /// </summary>
    public class GameSettingsModel
    {
        #region Properites

        public int NumberOfCards { get; set; }
        public int MinimumNumberOfPlayers { get; set; }

        #endregion Properites

        #region Constructors

        public GameSettingsModel()
        {
            //Set it with default settings
            NumberOfCards = 52;
            MinimumNumberOfPlayers = 2;
        }

        public GameSettingsModel(string numberOfCards, string minimumNumberOfPlayers)
        {
            int numOfCards, numOfPlayers;
            if (!string.IsNullOrEmpty(numberOfCards))
            {
                if (int.TryParse(numberOfCards, out numOfCards))
                {
                    NumberOfCards = numOfCards;
                }
            }
            if (!string.IsNullOrEmpty(minimumNumberOfPlayers))
            {
                if (int.TryParse(minimumNumberOfPlayers, out numOfPlayers))
                {
                    MinimumNumberOfPlayers = numOfPlayers;
                }
            }
        }

        #endregion Constructors
    }
}
using CardGame.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardGame.Application.Interfaces
{
    /// <summary>
    /// Handle all services related to the card game, like creating and shuffling deck
    /// Also contains Game Settings
    /// </summary>
    public interface IGameServices
    {
        GameSettingsModel GameSettings { get; }
        Deck CreateDeck();
        Deck ShuffleDeck(Deck deck);
        Game CreateCardGame(int playersCount, Deck shuffledDeck, int? maxOfRounds);
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardGame.Domain
{
    public class Card
    {
        #region Properites
        public int Value { get; set; }
        #endregion

        #region Constructors
        public Card (int value)
        {
            Value = value;
        }
        #endregion

        #region Functions
        public override bool Equals(object obj)
        {
            var card = obj as Card;
            return this.Value.Equals(card.Value);
        }
        public override int GetHashCode()
        {
            return Value.GetHashCode();
        }
        #endregion
    }
}

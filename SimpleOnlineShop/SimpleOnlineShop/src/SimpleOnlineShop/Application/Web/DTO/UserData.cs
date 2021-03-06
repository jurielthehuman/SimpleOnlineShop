﻿using System.Collections.Generic;

namespace SimpleOnlineShop.SimpleOnlineShop.Application.Web.DTO
{
    public class UserData : IData
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Name { get; set; }
        public double GrandTotal { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string ContactNo { get; set; }
        public IList<OrderData> Orders { get; set; } = new List<OrderData>();
    }
}
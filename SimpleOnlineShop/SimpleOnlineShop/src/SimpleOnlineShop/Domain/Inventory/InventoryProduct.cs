﻿using System;

namespace SimpleOnlineShop.SimpleOnlineShop.Domain.Inventory
{
    public class InventoryProduct : IAgreggateRoot
    {
        public static InventoryProduct Create(string uniqueId, Product product)
        {
            return new InventoryProduct
            {
                UniqueId = uniqueId,
                TimeAdded = DateTime.Now,
                ProductInstance = product
            };
        }

        protected InventoryProduct() { }

        public long Id { get; set; }
        public DateTime TimeAdded { get; protected set; }

        public Product ProductInstance { get; protected set; }
        public string UniqueId { get; protected set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MissNancy.Data;
using PetaPoco;


namespace MissNancy.Tests
{
    [TestClass]
    public class BusTest
    {
        [TestMethod]
        public void GetBusesActiveOnlyTrue()
        {
            // Arrange
            var bus = new Bus();
            int page = 1;
            int limit = 25;
            Boolean activeOnly = true;

            // Act
            var data = bus.GetPaged(page, limit, activeOnly);

            // Assert
            Assert.AreEqual(23, data.TotalItems);
        }

        [TestMethod]
        public void GetBusesActiveOnlyFalse()
        {
            // Arrange
            var bus = new Bus();
            int page = 1;
            int limit = 25;
            Boolean activeOnly = false;
            // Act
            var data = bus.GetPaged(page, limit, activeOnly);

            // Assert
            Assert.AreEqual(25, data.TotalItems);
        }
    }
}

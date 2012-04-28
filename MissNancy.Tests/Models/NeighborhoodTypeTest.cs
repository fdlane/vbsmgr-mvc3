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
    public class NeighborhoodTypeTest
    {
        [TestMethod]
        public void GetPagedNeighborhoodType()
        {
            // Arrange
            int page = 1;
            int limit = 25;
            Boolean activeOnly = true;

            // Act
            var data =  NeighborhoodType.GetPaged(null, page, limit, activeOnly);

            // Assert
            Assert.AreNotEqual(0, data.TotalItems);
        }

        [TestMethod]
        public void GetByIdNeighborhoodType()
        {
            // Arrange
            string key = "1";

            // Act
            var data =  NeighborhoodType.GetById(key);

            // Assert
            Assert.AreEqual(1, data.NeighborhoodTypeKey);
        }
    }
}

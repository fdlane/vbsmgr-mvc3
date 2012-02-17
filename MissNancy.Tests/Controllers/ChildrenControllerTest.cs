using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MissNancy;
using MissNancy.Controllers;

namespace MissNancy.Tests.Controllers
{
    [TestClass]
    public class ChildrenControllerTest
    {
        [TestMethod]
        public void Children_Get()
        {
            // Arrange
            ChildrenController controller = new ChildrenController();
            int page = 1;
            int limit = 25;

            // Act
            var result = controller.GetPaged(page, limit, true) as JsonResult;

            //assert     
            dynamic data = result.Data;

            Assert.AreNotEqual(0, data.total);
            // Assert.IsTrue(data.Success);
            // Assert.AreEqual("Adam", data.People[0].Name);  

        }

    }
}

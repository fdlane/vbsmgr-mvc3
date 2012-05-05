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
    public class WorkerControllerTest
    {
        [TestMethod]
        public void Worker_GetPaged()
        {
            // Arrange
            WorkerController controller = new WorkerController();
            int page = 1;
            int limit = 25;

            // Act
            var result = controller.GetPaged(null, page, limit, true) as JsonResult;

            //assert     
            dynamic data = result.Data;

            Assert.AreNotEqual(0, data.total);
            // Assert.IsTrue(data.Success);
            // Assert.AreEqual("Adam", data.People[0].Name);  

        }

        [TestMethod]
        public void Worker_tempSplitDisplayName()
        {
            // Arrange
            WorkerController controller = new WorkerController();

            // Act
            var result = controller.tempSplitDisplayName() as JsonResult;

            //assert     
            dynamic data = result.Data;

            Assert.IsTrue(data.success);

            // Assert.AreEqual("Adam", data.People[0].Name);  

        }

        [TestMethod]
        public void Worker_tempFuzzDisplayName()
        {
            // Arrange
            WorkerController controller = new WorkerController();

            // Act
            var result = controller.tempFuzzSplitDisplayName() as JsonResult;

            //assert     
            dynamic data = result.Data;

            Assert.IsTrue(data.success);

            // Assert.AreEqual("Adam", data.People[0].Name);  

        }
    }
}

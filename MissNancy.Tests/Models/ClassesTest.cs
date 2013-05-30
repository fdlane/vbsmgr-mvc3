using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MissNancy.Data;
using PetaPoco;

namespace MissNancy.Tests.Models
{
    [TestClass]
    public class ClassesTest
    {
        //string _connectionStringName;
        //Database db = new Database("MissNancy");

        //public ClassesTest()
        //{
        //}

        ////TODO follow petapoca test fitures patturn from his tests
        //public ClassesTest(string connectionStringName)
        //{
        //    _connectionStringName = connectionStringName;
        //}

        ////TODO follow petapoca test fitures patturn from his tests
        //public void CreateDB()
        //{
        //    db = new Database(_connectionStringName);
        //    db.OpenSharedConnection();		// <-- Wow, this is crucial to getting SqlCE to perform.

        //}

        //[TestMethod]
        //public void Class_Crud()
        //{
        //    // create a record
        //    var myClass = new MissNancy.Data.Classes();

        //    Assert.IsTrue(db.IsNew("ClassKey", myClass));

        //    myClass.ClassDisplay = "Class Name";

        //    // Insert it
        //    db.Insert("tblClasses", "ClassKey", myClass);

        //    Assert.AreNotEqual(myClass.ClassKey, 0);
        //    Assert.IsFalse(db.IsNew("ClassKey", myClass));

        //    // Retrieve it
        //    var myClass2 = db.Single<Classes>("Select * From tblClasses WHERE ClassKey = @0", myClass.ClassKey);

        //    Assert.IsFalse(db.IsNew("ClassKey", myClass2));

        //    Assert.AreEqual(myClass.ClassDisplay, myClass2.ClassDisplay);
            
        //    myClass2.ClassDisplay = "New Class Name";
        //    db.Save("tblClasses", "ClassKey", myClass2);

        //    // Retrieve it again
        //    var myClass3 = db.Single<Classes>("SELECT * FROM tblClasses WHERE ClassKey = @0", myClass.ClassKey);

        //    // Check it
        //    Assert.AreEqual(myClass2.ClassDisplay, myClass3.ClassDisplay);

        //    // Delete it
        //    db.Delete("tblClasses", "ClassKey", myClass3);

        //    // Should be gone!
        //    var myClass4 = db.SingleOrDefault<Classes>("SELECT * FROM tblClasses WHERE ClassKey = @0", myClass.ClassKey);
        //    Assert.IsNull(myClass4);


        //}

        //[TestMethod]
        //public void GetClasses()
        //{
        //    // Arrange
        //    var db = new PetaPoco.Database("MissNancy");

        //    // Act
        //    var classes = db.Query<Classes>("WHERE Active <> 0");

        //    // Assert
        //    Assert.AreNotEqual(0, classes.Count());
        //}
    }
}

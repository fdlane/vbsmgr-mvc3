using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MissNancy.Data;

namespace MissNancy.Controllers
{
    public class WorkersController : Controller
    {
        //
        // GET: /Classes/

        public ActionResult Index()
        {
            var db = new PetaPoco.Database("MissNancy");
            var classes = db.Query<Classes>("WHERE Active <> 0");

            return View(classes);
        }

        public ActionResult IndexExt()
        {
            var db = new PetaPoco.Database("MissNancy");
            var classes = db.Query<Classes>("WHERE Active <> 0");

            return View(classes);
        }
        public JsonResult Get(int? start, int? limit)
        {
            var db = new PetaPoco.Database("MissNancy");
            var workers = db.Query<Worker>("WHERE Active <> 0");

            return Json(new
            {
                total = workers.Count(),
                data = workers,
            }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public JsonResult Update(Classes data)
        {
            bool success = false;
            string message = "no record found";
            if (data != null && data.ClassKey > 0)
            {
                using (var db = new PetaPoco.Database("MissNancy"))
                {
                    var rec = db.SingleOrDefault<Classes>("WHERE ClassKey = @0", data.ClassKey);
                    rec.ClassDisplay = data.ClassDisplay;              
                    db.Save("tblClasses", "ClassKey", rec);
                    success = true;
                    message = "Update method called successfully";
                }
            }

            return Json(new
            {
                data,
                success,
                message
            });
        }

        public JsonResult Load()
        {
            var db = new PetaPoco.Database("MissNancy");
            var classes = db.Query<Classes>("WHERE Active <> 0");

            return Json(new
            {
                total = classes.Count(),
                data = classes,
            }, JsonRequestBehavior.AllowGet);
        }
        //
        // GET: /Classes/Details/5

        public ActionResult Details(int id)
        {
            var db = new PetaPoco.Database("MissNancy");
            var myClass = db.SingleOrDefault<Classes>("SELECT * FROM tblClasses WHERE ClassKey = @0", id);

            return View(myClass);
        }

        //
        // GET: /Classes/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Classes/Create

        [HttpPost]
        public ActionResult Create(Classes myClass)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var db = new PetaPoco.Database("MissNancy");
                    myClass.Active = true;
                    db.Insert("tblClasses", "ClassKey", myClass);

                    return RedirectToAction("Index");
                }
                catch (Exception e)
                {
                    return View(myClass);
                }
            }
            else
            {
                return View(myClass);
            }
        }

        //
        // GET: /Classes/Edit/5

        public ActionResult Edit(int id)
        {
            var db = new PetaPoco.Database("MissNancy");
            var myClass = db.SingleOrDefault<Classes>("SELECT * FROM tblClasses WHERE ClassKey = @0", id);

            return View(myClass);
        }

        //
        // POST: /Classes/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            var db = new PetaPoco.Database("MissNancy");
            var myClass = db.SingleOrDefault<Classes>("SELECT * FROM tblClasses WHERE ClassKey = @0", id);

            try
            {
                UpdateModel(myClass, collection.ToValueProvider());
                db.Save("tblClasses", "ClassKey", myClass);

                return RedirectToAction("Index");
            }
            catch (Exception e)
            {
                return View(myClass);
            }

        }

        //
        // GET: /Classes/Delete/5

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /Classes/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, string confirmButton)
        {
            try
            {
                var db = new PetaPoco.Database("MissNancy");
                db.Delete("tblClasses", "ClassKey", null, id);

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}

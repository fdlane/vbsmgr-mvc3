using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MissNancy.Data;

namespace MissNancy.Controllers
{
    public class ClassesController : Controller
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
            var classes = db.Query<Classes>("WHERE Active <> 0");

            return Json(new
            {
                total = classes.Count(),
                data = classes,
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPaged(int page, int limit, Boolean activeOnly)
        {
            var data = new Classes().GetPaged(page, limit, activeOnly);

            return Json(new
            {
                total = data.TotalItems,
                data = data.Items,
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetWorkers(int? classKey)
        {
            var db = new PetaPoco.Database("MissNancy");
            var workers = db.Query<ClassWorkerDetail>("SELECT tblClassWorkerDetails.ClassWorkerKey, tblClassWorkerDetails.ClassKey, tblClassWorkerDetails.WorkerKey, tblClassWorkerDetails.CreateDate, tblClassWorkerDetails.CreatedBy, tblClassWorkerDetails.EditDate, tblClassWorkerDetails.EditedBy, tblWorkers.DisplayName, tblWorkers.Phone, tblWorkers.Mobile FROM tblClassWorkerDetails INNER JOIN tblWorkers ON tblClassWorkerDetails.WorkerKey = tblWorkers.WorkerKey WHERE tblClassWorkerDetails.ClassKey = @0", classKey);

            return Json(new
            {
                total = workers.Count(),
                data = workers,
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update(IList<Classes> data)
        {
            bool success = false;
            string message = "no record found";
            if (data != null)
            {
                using (var db = new PetaPoco.Database("MissNancy"))
                {
                    foreach (var item in data)
                    {
                        var rec = db.SingleOrDefault<Classes>("WHERE ClassKey = @0", item.ClassKey);

                        rec.Active = item.Active;
                        rec.AgeKey = item.AgeKey;
                        rec.LocationKey = item.LocationKey;
                        rec.MasterTeacherKey = item.MasterTeacherKey;
                        rec.ClassDisplay = item.ClassDisplay;
                        rec.Notes = item.Notes;
                        rec.EditDate = DateTime.Now;
                        db.Save("tblClasses", "ClassKey", rec);

                        // this is a new Class, just insert all the records
                        if (item.ClassKey == 0)
                        {
                            foreach (var detailRecord in item.ClassWorkerDetails)
                            {
                                //rec should now hava a ClassKey from the database
                                detailRecord.ClassKey = rec.ClassKey;
                                db.Save("tblClassWorkerDetails", "ClassWorkerKey", detailRecord);
                            }
                        }
                        else // this is an existing Class, handle modifications done be the user
                        {
                            if (item.ClassWorkerDetails != null)
                            {
                                foreach (var detailRecord in item.ClassWorkerDetails)
                                {
                                    detailRecord.ClassKey = rec.ClassKey;
                                    db.Save("tblClassWorkerDetails", "ClassWorkerKey", detailRecord);
                                }
                            }
                        }
                    }

                    success = true;
                    message = "Jesus Saves and so did this method";
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
        public JsonResult Create(List<Classes> data)
        {
            bool success = false;
            string message = "Create method failed";

            if (data != null)
            {
                using (var db = new PetaPoco.Database("MissNancy"))
                {
                    foreach (var item in data)
                    {
                        item.CreateDate = DateTime.Now;
                        item.EditDate = DateTime.Now;
                        db.Save("tblClasses", "ClassKey", item);

                        if (item.ClassWorkerDetails != null)
                        {
                            foreach (var detailRecord in item.ClassWorkerDetails)
                            {
                                //item should now have a ClassKey from the Database
                                detailRecord.ClassKey = item.ClassKey;
                                db.Save("tblClassWorkerDetails", "ClassWorkerKey", detailRecord);
                            }
                        }
                    }

                    success = true;
                    message = "Jesus Saves and so did this method";
                }
            }

            return Json(new
            {
                data,
                success,
                message
            });

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

        public JsonResult Delete(IList<Classes> data)
        {
            bool success = false;
            string message = "Delete method failed";

            if (data != null)
            {
                using (var db = new PetaPoco.Database("MissNancy"))
                {
                    foreach (var item in data)
                    {
                        item.EditDate = DateTime.Now;
                        item.Active = false;
                        db.Save("tblClasses", "ClassKey", item);

                        db.Delete<ClassWorkerDetail>("WHERE ClassKey = @0", item.ClassKey);

                    }

                    success = true;
                    message = "Class(s) deleted successfully";
                }
            }

            return Json(new
            {
                success,
                message
            });
        }

        public JsonResult DeleteClassWorker(IList<ClassWorkerDetail> data)
        {
            bool success = false;
            string message = "Delete method failed";

            if (data != null)
            {
                using (var db = new PetaPoco.Database("MissNancy"))
                {
                    foreach (var item in data)
                    {
                        db.Delete<ClassWorkerDetail>("WHERE ClassWorkerKey = @0", item.ClassWorkerKey);
                    }

                    success = true;
                    message = "Class Worker(s) deleted successfully";
                }
            }

            return Json(new
            {
                success,
                message
            });
        }
    }
}

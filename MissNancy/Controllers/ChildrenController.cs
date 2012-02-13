using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MissNancy.Data;

namespace MissNancy.Controllers
{
    public class ChildrenController : Controller
    {
        //
        // GET: /Children/

        public JsonResult Get(int? start, int? limit)
        {
            var db = new PetaPoco.Database("MissNancy");
            var data = db.Query<Children>("WHERE NeighborhoodKey = 188 AND Active <>0 or ChildrenKey = 4");

            return Json(new
            {
                total = data.Count(),
                data = data,
            }, JsonRequestBehavior.AllowGet);
        }
        
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

                        if (item.ClassWorkerDetails !=null)
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

    }
}

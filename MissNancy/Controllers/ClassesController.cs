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

        public JsonResult GetPaged(int page, int limit, Boolean activeOnly)
        {
            var data = Classes.GetPaged(page, limit, activeOnly);

            return Json(new
            {
                total = data.TotalItems,
                data = data.Items,
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetWorkers(int classKey)
        {
            var workers = ClassWorkerDetail.GetWorkers(classKey);

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
                using (var db = Classes.repo)
                {
                    foreach (var item in data)
                    {
                        var rec = db.SingleOrDefault<Classes>("WHERE ClassKey = @0", item.ClassKey);

                        rec = item;
                        rec.EditDate = DateTime.Now;
                        db.Save("tblClasses", "ClassKey", rec);

                        // this is a new item, just insert all the records
                        if (item.ClassKey == 0)
                        {
                            foreach (var detailRecord in item.ClassWorkerDetails)
                            {
                                //rec should now hava a Key from the database
                                detailRecord.ClassKey = rec.ClassKey;
                                db.Save("tblClassWorkerDetails", "ClassWorkerKey", detailRecord);
                            }
                        }
                        else // this is an existing item, handle modifications done be the user
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

        [HttpPost]
        public JsonResult Create(List<Classes> data)
        {
            bool success = false;
            string message = "Create method failed";

            if (data != null)
            {
                using (var db = Classes.repo)
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

        public JsonResult Delete(IList<Classes> data)
        {
            bool success = false;
            string message = "Delete method failed";

            if (data != null)
            {
                using (var db = Classes.repo)
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
                using (var db = ClassWorkerDetail.repo)
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

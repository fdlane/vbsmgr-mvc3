using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MissNancy.Data;

namespace MissNancy.Controllers
{
    public class WorkerController : Controller
    {
        public JsonResult GetPaged(string query, int page, int limit, Boolean activeOnly)
        {
            var data = Worker.GetPaged(query, page, limit, activeOnly);

            return Json(new
            {
                total = data.TotalItems,
                data = data.Items,
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Create(List<Worker> data)
        {
            bool success = false;
            string message = "Create method failed";

            if (data != null)
            {
                using (var db = Worker.repo)
                {
                    foreach (var item in data)
                    {
                        item.CreateDate = DateTime.Now;
                        item.EditDate = DateTime.Now;
                        db.Save("tblWorkers", "WorkerKey", item);
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
        public JsonResult Update(IList<Worker> data)
        {
            bool success = false;
            string message = "no record found";
            if (data != null)
            {
                using (var db = Worker.repo)
                {
                    foreach (var item in data)
                    {
                        var rec = db.SingleOrDefault<Worker>("WHERE WorkerKey = @0", item.WorkerKey);

                        rec = item;
                        rec.EditDate = DateTime.Now;
                        db.Save("tblWorkers", "WorkerKey", rec);
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

        public JsonResult Delete(IList<Worker> data)
        {
            bool success = false;
            string message = "Delete method failed";

            if (data != null)
            {
                using (var db = Worker.repo)
                {
                    foreach (var item in data)
                    {
                        // just doing a soft delete of these items
                        item.EditDate = DateTime.Now;
                        item.Active = false;
                        db.Save("tblWorkers", "WorkerKey", item);
                    }

                    success = true;
                    message = "Deleted successfully";
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

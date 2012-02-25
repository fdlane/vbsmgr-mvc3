using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MissNancy.Data;

namespace MissNancy.Controllers
{
    public class BusesController : Controller
    {
        public JsonResult GetPaged(int page, int limit, Boolean activeOnly)
        {
            var data = new Bus().GetPaged(page, limit, activeOnly);

            return Json(new
            {
                total = data.TotalItems,
                data = data.Items,
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetWorkers(int? busKey)
        {
            var db = new PetaPoco.Database("MissNancy");
            var workers = db.Query<BusWorkerDetail>("SELECT tblBusWorkerDetails.BusWorkerKey, tblBusWorkerDetails.BusKey, tblBusWorkerDetails.WorkerKey, tblBusWorkerDetails.CreateDate, tblBusWorkerDetails.CreatedBy, tblBusWorkerDetails.EditDate, tblBusWorkerDetails.EditedBy, tblWorkers.DisplayName, tblWorkers.Phone, tblWorkers.Mobile FROM tblBusWorkerDetails INNER JOIN tblWorkers ON tblBusWorkerDetails.WorkerKey = tblWorkers.WorkerKey WHERE tblBusWorkerDetails.BusKey = @0", busKey);

            return Json(new
            {
                total = workers.Count(),
                data = workers,
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Create(List<Bus> data)
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
                        db.Save("tblBuses", "BusKey", item);
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
        public JsonResult Update(IList<Bus> data)
        {
            bool success = false;
            string message = "no record found";
            if (data != null)
            {
                using (var db = new PetaPoco.Database("MissNancy"))
                {
                    foreach (var item in data)
                    {
                        var rec = db.SingleOrDefault<Bus>("WHERE BusKey = @0", item.BusKey);

                        rec = item;
                        rec.EditDate = DateTime.Now;
                        db.Save("tblBuses", "BusKey", rec);

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

        public JsonResult Delete(IList<Bus> data)
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
                        db.Save("tblBuses", "BusKey", item);
                    }

                    success = true;
                    message = "Bus(s) deleted successfully";
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
